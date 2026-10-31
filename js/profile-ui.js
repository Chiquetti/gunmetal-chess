// "What's your name?" dialog (with worldwide name reservation) and the name chip in the header.
import { t } from './i18n.js';
import { $, esc, openModal, closeModal } from './ui.js';
import { getPlayer, allLocalPlayers, cleanName, globalOn, registerName, restoreAccount, checkName, getRecoveryCode } from './player.js';

export function paintChip() {
  const p = getPlayer();
  const el = $('#me-chip');
  if (!el) return;
  el.textContent = p ? p.name : t('pf.setName');
  el.title = t('pf.change');
}

let guestSession = false;
const GUEST = { guest: true };

/**
 * Resolves with the current profile, asking for a name first if there is none.
 * Resolves with { guest: true } if the person chose to play without a ranking name,
 * and with null if they closed the dialog (nothing should start).
 */
export function ensureProfile() {
  const p = getPlayer();
  if (p) return Promise.resolve(p);
  if (guestSession) return Promise.resolve(GUEST);
  return askName();
}

export function askName() {
  return new Promise((resolve) => {
    const me = getPlayer();
    const others = allLocalPlayers().filter((p) => !me || p.id !== me.id);
    const code = getRecoveryCode();
    openModal(`<h2>${me ? t('pf.change') : t('pf.title')}</h2>
      <p class="sub">${t('pf.sub')} ${globalOn ? t('pf.globalNote') : ''}</p>
      <input id="pf-name" class="field" maxlength="20" placeholder="${t('pf.ph')}" value="${me ? esc(me.name) : ''}" autocomplete="off">
      <div class="avail" id="pf-avail"></div>
      ${others.length ? `<div class="lbl">${t('pf.switch')}</div><div class="chips">${others.map((p) => `<button class="chip" data-n="${esc(p.name)}">${esc(p.name)}</button>`).join('')}</div>` : ''}
      ${code ? `<div class="lbl">${t('pf.codeTitle')}</div><div class="codebox">${esc(code)}</div>` : ''}
      ${globalOn ? `<button class="link" id="pf-restore-open">${t('pf.restore')}</button><div id="pf-restore" hidden></div>` : ''}
      <div class="imp-msg" id="pf-msg"></div>
      ${me ? '' : `<button class="link" id="pf-skip">${t('pf.skip')}</button>`}
      <div class="modal-actions"><button class="btn" id="pf-cancel">${t('imp.cancel')}</button><button class="btn primary" id="pf-save">${t('pf.save')}</button></div>`, { onClose: () => resolve(getPlayer()) });
    const input = $('#pf-name');
    input.focus(); input.select();

    // live "is this name free?" hint (worldwide check)
    let timer = null;
    const hint = (html, cls = '') => { const a = $('#pf-avail'); a.className = 'avail ' + cls; a.innerHTML = html; };
    input.oninput = () => {
      if (!globalOn) return;
      clearTimeout(timer);
      const name = cleanName(input.value);
      if (name.length < 2) { hint(''); return; }
      if (me && name.toLowerCase() === me.name.toLowerCase()) { hint(''); return; }
      hint(t('pf.checking'));
      timer = setTimeout(async () => {
        const ok = await checkName(name);
        if (cleanName(input.value) !== name) return;
        if (ok === null) hint(''); else if (ok) hint('&#10003; ' + t('pf.available'), 'yes'); else hint('&#10007; ' + t('pf.taken'), 'no');
      }, 450);
    };

    const save = async () => {
      const name = cleanName(input.value);
      const msg = $('#pf-msg');
      if (name.length < 2) { msg.textContent = t('pf.short'); return; }
      $('#pf-save').disabled = true; msg.textContent = '';
      const res = await registerName(name);
      $('#pf-save').disabled = false;
      if (!res.ok) { msg.textContent = t('pf.' + (res.reason === 'short' ? 'short' : res.reason === 'taken' ? 'taken' : res.reason === 'network' ? 'network' : 'invalid')); return; }
      paintChip();
      if (res.newlyClaimed) { showCode(resolve); return; }
      closeModal(); resolve(getPlayer());
    };
    $('#pf-save').onclick = save;
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') save(); });

    $('#modal-card').onclick = (e) => {
      const c = e.target.closest('[data-n]');
      if (c) { input.value = c.dataset.n; save(); return; }
      if (e.target.id === 'pf-restore-open') openRestore(resolve);
    };
    $('#pf-cancel').onclick = () => { closeModal(); resolve(getPlayer()); };
    const skip = $('#pf-skip');
    if (skip) skip.onclick = () => { guestSession = true; closeModal(); resolve(GUEST); };
  });
}

/** After reserving a name: show the secret recovery code once, clearly. */
function showCode(resolve) {
  const code = getRecoveryCode();
  openModal(`<h2>${t('pf.codeTitle')}</h2>
    <p class="sub">${t('pf.codeSub')}</p>
    <div class="codebox big">${esc(code || '')}</div>
    <div class="modal-actions"><button class="btn" id="pf-copy">${t('pf.copy')}</button><button class="btn primary" id="pf-done">${t('pf.continue')}</button></div>`, { onClose: () => resolve(getPlayer()) });
  $('#pf-copy').onclick = async () => {
    try { await navigator.clipboard.writeText(code); } catch (e) { /* ignore */ }
    $('#pf-copy').textContent = t('pf.copied');
  };
  $('#pf-done').onclick = () => { closeModal(); resolve(getPlayer()); };
}

/** Use an existing ranking name from another device. */
function openRestore(resolve) {
  const box = $('#pf-restore');
  box.hidden = false;
  box.innerHTML = `<p class="sub">${t('pf.restoreHint')}</p>
    <input id="rs-code" class="field code" maxlength="19" placeholder="${t('pf.codePh')}" autocomplete="off" autocapitalize="characters">
    <button class="btn" id="rs-go">${t('pf.restoreGo')}</button>`;
  $('#rs-go').onclick = async () => {
    const msg = $('#pf-msg');
    const res = await restoreAccount($('#pf-name').value, $('#rs-code').value);
    if (!res.ok) { msg.textContent = t(res.reason === 'network' ? 'pf.network' : 'pf.restoreFail'); return; }
    paintChip(); closeModal(); resolve(getPlayer());
  };
}

/**
 * When the worldwide ranking is on, a player who already has a name on this device (made before it was on)
 * gets that name reserved automatically. If someone else took it meanwhile, ask for another one.
 */
export async function claimIfNeeded() {
  const me = getPlayer();
  if (!globalOn || !me || me.claimed) return;
  const res = await registerName(me.name);
  if (res.ok && res.newlyClaimed) { showCode(() => {}); return; }
  if (!res.ok && (res.reason === 'taken' || res.reason === 'invalid')) {
    askName();
    const m = $('#pf-msg'); if (m) m.textContent = t('pf.taken');
  }
}
