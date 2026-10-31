import { Chess } from '../lib/chess.js';
import { Board } from './board.js';
import { Engine, LEVELS } from './engine.js';
import { GAMES as BASE_GAMES, COLLECTIONS, LEGENDS } from './games.js';
import { Effects, isSoundOn, setSoundOn } from './effects.js';
import { t, tEnum, LANGS, getLang, setLang, applyStatic, loadContent, locGame, locCollection, locLegend } from './i18n.js';
import { $, esc, sleep, openModal, closeModal, askPromotion, capsHtml, capturedBy, lastMoveOf, renderMoves } from './ui.js';
import { analyticsOn, trackView, trackEvent, initConsent } from './analytics.js';
import { enterOnline, refreshOnline } from './online.js';
import { getPlayer, recordResult, localBoard, globalBoard, globalOn } from './player.js';
import { ensureProfile, askName, paintChip, claimIfNeeded } from './profile-ui.js';
import { enterLearn, refreshLearn } from './learn.js';

const SAVE_KEY = 'gunmetal.game.v1';
const strip = (s) => s.replace(/[!?+#]+$/g, '');
const lvLabel = (k) => t('lv.' + k);

/* ---------------- router ---------------- */
const views = ['home', 'play', 'online', 'ranking', 'learn', 'library', 'viewer'];
let currentView = 'home';
function show(name) {
  currentView = name;
  views.forEach((v) => $('#view-' + v).classList.toggle('hidden', v !== name));
  document.querySelectorAll('[data-nav]').forEach((a) => a.classList.toggle('on', a.dataset.nav === (name === 'viewer' ? 'library' : name)));
}
function route() {
  const h = location.hash.replace('#', '') || 'home';
  stopAutoplay();
  trackView('/' + h, h);
  if (h.startsWith('game/')) { openViewer(h.slice(5)); return; }
  if (h.startsWith('join/')) { show('online'); enterOnline(h.slice(5)); return; }
  if (h === 'online') { show('online'); enterOnline(); return; }
  if (h === 'ranking') { show('ranking'); renderRanking(); return; }
  if (h === 'learn') { show('learn'); enterLearn(); return; }
  if (h === 'play') { show('play'); enterPlay(); return; }
  if (h === 'library') { show('library'); renderLibrary(); return; }
  show('home'); refreshHome();
}
window.addEventListener('hashchange', route);

/* ================= PLAY vs COMPUTER ================= */
let engine = null;
const P = { chess: new Chess(), human: 'w', level: 'medium', over: false, thinking: false, started: false, token: 0, counted: false, resigned: false };

const boardPlay = new Board($('#board-play'), {
  canPick: (sq, p) => P.started && !P.over && !P.thinking && p.color === P.human && P.chess.turn() === P.human,
  targetsFor: (sq) => P.chess.moves({ square: sq, verbose: true }).map((m) => m.to),
  onUserMove: (from, to) => userMove(from, to)
});
const fxPlay = new Effects(boardPlay);

const LS = {
  get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v === null || v === undefined ? d : v; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
};

function saveGame() { LS.set(SAVE_KEY, { pgn: P.chess.pgn(), human: P.human, level: P.level, over: P.over, ts: Date.now() }); }
const loadSaved = () => LS.get(SAVE_KEY, null);

function refreshHome() {
  const s = loadSaved();
  const btn = $('#home-continue');
  if (s && s.pgn && !s.over) {
    btn.hidden = false;
    $('#home-continue-sub').textContent = t('home.continue.s', { level: lvLabel(s.level), color: t('color.' + s.human) });
  } else btn.hidden = true;
}

function enterPlay() {
  if (!engine) engine = new Engine();
  if (P.started) { updatePlay(); return; }
  const s = loadSaved();
  if (s && s.pgn && !s.over) { restore(s); return; }
  openSetup();
}

function restore(s) {
  P.chess = new Chess(); P.chess.loadPgn(s.pgn);
  P.human = s.human; P.level = s.level; P.over = false; P.started = true; P.thinking = false; P.counted = false; P.pts = 0;
  boardPlay.flipped = P.human === 'b'; boardPlay.build();
  updatePlay();
  if (P.chess.turn() !== P.human && !P.chess.isGameOver()) engineMove();
}

function openSetup() {
  let level = P.level, color = 'w';
  const render = () => {
    openModal(`
      <h2>${t('setup.title')}</h2>
      <p class="sub">${t('setup.sub')}</p>
      <div class="opt-grid" id="lv">
        ${Object.keys(LEVELS).map((k) => `<button class="opt ${k === level ? 'on' : ''}" data-lv="${k}"><b>${lvLabel(k)}</b><small>${t('lv.' + k + '.b')}</small></button>`).join('')}
      </div>
      <div class="row3" id="cl">
        ${['w', 'b', 'r'].map((k) => `<button class="opt ${k === color ? 'on' : ''}" data-cl="${k}"><b>${t('color.' + k)}</b></button>`).join('')}
      </div>
      <div class="modal-actions"><button class="btn primary" id="go">${t('setup.start')}</button></div>`);
    $('#lv').onclick = (e) => { const b = e.target.closest('[data-lv]'); if (b) { level = b.dataset.lv; render(); } };
    $('#cl').onclick = (e) => { const b = e.target.closest('[data-cl]'); if (b) { color = b.dataset.cl; render(); } };
    $('#go').onclick = async () => { closeModal(); if (!(await ensureProfile())) return; startGame(level, color === 'r' ? (Math.random() < 0.5 ? 'w' : 'b') : color); };
  };
  render();
}

function startGame(level, human) {
  P.token++;
  P.chess = new Chess(); P.level = level; P.human = human; P.over = false; P.started = true; P.thinking = false; P.counted = false; P.resigned = false; P.pts = 0;
  boardPlay.flipped = human === 'b'; boardPlay.build(); boardPlay.hint = null;
  updatePlay(); saveGame();
  trackEvent('game-start-' + level, 'Game vs computer started (' + level + ')');
  if (human === 'b') engineMove();
}

function updatePlay(fxMove = null) {
  const c = P.chess;
  fxPlay.reset();
  boardPlay.render(c, { last: lastMoveOf(c) });
  if (fxMove) fxPlay.play(fxMove, c, { sub: fxMove.color === P.human ? t('fx.youwin') : t('fx.compwins') });
  boardPlay.setHint(null);
  const opp = P.human === 'w' ? 'b' : 'w';
  $('#opp-bar').innerHTML = `<b>${t('play.computer')}</b> <span>${lvLabel(P.level)}</span><span class="caps">${capsHtml(capturedBy(c, opp), P.human)}</span>`;
  $('#me-bar').innerHTML = `<b>${t('play.you')}</b> <span>${t('color.' + P.human)}</span><span class="caps">${capsHtml(capturedBy(c, P.human), opp)}</span>`;
  renderMoves($('#play-moves'), c.history(), -1, null, false);
  let msg = '', cls = '';
  if (P.over || c.isGameOver()) { msg = resultText(); cls = 'over'; P.over = true; }
  else if (P.thinking) { msg = t('status.thinking'); cls = 'thinking'; }
  else msg = c.isCheck() ? t('status.check') : t('status.your');
  const st = $('#play-status'); st.className = 'status ' + cls; st.textContent = msg;
  if (P.over && P.pts) st.insertAdjacentHTML('beforeend', ` <span class="pts-earned">${t('rk.earned', { n: P.pts })}</span>`);
  $('#btn-undo').disabled = P.thinking || c.history().length === 0;
  $('#btn-hint').disabled = P.thinking || P.over || c.turn() !== P.human;
  $('#btn-resign').disabled = P.over;
  if (P.over) {
    P.thinking = false; saveGame();
    if (!P.counted) {
      P.counted = true;
      const won = P.resigned ? false : c.isCheckmate() ? c.turn() !== P.human : null;
      const result = won === true ? 'win' : won === false ? 'loss' : 'draw';
      P.pts = recordResult({ mode: 'cpu', level: P.level, result });
      trackEvent('game-end-' + result, 'Game vs computer ended');
      const st2 = $('#play-status'); if (P.pts) st2.insertAdjacentHTML('beforeend', ` <span class="pts-earned">${t('rk.earned', { n: P.pts })}</span>`);
    }
  }
}

function resultText() {
  const c = P.chess;
  if (P.resigned) return t('res.resigned');
  if (c.isCheckmate()) return c.turn() === P.human ? t('res.mateLose') : t('res.mateWin');
  if (c.isStalemate()) return t('res.stalemate');
  if (c.isThreefoldRepetition()) return t('res.repetition');
  if (c.isInsufficientMaterial()) return t('res.insufficient');
  if (c.isDraw()) return t('res.fifty');
  return t('res.over');
}

async function userMove(from, to) {
  const c = P.chess;
  const cands = c.moves({ square: from, verbose: true }).filter((m) => m.to === to);
  if (!cands.length) return;
  let promotion;
  if (cands[0].promotion) { promotion = await askPromotion(P.human); if (!promotion) { boardPlay.render(c, { last: lastMoveOf(c) }); return; } }
  let mv;
  try { mv = c.move({ from, to, promotion }); } catch (e) { return; }
  P.resigned = false;
  updatePlay(mv); saveGame();
  if (!c.isGameOver()) engineMove();
}

async function engineMove() {
  const c = P.chess;
  const token = ++P.token;
  P.thinking = true; updatePlay();
  const lv = LEVELS[P.level];
  const t0 = performance.now();
  let uci = null;
  try { uci = await engine.bestMove(c.fen(), lv); } catch (e) { uci = null; }
  if (token !== P.token) return; // game was reset or a move was taken back
  const wait = 550 - (performance.now() - t0);
  if (wait > 0) await sleep(wait);
  if (token !== P.token) return;
  let move = null;
  if (uci) move = { from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] };
  let mv = null;
  try { mv = c.move(move); } catch (e) {
    const all = c.moves({ verbose: true });
    const m = all[Math.floor(Math.random() * all.length)];
    if (m) mv = c.move({ from: m.from, to: m.to, promotion: m.promotion });
  }
  P.thinking = false;
  updatePlay(mv); saveGame();
}

$('#home-new').onclick = () => { location.hash = '#play'; P.started = false; setTimeout(() => { if (!engine) engine = new Engine(); openSetup(); }, 0); };
$('#home-continue').onclick = () => {
  const s = loadSaved();
  if (!engine) engine = new Engine();
  location.hash = '#play';
  if (s) { P.started = false; setTimeout(() => restore(s), 0); }
};
$('#btn-new').onclick = () => { P.token++; P.thinking = false; openSetup(); };
$('#btn-flip').onclick = () => boardPlay.flip();
$('#btn-undo').onclick = () => {
  if (P.thinking) return;
  const c = P.chess;
  P.token++; P.over = false; P.resigned = false; P.counted = false; P.pts = 0;
  c.undo();
  if (c.turn() !== P.human && c.history().length > 0) c.undo();
  updatePlay(); saveGame();
  if (c.turn() !== P.human && !c.isGameOver()) engineMove();
};
$('#btn-hint').onclick = async () => {
  if (P.thinking || P.over || P.chess.turn() !== P.human) return;
  const btn = $('#btn-hint'); btn.disabled = true; btn.textContent = t('hint.thinking');
  try {
    const uci = await engine.bestMove(P.chess.fen(), { skill: 20, movetime: 700 });
    if (uci) boardPlay.setHint(uci.slice(0, 2), uci.slice(2, 4));
  } catch (e) { /* ignore */ }
  btn.textContent = t('btn.hint'); btn.disabled = false;
};
$('#btn-resign').onclick = () => {
  openModal(`<h2>${t('resign.title')}</h2><p class="sub">${t('resign.sub')}</p>
    <div class="modal-actions"><button class="btn" id="no">${t('resign.keep')}</button><button class="btn danger" id="yes">${t('resign.confirm')}</button></div>`);
  $('#no').onclick = closeModal;
  $('#yes').onclick = () => { closeModal(); P.token++; P.thinking = false; P.over = true; P.resigned = true; updatePlay(); };
};

/* ================= LIBRARY ================= */
let imported = LS.get('gunmetal.imported', []);
const favs = new Set(LS.get('gunmetal.fav', []));
const done = new Set(LS.get('gunmetal.done', []));
const saveFavs = () => LS.set('gunmetal.fav', [...favs]);
const saveDone = () => LS.set('gunmetal.done', [...done]);

const LEVEL_RANK = { Beginner: 0, Intermediate: 1, Advanced: 2, Custom: 3 };
const FIRST_KEYS = ['1.e4', '1.d4', 'Flank', 'Other'];
const resultKey = (r) => (r === '1-0' ? 'w' : r === '0-1' ? 'b' : r === '1/2-1/2' ? 'd' : '');

function prep(g) {
  const c = new Chess();
  try { c.loadPgn(g.pgn); } catch (e) { return null; }
  const h = c.history();
  const first = h[0] === 'e4' ? '1.e4' : h[0] === 'd4' ? '1.d4' : (h[0] === 'c4' || h[0] === 'Nf3') ? 'Flank' : 'Other';
  const themes = new Set(g.tags || []);
  if (Math.ceil(h.length / 2) <= 25 && c.isCheckmate()) themes.add('Miniature');
  if (c.isCheckmate()) themes.add('Mate');
  return { ...g, plies: h.length, moveCount: Math.ceil(h.length / 2), mate: c.isCheckmate(), first, themes: [...themes] };
}
let GAMES = [];
function rebuildGames() { GAMES = [...BASE_GAMES, ...imported].map(prep).filter(Boolean); }
rebuildGames();

const L = { q: '', level: '', era: '', theme: '', player: '', result: '', first: '', sort: 'rec', fav: false, collection: '' };

function fillSelect(id, first, items) {
  const el = $(id);
  const cur = el.value;
  el.innerHTML = `<option value="">${first}</option>` + items.map(([v, label]) => `<option value="${v}">${label}</option>`).join('');
  el.value = cur;
}
function setupFilters() {
  const levels = ['Beginner', 'Intermediate', 'Advanced', ...(GAMES.some((g) => g.level === 'Custom') ? ['Custom'] : [])];
  fillSelect('#f-level', t('f.level'), levels.map((x) => [x, tEnum('level', x)]));
  const eras = ['Timeless', 'Romantic', 'Classical', 'Modern', ...(GAMES.some((g) => g.era === 'Custom') ? ['Custom'] : [])];
  fillSelect('#f-era', t('f.era'), eras.map((x) => [x, tEnum('era', x)]));
  const themes = [...new Set(GAMES.flatMap((g) => g.themes))].sort((a, b) => tEnum('theme', a).localeCompare(tEnum('theme', b)));
  fillSelect('#f-theme', t('f.theme'), themes.map((x) => [x, tEnum('theme', x)]));
  const players = [...new Set(GAMES.flatMap((g) => g.players || []))].sort();
  fillSelect('#f-player', t('f.player'), players.map((x) => [x, x]));
  fillSelect('#f-result', t('f.result'), ['w', 'b', 'd'].map((k) => [k, t('res.' + k)]));
  fillSelect('#f-first', t('f.first'), FIRST_KEYS.map((k) => [k, t('first.' + k)]));
  const sortEl = $('#f-sort');
  const cur = sortEl.value || L.sort;
  sortEl.innerHTML = ['rec', 'easy', 'hard', 'old', 'new', 'short', 'long', 'az'].map((v) => `<option value="${v}">${t('sort.' + v)}</option>`).join('');
  sortEl.value = cur;
}

function filteredGames() {
  const q = L.q.trim().toLowerCase();
  const col = L.collection ? COLLECTIONS.find((c) => c.id === L.collection) : null;
  const list = GAMES.filter((g) => {
    if (L.level && g.level !== L.level) return false;
    if (L.era && g.era !== L.era) return false;
    if (L.theme && !g.themes.includes(L.theme)) return false;
    if (L.player && !(g.players || []).includes(L.player)) return false;
    if (L.result && resultKey(g.result) !== L.result) return false;
    if (L.first && g.first !== L.first) return false;
    if (L.fav && !favs.has(g.id)) return false;
    if (col && !col.games.includes(g.id)) return false;
    if (q) {
      const lg = locGame(g);
      const hay = [lg.title, lg.white, lg.black, lg.event, lg.year, lg.opening, tEnum('level', g.level), tEnum('era', g.era), g.themes.map((x) => tEnum('theme', x)).join(' '), lg.intro, (lg.story || []).join(' ')].join(' ').toLowerCase();
      if (!q.split(/\s+/).every((w) => hay.includes(w))) return false;
    }
    return true;
  });
  const yr = (g) => parseInt(g.year, 10) || 0;
  const idx = (g) => GAMES.indexOf(g);
  const sorts = {
    rec: (a, b) => idx(a) - idx(b),
    easy: (a, b) => LEVEL_RANK[a.level] - LEVEL_RANK[b.level] || idx(a) - idx(b),
    hard: (a, b) => LEVEL_RANK[b.level] - LEVEL_RANK[a.level] || idx(a) - idx(b),
    old: (a, b) => yr(a) - yr(b), new: (a, b) => yr(b) - yr(a),
    short: (a, b) => a.moveCount - b.moveCount, long: (a, b) => b.moveCount - a.moveCount,
    az: (a, b) => locGame(a).title.localeCompare(locGame(b).title)
  };
  return list.sort(sorts[L.sort] || sorts.rec);
}

function renderLibrary() {
  setupFilters();
  const list = filteredGames();
  const col = L.collection ? COLLECTIONS.find((c) => c.id === L.collection) : null;
  $('#lib-count').innerHTML = t('lib.count', { n: list.length, total: GAMES.length }) +
    (col ? ` &middot; ${t('lib.collection')}: <b>${locCollection(col).title}</b> <button class="link" id="clr-col">${t('lib.remove')}</button>` : '');
  $('#f-fav').classList.toggle('on', L.fav);
  $('#lib-grid').innerHTML = list.length ? list.map(cardHtml).join('') : `<div class="empty">${t('lib.empty')}</div>`;
  $('#collections').innerHTML = COLLECTIONS.map((c0) => {
    const c = locCollection(c0);
    return `<button class="col-card ${L.collection === c.id ? 'on' : ''}" data-col="${c.id}">
      <b>${c.title}</b><span>${c.blurb}</span><em>${t('lib.gamesN', { n: c.games.length })}</em></button>`;
  }).join('');
  $('#legends').innerHTML = LEGENDS.map((p0) => {
    const p = locLegend(p0);
    const n = GAMES.filter((g) => (g.players || []).includes(p.name)).length;
    return `<div class="legend"><div class="lg-name">${p.name}</div><div class="lg-line">${p.line}</div>
      <div class="lg-meta">${p.years} &middot; ${p.from}</div><p>${p.bio}</p>
      ${n ? `<button class="btn" data-player="${p.name}">${n > 1 ? t('lib.legendMany', { n }) : t('lib.legendOne')}</button>` : ''}</div>`;
  }).join('');
}

function cardHtml(g0) {
  const g = locGame(g0);
  const isFav = favs.has(g.id), isDone = done.has(g.id);
  const when = [g.era && g.era !== 'Custom' ? tEnum('era', g.era) : '', g.year].filter(Boolean).join(' &middot; ');
  return `<div class="g-card" data-id="${g.id}" tabindex="0">
    <div class="g-head"><span class="badge ${g.level}">${tEnum('level', g.level)}</span><span class="g-era">${when}</span>
      <button class="fav-btn ${isFav ? 'on' : ''}" data-fav="${g.id}" title="${isFav ? t('fav.remove') : t('fav.add')}">${isFav ? '&#9733;' : '&#9734;'}</button></div>
    <h3>${g.title}</h3>
    <div class="pl">${g.white} <span style="color:var(--muted)">vs</span> ${g.black}</div>
    <div class="ev">${[g.event, g.opening].filter(Boolean).join(' &middot; ')}</div>
    <p>${(g.intro || '').split('. ')[0].replace(/\.$/, '')}.</p>
    <div class="tags"><span class="tag">${t('card.moves', { n: g0.moveCount })}</span><span class="tag">${t('res.' + resultKey(g.result)) === 'res.' ? g.result : t('res.' + resultKey(g.result))}</span>
      ${g0.themes.slice(0, 3).map((x) => `<span class="tag">${tEnum('theme', x)}</span>`).join('')}${g.story && g.story.length ? `<span class="tag story">${t('tag.story')}</span>` : ''}${isDone ? `<span class="tag done">${t('tag.done')}</span>` : ''}</div>
  </div>`;
}

function scrollToGrid() { $('#lib-count').scrollIntoView({ behavior: 'smooth', block: 'start' }); }

$('#lib-grid').onclick = (e) => {
  const fav = e.target.closest('[data-fav]');
  if (fav) { toggleFav(fav.dataset.fav); renderLibrary(); return; }
  const b = e.target.closest('[data-id]');
  if (b) location.hash = '#game/' + b.dataset.id;
};
$('#lib-grid').onkeydown = (e) => { if (e.key === 'Enter') { const b = e.target.closest('[data-id]'); if (b) location.hash = '#game/' + b.dataset.id; } };
$('#collections').onclick = (e) => {
  const b = e.target.closest('[data-col]'); if (!b) return;
  L.collection = L.collection === b.dataset.col ? '' : b.dataset.col;
  renderLibrary(); if (L.collection) scrollToGrid();
};
$('#lib-count').onclick = (e) => { if (e.target.id === 'clr-col') { L.collection = ''; renderLibrary(); } };
$('#legends').onclick = (e) => {
  const b = e.target.closest('[data-player]'); if (!b) return;
  Object.assign(L, { q: '', level: '', era: '', theme: '', result: '', first: '', fav: false, collection: '', player: b.dataset.player });
  syncControls(); renderLibrary(); scrollToGrid();
};
function syncControls() {
  $('#lib-search').value = L.q;
  ['level', 'era', 'theme', 'player', 'result', 'first', 'sort'].forEach((k) => { $('#f-' + k).value = L[k]; });
}
$('#lib-search').oninput = (e) => { L.q = e.target.value; renderLibrary(); };
['level', 'era', 'theme', 'player', 'result', 'first', 'sort'].forEach((k) => {
  $('#f-' + k).onchange = (e) => { L[k] = e.target.value; renderLibrary(); };
});
$('#f-fav').onclick = () => { L.fav = !L.fav; renderLibrary(); };
$('#f-clear').onclick = () => {
  Object.assign(L, { q: '', level: '', era: '', theme: '', player: '', result: '', first: '', sort: 'rec', fav: false, collection: '' });
  renderLibrary(); syncControls();
};

function toggleFav(id) { if (favs.has(id)) favs.delete(id); else favs.add(id); saveFavs(); }
function markDone(id) { if (!done.has(id)) { done.add(id); saveDone(); trackEvent('game-watched', 'Famous game finished'); } }

/* ---- import a game ---- */
$('#btn-import').onclick = () => {
  openModal(`<h2>${t('imp.title')}</h2>
    <p class="sub">${t('imp.sub')}</p>
    <input id="imp-title" class="field" placeholder="${t('imp.titlePh')}">
    <textarea id="imp-pgn" class="field" rows="8" placeholder='[Event "My game"]&#10;[White "Me"]&#10;[Black "Computer"]&#10;&#10;1. e4 e5 2. Nf3 Nc6 ...'></textarea>
    <div class="imp-msg" id="imp-msg"></div>
    <div class="modal-actions"><button class="btn" id="imp-cancel">${t('imp.cancel')}</button><button class="btn primary" id="imp-save">${t('imp.go')}</button></div>`);
  $('#imp-cancel').onclick = closeModal;
  $('#imp-save').onclick = () => {
    const text = $('#imp-pgn').value.trim();
    const c = new Chess();
    try { c.loadPgn(text); } catch (e) { $('#imp-msg').textContent = t('imp.errInvalid'); return; }
    if (!c.history().length) { $('#imp-msg').textContent = t('imp.errNone'); return; }
    let h = {};
    try { h = c.header() || {}; } catch (e) { h = {}; }
    const clean = (s, d) => (s && s !== '?' ? s : d);
    const white = clean(h.White, t('color.w')), black = clean(h.Black, t('color.b'));
    const year = (h.Date || '').slice(0, 4);
    imported.push({
      id: 'imp-' + Date.now().toString(36),
      title: $('#imp-title').value.trim() || `${white} vs ${black}`,
      white, black, event: clean(h.Event, t('imp.event')), year: /^\d{4}$/.test(year) ? year : '', era: 'Custom',
      result: clean(h.Result, '*'), level: 'Custom', opening: clean(h.Opening, ''), players: [white, black].filter((n) => n !== t('color.w') && n !== t('color.b')),
      tags: ['Imported'], intro: t('imp.intro'), lesson: '', story: [], pgn: text, comments: {}, imported: true
    });
    LS.set('gunmetal.imported', imported);
    trackEvent('import-game', 'Game imported');
    rebuildGames(); closeModal(); renderLibrary();
    location.hash = '#game/' + imported.at(-1).id;
  };
};

/* ================= GAME VIEWER ================= */
const V = { game: null, raw: null, moves: [], fens: [], comments: new Map(), idx: 0, mode: 'watch', side: 'w', timer: null, tries: 0, firstTry: 0, hinted: false, guessable: 0, busy: false };

const boardView = new Board($('#board-view'), {
  canPick: (sq, p) => V.mode === 'guess' && !V.busy && V.moves[V.idx] && V.moves[V.idx].color === V.side && p.color === V.side,
  targetsFor: (sq) => new Chess(V.fens[V.idx]).moves({ square: sq, verbose: true }).map((m) => m.to),
  onUserMove: (from, to) => guessMove(from, to)
});
const fxView = new Effects(boardView);

function openViewer(id) {
  const raw = GAMES.find((x) => x.id === id);
  if (!raw) { location.hash = '#library'; return; }
  show('viewer');
  V.raw = raw;
  const c = new Chess(); c.loadPgn(raw.pgn);
  V.moves = c.history({ verbose: true });
  V.fens = [V.moves.length ? V.moves[0].before : new Chess().fen(), ...V.moves.map((m) => m.after)];
  V.idx = 0; V.mode = 'watch'; V.side = 'w'; V.tries = 0; V.firstTry = 0; V.busy = false;
  boardView.flipped = false; boardView.build();
  localizeViewer();
  setMode('watch');
}

/** (Re)apply the current language to the viewer's static parts and comments. */
function localizeViewer() {
  const g = locGame(V.raw);
  V.game = g;
  V.comments = new Map();
  const norm = new Map(Object.entries(g.comments).map(([k, v]) => [strip(k), v]));
  V.moves.forEach((m, i) => {
    const key = (m.color === 'w' ? `${i / 2 + 1}.` : `${Math.floor(i / 2) + 1}...`) + strip(m.san);
    if (norm.has(key)) V.comments.set(i, norm.get(key));
  });
  $('#v-title').textContent = g.title;
  $('#v-meta').innerHTML = `<b>${g.white}</b> vs <b>${g.black}</b><br>${g.event}${g.year ? ', ' + g.year : ''} &middot; ${t('resultWord')} ${g.result} &middot; ${tEnum('level', g.level)}` +
    `<br>${[g.opening, t('card.moves', { n: V.raw.moveCount })].filter(Boolean).join(' &middot; ')}`;
  const hasStory = g.story && g.story.length;
  $('#v-story').hidden = !hasStory;
  $('#v-story-body').innerHTML = hasStory ? g.story.map((p) => `<p>${p}</p>`).join('') : '';
  $('#v-remove').hidden = !g.imported;
  $('#g-side').textContent = t('g.side', { c: t('color.' + V.side) });
  paintFav(); stopAutoplay();
}

function moveLabel(i) {
  const m = V.moves[i];
  return (m.color === 'w' ? `${i / 2 + 1}. ` : `${Math.floor(i / 2) + 1}... `) + m.san;
}
const HR = '<hr style="border:0;border-top:1px solid var(--line);margin:10px 0">';

function renderViewer(extraHtml = '', fxMove = null) {
  const last = V.idx > 0 ? { from: V.moves[V.idx - 1].from, to: V.moves[V.idx - 1].to } : null;
  fxView.reset();
  const pos = new Chess(V.fens[V.idx]);
  boardView.render(pos, { last });
  if (fxMove) fxView.play(fxMove, pos, { sub: fxMove.color === 'w' ? t('fx.white') : t('fx.black') });
  boardView.setHint(null);
  renderMoves($('#v-moves'), V.moves.map((m) => m.san), V.idx - 1, new Set(V.comments.keys()), V.mode === 'watch');
  let html;
  if (V.idx === 0) html = `<div class="mv">${t('v.intro')}</div>${V.game.intro}`;
  else {
    const i = V.idx - 1;
    html = `<div class="mv">${moveLabel(i)}</div>${V.comments.get(i) || `<span style="color:var(--muted)">${t('v.natural')}</span>`}`;
    if (V.idx === V.moves.length) {
      html += `${HR}<b>${t('v.result', { r: V.game.result })}</b> ${V.game.lesson || ''}`;
      markDone(V.game.id);
    }
  }
  $('#v-coach').innerHTML = extraHtml + html;
  $('#v-first').disabled = $('#v-prev').disabled = V.idx === 0 || V.mode === 'guess';
  $('#v-next').disabled = $('#v-last').disabled = V.idx === V.moves.length || V.mode === 'guess';
  $('#v-play').disabled = V.mode === 'guess';
}

function goTo(i) {
  const prev = V.idx;
  V.idx = Math.max(0, Math.min(V.moves.length, i));
  renderViewer('', V.idx === prev + 1 ? V.moves[V.idx - 1] : null);
}
$('#v-first').onclick = () => { stopAutoplay(); goTo(0); };
$('#v-prev').onclick = () => { stopAutoplay(); goTo(V.idx - 1); };
$('#v-next').onclick = () => { stopAutoplay(); goTo(V.idx + 1); };
$('#v-last').onclick = () => { stopAutoplay(); goTo(V.moves.length); };
$('#v-moves').onclick = (e) => { const m = e.target.closest('[data-i]'); if (m && V.mode === 'watch') { stopAutoplay(); goTo(+m.dataset.i + 1); } };
$('#v-play').onclick = () => {
  if (V.timer) { stopAutoplay(); return; }
  if (V.idx >= V.moves.length) goTo(0);
  $('#v-play').innerHTML = t('v.pause');
  V.timer = setInterval(() => {
    if (V.idx >= V.moves.length) { stopAutoplay(); return; }
    goTo(V.idx + 1);
  }, 1800);
};
function stopAutoplay() {
  if (V.timer) { clearInterval(V.timer); V.timer = null; }
  const b = $('#v-play'); if (b) b.innerHTML = t('v.play');
}
document.addEventListener('keydown', (e) => {
  if ($('#view-viewer').classList.contains('hidden') || V.mode !== 'watch' || !$('#modal').classList.contains('hidden')) return;
  if (e.key === 'ArrowRight') { stopAutoplay(); goTo(V.idx + 1); }
  if (e.key === 'ArrowLeft') { stopAutoplay(); goTo(V.idx - 1); }
});

/* ---- watch / guess modes ---- */
function setMode(mode) {
  stopAutoplay();
  V.mode = mode;
  $('#mode-watch').classList.toggle('on', mode === 'watch');
  $('#mode-guess').classList.toggle('on', mode === 'guess');
  $('#guess-tools').hidden = mode !== 'guess';
  if (mode === 'watch') { V.busy = false; goTo(V.idx); return; }
  // guess mode: restart from the beginning
  V.idx = 0; V.tries = 0; V.firstTry = 0; V.hinted = false; V.busy = false;
  V.guessable = V.moves.filter((m) => m.color === V.side).length;
  boardView.flipped = V.side === 'b'; boardView.build();
  $('#g-side').textContent = t('g.side', { c: t('color.' + V.side) });
  trackEvent('guess-mode', 'Guess the move started');
  renderViewer(`<div class="mv" style="color:var(--text)">${t('g.title')}</div>${t('g.intro', { c: t('color.' + V.side) })}${HR}`);
  guessAdvance();
}
$('#mode-watch').onclick = () => setMode('watch');
$('#mode-guess').onclick = () => setMode('guess');
$('#g-side').onclick = () => { V.side = V.side === 'w' ? 'b' : 'w'; setMode('guess'); };

async function guessAdvance() {
  // play the opponent's moves automatically until it's the player's turn
  while (V.idx < V.moves.length && V.moves[V.idx].color !== V.side) {
    V.busy = true;
    await sleep(750);
    if (V.mode !== 'guess') return;
    V.idx++;
    renderViewer('', V.moves[V.idx - 1]);
  }
  V.busy = false;
  if (V.idx >= V.moves.length) {
    markDone(V.game.id);
    $('#v-coach').innerHTML = `<div class="mv">${t('g.complete')}</div>${t('g.found', { a: V.firstTry, b: V.guessable })}${HR}${V.game.lesson || ''}`;
  }
}

function guessMove(from, to) {
  const m = V.moves[V.idx];
  if (!m) return;
  V.tries++;
  if (m.from === from && m.to === to) {
    if (!V.hinted && V.tries === 1) V.firstTry++;
    V.tries = 0; V.hinted = false;
    V.idx++;
    renderViewer(`<div class="ok"><b>${t('g.correct')}</b></div>`, V.moves[V.idx - 1]);
    guessAdvance();
  } else {
    boardView.render(new Chess(V.fens[V.idx]), { last: V.idx > 0 ? { from: V.moves[V.idx - 1].from, to: V.moves[V.idx - 1].to } : null });
    $('#board-view').classList.remove('shake'); void $('#board-view').offsetWidth; $('#board-view').classList.add('shake');
    const i = V.idx - 1;
    const base = V.idx === 0 ? `<div class="mv">${t('g.title')}</div>` : `<div class="mv">${moveLabel(i)}</div>${V.comments.get(i) || ''}`;
    $('#v-coach').innerHTML = `<div class="no"><b>${t('g.wrong')}</b> ${t('g.wrong2')}</div>${base}`;
  }
}
$('#g-hint').onclick = () => {
  const m = V.moves[V.idx];
  if (!m || m.color !== V.side || V.busy) return;
  V.hinted = true;
  boardView.setHint(m.from, null);
};
$('#g-show').onclick = () => {
  const m = V.moves[V.idx];
  if (!m || m.color !== V.side || V.busy) return;
  V.hinted = true;
  boardView.setHint(m.from, m.to);
  $('#v-coach').insertAdjacentHTML('afterbegin', `<div class="no"><b>${t('g.played', { m: m.san })}</b> ${t('g.played2')}</div>`);
};

/* ---- viewer extras: favorite, next game, remove ---- */
function paintFav() {
  const on = V.raw && favs.has(V.raw.id);
  $('#v-fav').innerHTML = on ? '&#9733;' : '&#9734;';
  $('#v-fav').classList.toggle('on', !!on);
  $('#v-fav').title = on ? t('fav.remove') : t('fav.add');
}
$('#v-fav').onclick = () => { toggleFav(V.raw.id); paintFav(); };
$('#v-nextgame').onclick = () => {
  const i = GAMES.findIndex((g) => g.id === V.raw.id);
  location.hash = '#game/' + GAMES[(i + 1) % GAMES.length].id;
};
$('#v-remove').onclick = () => {
  openModal(`<h2>${t('rm.title')}</h2><p class="sub">${t('rm.sub')}</p>
    <div class="modal-actions"><button class="btn" id="rm-no">${t('rm.cancel')}</button><button class="btn danger" id="rm-yes">${t('rm.confirm')}</button></div>`);
  $('#rm-no').onclick = closeModal;
  $('#rm-yes').onclick = () => {
    imported = imported.filter((g) => g.id !== V.raw.id);
    LS.set('gunmetal.imported', imported); favs.delete(V.raw.id); saveFavs(); rebuildGames(); closeModal();
    location.hash = '#library';
  };
};

/* ================= RANKING ================= */
let rkTab = 'local';
async function renderRanking() {
  $('#rk-global').hidden = !globalOn;
  $('#rk-local').classList.toggle('on', rkTab === 'local');
  $('#rk-global').classList.toggle('on', rkTab === 'global');
  const box = $('#rk-table');
  $('#rk-note').hidden = globalOn;
  let rows = [];
  if (rkTab === 'global' && globalOn) {
    box.innerHTML = `<div class="empty">${t('rk.loading')}</div>`;
    try { rows = await globalBoard(50); } catch (e) { box.innerHTML = `<div class="empty">${t('rk.error')}</div>`; return; }
  } else rows = localBoard();
  if (!rows.length) { box.innerHTML = `<div class="empty">${t('rk.empty')}</div>`; return; }
  const me = getPlayer();
  box.innerHTML = `<table class="rk"><thead><tr><th>${t('rk.col.pos')}</th><th class="nm">${t('rk.col.player')}</th><th>${t('rk.col.pts')}</th><th>${t('rk.col.w')}</th><th>${t('rk.col.d')}</th><th>${t('rk.col.l')}</th><th>${t('rk.col.cpu')}</th><th>${t('rk.col.online')}</th></tr></thead><tbody>` +
    rows.map((p, i) => `<tr class="${me && p.id === me.id ? 'me' : ''}"><td class="pos">${i + 1}</td><td class="nm">${esc(p.name)}${me && p.id === me.id ? ` <small style="color:var(--muted)">(${t('rk.you')})</small>` : ''}</td><td class="pts">${p.points}</td><td>${p.w}</td><td>${p.d}</td><td>${p.l}</td><td>${p.cpu}</td><td>${p.online}</td></tr>`).join('') +
    '</tbody></table>';
}
$('#rk-local').onclick = () => { rkTab = 'local'; renderRanking(); };
$('#rk-global').onclick = () => { rkTab = 'global'; renderRanking(); };
$('#me-chip').onclick = () => { askName(); };

/* ================= sound, language, share ================= */
const sndBtn = $('#snd');
const paintSnd = () => { sndBtn.textContent = isSoundOn() ? t('sound.on') : t('sound.off'); };
sndBtn.onclick = () => { setSoundOn(!isSoundOn()); paintSnd(); };

const langSel = $('#lang');
langSel.innerHTML = LANGS.map(([code, short, name]) => `<option value="${code}" title="${name}">${short}</option>`).join('');
langSel.value = getLang();
langSel.onchange = async () => {
  const l = langSel.value;
  setLang(l);
  await loadContent(l);
  trackEvent('lang-' + l, 'Language: ' + l);
  relocalize();
};

/** Re-render the current screen after a language change (keeps the position in a famous game). */
function relocalize() {
  applyStatic();
  paintSnd();
  $('#pieces-strip').setAttribute('aria-label', 'Gunmetal Chess');
  if (currentView === 'home') refreshHome();
  else if (currentView === 'play') { if (P.started) updatePlay(); }
  else if (currentView === 'library') renderLibrary();
  else if (currentView === 'viewer') { const keep = V.idx; localizeViewer(); if (V.mode === 'watch') goTo(keep); else renderViewer(); }
  else if (currentView === 'online') refreshOnline();
  else if (currentView === 'ranking') renderRanking();
  else if (currentView === 'learn') refreshLearn();
  paintChip();
  if (!$('#modal').classList.contains('hidden')) closeModal();
}

$('#share').onclick = async () => {
  const url = location.origin + location.pathname;
  try {
    if (navigator.share) { await navigator.share({ title: 'Gunmetal Chess', url }); trackEvent('share', 'Share'); return; }
  } catch (e) { return; }
  try { await navigator.clipboard.writeText(url); } catch (e) { /* ignore */ }
  const b = $('#share'); const old = b.textContent; b.textContent = t('ft.copied');
  setTimeout(() => { b.textContent = old; }, 1800);
  trackEvent('share', 'Share');
};
if (analyticsOn) $('#ft-stats').hidden = false;

/* ================= install as an app (PWA) ================= */
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('sw.js').catch(() => { /* offline mode is optional */ });
}
let installEvent = null;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installEvent = e; $('#install').hidden = false; });
$('#install').onclick = async () => {
  if (!installEvent) return;
  installEvent.prompt();
  await installEvent.userChoice.catch(() => null);
  installEvent = null; $('#install').hidden = true; trackEvent('pwa-install', 'App installed');
};
window.addEventListener('appinstalled', () => { $('#install').hidden = true; });
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
if (isIOS && !isStandalone) $('#ios-hint').hidden = false;

/* ================= boot ================= */
async function boot() {
  await loadContent(getLang());
  applyStatic();
  paintSnd();
  paintChip();
  initConsent();
  claimIfNeeded();
  $('#pieces-strip').innerHTML = ['wk', 'wq', 'wr', 'wb', 'wn', 'wp', 'bp', 'bn', 'bb', 'br', 'bq', 'bk'].map((k) => `<img src="img/${k}.png" alt="">`).join('');
  route();
}
boot();
