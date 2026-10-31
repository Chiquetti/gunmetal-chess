// "What's your name?" dialog and the name chip in the header.
import { t } from './i18n.js';
import { $, esc, openModal, closeModal } from './ui.js';
import { getPlayer, setPlayerByName, allLocalPlayers, cleanName } from './player.js';

export function paintChip() {
  const p = getPlayer();
  const el = $('#me-chip');
  if (!el) return;
  el.textContent = p ? p.name : t('pf.setName');
  el.title = t('pf.change');
}

/** Resolves with the current profile, asking for a name first if there is none. */
export function ensureProfile() {
  const p = getPlayer();
  return p ? Promise.resolve(p) : askName(false);
}

export function askName(canCancel = true) {
  return new Promise((resolve) => {
    const me = getPlayer();
    const others = allLocalPlayers().filter((p) => !me || p.id !== me.id);
    openModal(`<h2>${me ? t('pf.change') : t('pf.title')}</h2>
      <p class="sub">${t('pf.sub')}</p>
      <input id="pf-name" class="field" maxlength="20" placeholder="${t('pf.ph')}" value="${me ? esc(me.name) : ''}" autocomplete="off">
      ${others.length ? `<div class="lbl">${t('pf.switch')}</div><div class="chips">${others.map((p) => `<button class="chip" data-n="${esc(p.name)}">${esc(p.name)}</button>`).join('')}</div>` : ''}
      <div class="imp-msg" id="pf-msg"></div>
      <div class="modal-actions">${canCancel ? `<button class="btn" id="pf-cancel">${t('imp.cancel')}</button>` : ''}<button class="btn primary" id="pf-save">${t('pf.save')}</button></div>`);
    const input = $('#pf-name');
    input.focus(); input.select();
    const save = () => {
      const name = cleanName(input.value);
      if (name.length < 2) { $('#pf-msg').textContent = t('pf.short'); return; }
      const p = setPlayerByName(name);
      closeModal(); paintChip(); resolve(p);
    };
    $('#pf-save').onclick = save;
    input.onkeydown = (e) => { if (e.key === 'Enter') save(); };
    $('#modal-card').onclick = (e) => { const c = e.target.closest('[data-n]'); if (c) { input.value = c.dataset.n; save(); } };
    const cancel = $('#pf-cancel');
    if (cancel) cancel.onclick = () => { closeModal(); resolve(getPlayer()); };
  });
}
