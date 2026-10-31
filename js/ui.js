// Small shared UI helpers.
import { t } from './i18n.js';

export const $ = (s) => document.querySelector(s);
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function openModal(html) {
  $('#modal-card').innerHTML = html;
  $('#modal-card').onclick = null;
  $('#modal').classList.remove('hidden');
}
export function closeModal() { $('#modal').classList.add('hidden'); $('#modal-card').innerHTML = ''; }

export function askPromotion(color) {
  return new Promise((resolve) => {
    openModal(`<h2>${t('promo.title')}</h2><p class="sub">${t('promo.sub')}</p>
      <div class="promo">${['q', 'r', 'b', 'n'].map((p) => `<button data-p="${p}" title="${t('piece.' + p)}"><img src="img/${color}${p}.png" alt="${t('piece.' + p)}"></button>`).join('')}</div>`);
    $('#modal-card').onclick = (e) => { const b = e.target.closest('[data-p]'); if (b) { closeModal(); resolve(b.dataset.p); } };
  });
}

const ORDER = ['q', 'r', 'b', 'n', 'p'];
export function capsHtml(types, color) {
  return [...types].sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b)).map((p) => `<img src="img/${color}${p}.png" alt="${t('piece.' + p)}">`).join('');
}
/** pieces captured BY `color` (the opponent's lost pieces) */
export function capturedBy(chess, color) {
  return chess.history({ verbose: true }).filter((m) => m.color === color && m.captured).map((m) => m.captured);
}
export function lastMoveOf(chess) {
  const h = chess.history({ verbose: true });
  return h.length ? { from: h.at(-1).from, to: h.at(-1).to } : null;
}

export function renderMoves(el, sans, curIdx, commentSet, clickable) {
  let html = '';
  for (let i = 0; i < sans.length; i += 2) {
    html += `<div class="n">${i / 2 + 1}.</div>`;
    for (let j = i; j < Math.min(i + 2, sans.length); j++) {
      html += `<div class="m ${j === curIdx ? 'cur' : ''} ${commentSet && commentSet.has(j) ? 'has' : ''}" data-i="${j}">${sans[j]}</div>`;
    }
    if (i + 1 >= sans.length) html += '<div></div>';
  }
  el.className = 'movelist' + (clickable ? ' click' : '');
  el.innerHTML = html;
  const cur = el.querySelector('.cur');
  if (cur) el.scrollTop = Math.max(0, cur.offsetTop - el.clientHeight / 2);
  else el.scrollTop = el.scrollHeight;
}
