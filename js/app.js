import { Chess } from '../lib/chess.js';
import { Board } from './board.js';
import { Engine, LEVELS } from './engine.js';
import { GAMES as BASE_GAMES, COLLECTIONS, LEGENDS } from './games.js';
import { Effects, isSoundOn, setSoundOn } from './effects.js';

const $ = (s) => document.querySelector(s);
const SAVE_KEY = 'gunmetal.game.v1';
const PIECE_NAME = { k: 'King', q: 'Queen', r: 'Rook', b: 'Bishop', n: 'Knight', p: 'Pawn' };
const strip = (s) => s.replace(/[!?+#]+$/g, '');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------------- modal helpers ---------------- */
function openModal(html) {
  $('#modal-card').innerHTML = html;
  $('#modal').classList.remove('hidden');
}
function closeModal() { $('#modal').classList.add('hidden'); $('#modal-card').innerHTML = ''; }

/* ---------------- router ---------------- */
const views = ['home', 'play', 'library', 'viewer'];
function show(name) {
  views.forEach((v) => $('#view-' + v).classList.toggle('hidden', v !== name));
  document.querySelectorAll('[data-nav]').forEach((a) => a.classList.toggle('on', a.dataset.nav === (name === 'viewer' ? 'library' : name)));
}
function route() {
  const h = location.hash.replace('#', '') || 'home';
  stopAutoplay();
  if (h.startsWith('game/')) { openViewer(h.slice(5)); return; }
  if (h === 'play') { show('play'); enterPlay(); return; }
  if (h === 'library') { show('library'); renderLibrary(); return; }
  show('home'); refreshHome();
}
window.addEventListener('hashchange', route);

/* ================= PLAY vs COMPUTER ================= */
let engine = null;
const P = { chess: new Chess(), human: 'w', level: 'medium', over: false, thinking: false, started: false, token: 0 };

const boardPlay = new Board($('#board-play'), {
  canPick: (sq, p) => P.started && !P.over && !P.thinking && p.color === P.human && P.chess.turn() === P.human,
  targetsFor: (sq) => P.chess.moves({ square: sq, verbose: true }).map((m) => m.to),
  onUserMove: (from, to) => userMove(from, to)
});

const fxPlay = new Effects(boardPlay);

function saveGame() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ pgn: P.chess.pgn(), human: P.human, level: P.level, over: P.over, ts: Date.now() }));
  } catch (e) { /* storage unavailable */ }
}
function loadSaved() {
  try { return JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); } catch (e) { return null; }
}
function refreshHome() {
  const s = loadSaved();
  const btn = $('#home-continue');
  if (s && s.pgn && !s.over) {
    btn.hidden = false;
    $('#home-continue-sub').textContent = `${LEVELS[s.level].label} level, playing ${s.human === 'w' ? 'White' : 'Black'}`;
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
  P.human = s.human; P.level = s.level; P.over = false; P.started = true; P.thinking = false;
  boardPlay.flipped = P.human === 'b'; boardPlay.build();
  updatePlay();
  if (P.chess.turn() !== P.human && !P.chess.isGameOver()) engineMove();
}

function openSetup() {
  let level = P.level, color = 'w';
  const render = () => {
    openModal(`
      <h2>New Game</h2>
      <p class="sub">Pick your opponent's strength and your color.</p>
      <div class="opt-grid" id="lv">
        ${Object.entries(LEVELS).map(([k, v]) => `<button class="opt ${k === level ? 'on' : ''}" data-lv="${k}"><b>${v.label}</b><small>${v.blurb}</small></button>`).join('')}
      </div>
      <div class="row3" id="cl">
        ${[['w', 'White'], ['b', 'Black'], ['r', 'Random']].map(([k, n]) => `<button class="opt ${k === color ? 'on' : ''}" data-cl="${k}"><b>${n}</b></button>`).join('')}
      </div>
      <div class="modal-actions"><button class="btn primary" id="go">Start Game</button></div>`);
    $('#lv').onclick = (e) => { const b = e.target.closest('[data-lv]'); if (b) { level = b.dataset.lv; render(); } };
    $('#cl').onclick = (e) => { const b = e.target.closest('[data-cl]'); if (b) { color = b.dataset.cl; render(); } };
    $('#go').onclick = () => { closeModal(); startGame(level, color === 'r' ? (Math.random() < 0.5 ? 'w' : 'b') : color); };
  };
  render();
}

function startGame(level, human) {
  P.token++;
  P.chess = new Chess(); P.level = level; P.human = human; P.over = false; P.started = true; P.thinking = false;
  boardPlay.flipped = human === 'b'; boardPlay.build(); boardPlay.hint = null;
  updatePlay(); saveGame();
  if (human === 'b') engineMove();
}

function lastMoveOf(chess) {
  const h = chess.history({ verbose: true });
  return h.length ? { from: h.at(-1).from, to: h.at(-1).to } : null;
}

function capturedBy(chess, color) {
  // pieces captured BY `color` (i.e. opponent pieces lost)
  return chess.history({ verbose: true }).filter((m) => m.color === color && m.captured).map((m) => m.captured);
}
const ORDER = ['q', 'r', 'b', 'n', 'p'];
function capsHtml(types, color) {
  return [...types].sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b)).map((t) => `<img src="img/${color}${t}.png" alt="${PIECE_NAME[t]}">`).join('');
}

function updatePlay(fxMove = null) {
  const c = P.chess;
  fxPlay.reset();
  boardPlay.render(c, { last: lastMoveOf(c) });
  if (fxMove) fxPlay.play(fxMove, c, { sub: fxMove.color === P.human ? 'You win!' : 'The computer wins' });
  boardPlay.setHint(null);
  const opp = P.human === 'w' ? 'b' : 'w';
  const lv = LEVELS[P.level];
  $('#opp-bar').innerHTML = `<b>Computer</b> <span>${lv.label}</span><span class="caps">${capsHtml(capturedBy(c, opp), P.human)}</span>`;
  $('#me-bar').innerHTML = `<b>You</b> <span>${P.human === 'w' ? 'White' : 'Black'}</span><span class="caps">${capsHtml(capturedBy(c, P.human), opp)}</span>`;
  renderMoves($('#play-moves'), c.history(), -1, null, false);
  let msg = '', cls = '';
  if (P.over || c.isGameOver()) { msg = resultText(); cls = 'over'; P.over = true; }
  else if (P.thinking) { msg = 'Computer is thinking'; cls = 'thinking'; }
  else msg = c.isCheck() ? 'Check! Your move.' : 'Your move.';
  const st = $('#play-status'); st.className = 'status ' + cls; st.textContent = msg;
  $('#btn-undo').disabled = P.thinking || c.history().length === 0;
  $('#btn-hint').disabled = P.thinking || P.over || c.turn() !== P.human;
  $('#btn-resign').disabled = P.over;
  if (P.over) { P.thinking = false; saveGame(); }
}

function resultText() {
  const c = P.chess;
  if (P.resigned) return 'You resigned. Computer wins.';
  if (c.isCheckmate()) return c.turn() === P.human ? 'Checkmate. The computer wins.' : 'Checkmate! You win!';
  if (c.isStalemate()) return 'Stalemate. The game is a draw.';
  if (c.isThreefoldRepetition()) return 'Draw by repetition.';
  if (c.isInsufficientMaterial()) return 'Draw: not enough material to mate.';
  if (c.isDraw()) return 'Draw (50-move rule).';
  return 'Game over.';
}

async function userMove(from, to) {
  const c = P.chess;
  const cands = c.moves({ square: from, verbose: true }).filter((m) => m.to === to);
  if (!cands.length) return;
  let promotion;
  if (cands[0].promotion) promotion = await askPromotion(P.human);
  let mv;
  try { mv = c.move({ from, to, promotion }); } catch (e) { return; }
  P.resigned = false;
  updatePlay(mv); saveGame();
  if (!c.isGameOver()) engineMove();
}

function askPromotion(color) {
  return new Promise((resolve) => {
    openModal(`<h2>Promote your pawn</h2><p class="sub">Choose a new piece.</p>
      <div class="promo">${['q', 'r', 'b', 'n'].map((t) => `<button data-p="${t}" title="${PIECE_NAME[t]}"><img src="img/${color}${t}.png" alt="${PIECE_NAME[t]}"></button>`).join('')}</div>`);
    $('#modal-card').onclick = (e) => { const b = e.target.closest('[data-p]'); if (b) { closeModal(); resolve(b.dataset.p); } };
  });
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

$('#home-new').onclick = () => { location.hash = '#play'; P.started = false; enterPlayFresh(); };
function enterPlayFresh() { setTimeout(() => { if (!engine) engine = new Engine(); openSetup(); }, 0); }
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
  P.token++; P.over = false; P.resigned = false;
  c.undo();
  if (c.turn() !== P.human && c.history().length > 0) c.undo();
  updatePlay(); saveGame();
  if (c.turn() !== P.human && !c.isGameOver()) engineMove();
};
$('#btn-hint').onclick = async () => {
  if (P.thinking || P.over || P.chess.turn() !== P.human) return;
  const btn = $('#btn-hint'); btn.disabled = true; btn.textContent = 'Thinking...';
  try {
    const uci = await engine.bestMove(P.chess.fen(), { skill: 20, movetime: 700 });
    if (uci) boardPlay.setHint(uci.slice(0, 2), uci.slice(2, 4));
  } catch (e) { /* ignore */ }
  btn.textContent = 'Hint'; btn.disabled = false;
};
$('#btn-resign').onclick = () => {
  openModal(`<h2>Resign this game?</h2><p class="sub">The computer will be declared the winner.</p>
    <div class="modal-actions"><button class="btn" id="no">Keep playing</button><button class="btn danger" id="yes">Resign</button></div>`);
  $('#no').onclick = closeModal;
  $('#yes').onclick = () => { closeModal(); P.token++; P.thinking = false; P.over = true; P.resigned = true; updatePlay(); };
};

/* ---- move list renderer (shared) ---- */
function renderMoves(el, sans, curIdx, commentSet, clickable) {
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

/* ================= LIBRARY ================= */
const LS = {
  get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v === null || v === undefined ? d : v; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
};
let imported = LS.get('gunmetal.imported', []);
const favs = new Set(LS.get('gunmetal.fav', []));
const done = new Set(LS.get('gunmetal.done', []));
const saveFavs = () => LS.set('gunmetal.fav', [...favs]);
const saveDone = () => LS.set('gunmetal.done', [...done]);

const LEVEL_RANK = { Beginner: 0, Intermediate: 1, Advanced: 2, Custom: 3 };
const FIRST_LABEL = { '1.e4': '1.e4 (King\'s pawn)', '1.d4': '1.d4 (Queen\'s pawn)', Flank: 'Flank (1.c4 / 1.Nf3)', Other: 'Other first moves' };
const RESULT_LABEL = { w: 'White wins', b: 'Black wins', d: 'Draw' };
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
function rebuildGames() {
  GAMES = [...BASE_GAMES, ...imported].map(prep).filter(Boolean);
}
rebuildGames();

const L = { q: '', level: '', era: '', theme: '', player: '', result: '', first: '', sort: 'rec', fav: false, collection: '' };

function fillSelect(id, first, items) {
  const el = $(id);
  const cur = el.value;
  el.innerHTML = `<option value="">${first}</option>` + items.map(([v, t]) => `<option value="${v}">${t}</option>`).join('');
  el.value = cur;
}
function setupFilters() {
  const levels = ['Beginner', 'Intermediate', 'Advanced', ...(GAMES.some((g) => g.level === 'Custom') ? ['Custom'] : [])];
  fillSelect('#f-level', 'All levels', levels.map((x) => [x, x]));
  const eras = ['Timeless', 'Romantic', 'Classical', 'Modern', ...(GAMES.some((g) => g.era === 'Custom') ? ['Custom'] : [])];
  fillSelect('#f-era', 'All eras', eras.map((x) => [x, x]));
  const themes = [...new Set(GAMES.flatMap((g) => g.themes))].sort();
  fillSelect('#f-theme', 'All themes', themes.map((x) => [x, x]));
  const players = [...new Set(GAMES.flatMap((g) => g.players || []))].sort();
  fillSelect('#f-player', 'All players', players.map((x) => [x, x]));
  fillSelect('#f-result', 'All results', Object.entries(RESULT_LABEL));
  fillSelect('#f-first', 'Any first move', Object.entries(FIRST_LABEL));
  const sortEl = $('#f-sort');
  if (!sortEl.options.length) {
    sortEl.innerHTML = [['rec', 'Sort: Recommended'], ['easy', 'Easiest first'], ['hard', 'Hardest first'], ['old', 'Oldest first'], ['new', 'Newest first'], ['short', 'Shortest first'], ['long', 'Longest first'], ['az', 'A to Z']]
      .map(([v, t]) => `<option value="${v}">${t}</option>`).join('');
  }
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
      const hay = [g.title, g.white, g.black, g.event, g.year, g.opening, g.level, g.era, g.themes.join(' '), g.intro, (g.story || []).join(' ')].join(' ').toLowerCase();
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
    az: (a, b) => a.title.localeCompare(b.title)
  };
  return list.sort(sorts[L.sort] || sorts.rec);
}

function renderLibrary() {
  setupFilters();
  const list = filteredGames();
  const col = L.collection ? COLLECTIONS.find((c) => c.id === L.collection) : null;
  $('#lib-count').innerHTML = `Showing <b>${list.length}</b> of ${GAMES.length} games` +
    (col ? ` &middot; Collection: <b>${col.title}</b> <button class="link" id="clr-col">remove</button>` : '');
  $('#f-fav').classList.toggle('on', L.fav);
  $('#lib-grid').innerHTML = list.length ? list.map(cardHtml).join('') :
    `<div class="empty">No games match these filters. Try clearing a filter or searching for something else.</div>`;
  $('#collections').innerHTML = COLLECTIONS.map((c) => `
    <button class="col-card ${L.collection === c.id ? 'on' : ''}" data-col="${c.id}">
      <b>${c.title}</b><span>${c.blurb}</span><em>${c.games.length} games</em>
    </button>`).join('');
  $('#legends').innerHTML = LEGENDS.map((p) => {
    const n = GAMES.filter((g) => (g.players || []).includes(p.name)).length;
    return `<div class="legend"><div class="lg-name">${p.name}</div><div class="lg-line">${p.line}</div>
      <div class="lg-meta">${p.years} &middot; ${p.from}</div><p>${p.bio}</p>
      ${n ? `<button class="btn" data-player="${p.name}">${n} game${n > 1 ? 's' : ''} in library</button>` : ''}</div>`;
  }).join('');
}

function cardHtml(g) {
  const isFav = favs.has(g.id), isDone = done.has(g.id);
  const when = [g.era && g.era !== 'Custom' ? g.era : '', g.year].filter(Boolean).join(' &middot; ');
  return `<div class="g-card" data-id="${g.id}" tabindex="0">
    <div class="g-head"><span class="badge ${g.level}">${g.level}</span><span class="g-era">${when}</span>
      <button class="fav-btn ${isFav ? 'on' : ''}" data-fav="${g.id}" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">${isFav ? '&#9733;' : '&#9734;'}</button></div>
    <h3>${g.title}</h3>
    <div class="pl">${g.white} <span style="color:var(--muted)">vs</span> ${g.black}</div>
    <div class="ev">${[g.event, g.opening].filter(Boolean).join(' &middot; ')}</div>
    <p>${(g.intro || '').split('. ')[0].replace(/\.$/, '')}.</p>
    <div class="tags"><span class="tag">${g.moveCount} moves</span><span class="tag">${RESULT_LABEL[resultKey(g.result)] || 'Result ' + g.result}</span>
      ${g.themes.slice(0, 3).map((t) => `<span class="tag">${t}</span>`).join('')}${g.story && g.story.length ? '<span class="tag story">Story</span>' : ''}${isDone ? '<span class="tag done">Watched &#10003;</span>' : ''}</div>
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

function toggleFav(id) {
  if (favs.has(id)) favs.delete(id); else favs.add(id);
  saveFavs();
}
function markDone(id) {
  if (!done.has(id)) { done.add(id); saveDone(); }
}

/* ---- import a game ---- */
$('#btn-import').onclick = () => {
  openModal(`<h2>Import a game</h2>
    <p class="sub">Paste a game in PGN format (chess.com and Lichess both let you copy it). It is saved only in this browser.</p>
    <input id="imp-title" class="field" placeholder="Title (optional)">
    <textarea id="imp-pgn" class="field" rows="8" placeholder='[Event "My game"]&#10;[White "Me"]&#10;[Black "Computer"]&#10;&#10;1. e4 e5 2. Nf3 Nc6 ...'></textarea>
    <div class="imp-msg" id="imp-msg"></div>
    <div class="modal-actions"><button class="btn" id="imp-cancel">Cancel</button><button class="btn primary" id="imp-save">Import</button></div>`);
  $('#imp-cancel').onclick = closeModal;
  $('#imp-save').onclick = () => {
    const text = $('#imp-pgn').value.trim();
    const c = new Chess();
    try { c.loadPgn(text); } catch (e) { $('#imp-msg').textContent = 'That does not look like a valid PGN. Check the moves and try again.'; return; }
    if (!c.history().length) { $('#imp-msg').textContent = 'No moves found in that text.'; return; }
    let h = {};
    try { h = c.header() || {}; } catch (e) { h = {}; }
    const clean = (s, d) => (s && s !== '?' ? s : d);
    const white = clean(h.White, 'White'), black = clean(h.Black, 'Black');
    const year = (h.Date || '').slice(0, 4);
    imported.push({
      id: 'imp-' + Date.now().toString(36),
      title: $('#imp-title').value.trim() || `${white} vs ${black}`,
      white, black, event: clean(h.Event, 'Imported game'), year: /^\d{4}$/.test(year) ? year : '', era: 'Custom',
      result: clean(h.Result, '*'), level: 'Custom', opening: clean(h.Opening, ''), players: [white, black].filter((n) => n !== 'White' && n !== 'Black'),
      tags: ['Imported'], intro: 'Your imported game. Step through the moves, or switch to Guess the move to test yourself.', lesson: '', story: [], pgn: text, comments: {}, imported: true
    });
    LS.set('gunmetal.imported', imported);
    rebuildGames(); closeModal(); renderLibrary();
    location.hash = '#game/' + imported.at(-1).id;
  };
};

/* ================= GAME VIEWER ================= */
const V = { game: null, moves: [], fens: [], comments: new Map(), idx: 0, mode: 'watch', side: 'w', timer: null, tries: 0, firstTry: 0, hinted: false, guessable: 0, busy: false };

const boardView = new Board($('#board-view'), {
  canPick: (sq, p) => V.mode === 'guess' && !V.busy && V.moves[V.idx] && V.moves[V.idx].color === V.side && p.color === V.side,
  targetsFor: (sq) => new Chess(V.fens[V.idx]).moves({ square: sq, verbose: true }).map((m) => m.to),
  onUserMove: (from, to) => guessMove(from, to)
});

const fxView = new Effects(boardView);

function openViewer(id) {
  const g = GAMES.find((x) => x.id === id);
  if (!g) { location.hash = '#library'; return; }
  show('viewer');
  V.game = g;
  const c = new Chess(); c.loadPgn(g.pgn);
  V.moves = c.history({ verbose: true });
  V.fens = [V.moves.length ? V.moves[0].before : new Chess().fen(), ...V.moves.map((m) => m.after)];
  V.comments = new Map();
  const norm = new Map(Object.entries(g.comments).map(([k, v]) => [strip(k), v]));
  V.moves.forEach((m, i) => {
    const key = (m.color === 'w' ? `${i / 2 + 1}.` : `${Math.floor(i / 2) + 1}...`) + strip(m.san);
    if (norm.has(key)) V.comments.set(i, norm.get(key));
  });
  V.idx = 0; V.mode = 'watch'; V.side = 'w'; V.tries = 0; V.firstTry = 0; V.busy = false;
  boardView.flipped = false; boardView.build();
  $('#v-title').textContent = g.title;
  $('#v-meta').innerHTML = `<b>${g.white}</b> vs <b>${g.black}</b><br>${g.event}${g.year ? ', ' + g.year : ''} &middot; Result ${g.result} &middot; ${g.level}` +
    `<br>${[g.opening, g.moveCount + ' moves'].filter(Boolean).join(' &middot; ')}`;
  const hasStory = g.story && g.story.length;
  $('#v-story').hidden = !hasStory;
  $('#v-story').open = false;
  $('#v-story-body').innerHTML = hasStory ? g.story.map((p) => `<p>${p}</p>`).join('') : '';
  $('#v-remove').hidden = !g.imported;
  paintFav();
  setMode('watch');
}

function moveLabel(i) {
  const m = V.moves[i];
  return (m.color === 'w' ? `${i / 2 + 1}. ` : `${Math.floor(i / 2) + 1}... `) + m.san;
}

function renderViewer(extraHtml = '', fxMove = null) {
  const last = V.idx > 0 ? { from: V.moves[V.idx - 1].from, to: V.moves[V.idx - 1].to } : null;
  fxView.reset();
  const pos = new Chess(V.fens[V.idx]);
  boardView.render(pos, { last });
  if (fxMove) fxView.play(fxMove, pos, { sub: fxMove.color === 'w' ? 'White wins' : 'Black wins' });
  boardView.setHint(null);
  renderMoves($('#v-moves'), V.moves.map((m) => m.san), V.idx - 1, new Set(V.comments.keys()), V.mode === 'watch');
  let html;
  if (V.idx === 0) html = `<div class="mv">Introduction</div>${V.game.intro}`;
  else {
    const i = V.idx - 1;
    html = `<div class="mv">${moveLabel(i)}</div>${V.comments.get(i) || '<span style="color:var(--muted)">A natural move that continues the plan.</span>'}`;
    if (V.idx === V.moves.length) {
      html += `<hr style="border:0;border-top:1px solid var(--line);margin:10px 0"><b>Result ${V.game.result}.</b> ${V.game.lesson || ''}`;
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
  $('#v-play').innerHTML = '&#10074;&#10074; Pause';
  V.timer = setInterval(() => {
    if (V.idx >= V.moves.length) { stopAutoplay(); return; }
    goTo(V.idx + 1);
  }, 1800);
};
function stopAutoplay() {
  if (V.timer) { clearInterval(V.timer); V.timer = null; }
  const b = $('#v-play'); if (b) b.innerHTML = '&#9654; Play';
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
  $('#g-side').textContent = 'Playing: ' + (V.side === 'w' ? 'White' : 'Black');
  renderViewer(`<div class="mv" style="color:var(--text)">Guess the move</div>You play ${V.side === 'w' ? 'White' : 'Black'}. Find the master's move each turn.<hr style="border:0;border-top:1px solid var(--line);margin:10px 0">`);
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
    const msg = `<div class="mv">Game complete</div>You found <b>${V.firstTry}</b> of <b>${V.guessable}</b> moves on the first try.<hr style="border:0;border-top:1px solid var(--line);margin:10px 0">${V.game.lesson || ''}`;
    $('#v-coach').innerHTML = msg;
  }
}

function coachFeedback(html) { $('#v-coach').insertAdjacentHTML('afterbegin', html); }

async function guessMove(from, to) {
  const m = V.moves[V.idx];
  if (!m) return;
  V.tries++;
  if (m.from === from && m.to === to) {
    if (!V.hinted && V.tries === 1) V.firstTry++;
    V.tries = 0; V.hinted = false;
    V.idx++;
    renderViewer(`<div class="ok"><b>Correct!</b></div>`, V.moves[V.idx - 1]);
    guessAdvance();
  } else {
    boardView.render(new Chess(V.fens[V.idx]), { last: V.idx > 0 ? { from: V.moves[V.idx - 1].from, to: V.moves[V.idx - 1].to } : null });
    $('#board-view').classList.remove('shake'); void $('#board-view').offsetWidth; $('#board-view').classList.add('shake');
    renderViewerKeep(`<div class="no"><b>Not the master's move.</b> Try again, or use Hint.</div>`);
  }
}
function renderViewerKeep(extra) {
  const i = V.idx - 1;
  const base = V.idx === 0 ? `<div class="mv">Guess the move</div>` : `<div class="mv">${moveLabel(i)}</div>${V.comments.get(i) || ''}`;
  $('#v-coach').innerHTML = extra + base;
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
  coachFeedback(`<div class="no"><b>The master played ${m.san}.</b> Play it on the board to continue.</div>`);
};

/* ---- viewer extras: favorite, next game, remove ---- */
function paintFav() {
  const on = V.game && favs.has(V.game.id);
  $('#v-fav').innerHTML = on ? '&#9733;' : '&#9734;';
  $('#v-fav').classList.toggle('on', !!on);
  $('#v-fav').title = on ? 'Remove from favorites' : 'Add to favorites';
}
$('#v-fav').onclick = () => { toggleFav(V.game.id); paintFav(); };
$('#v-nextgame').onclick = () => {
  const i = GAMES.findIndex((g) => g.id === V.game.id);
  location.hash = '#game/' + GAMES[(i + 1) % GAMES.length].id;
};
$('#v-remove').onclick = () => {
  openModal(`<h2>Remove this game?</h2><p class="sub">It will be deleted from this browser.</p>
    <div class="modal-actions"><button class="btn" id="rm-no">Cancel</button><button class="btn danger" id="rm-yes">Remove</button></div>`);
  $('#rm-no').onclick = closeModal;
  $('#rm-yes').onclick = () => {
    imported = imported.filter((g) => g.id !== V.game.id);
    LS.set('gunmetal.imported', imported); favs.delete(V.game.id); saveFavs(); rebuildGames(); closeModal();
    location.hash = '#library';
  };
};

/* ================= sound toggle ================= */
const sndBtn = $('#snd');
const paintSnd = () => { sndBtn.textContent = isSoundOn() ? 'Sound: On' : 'Sound: Off'; };
sndBtn.onclick = () => { setSoundOn(!isSoundOn()); paintSnd(); };
paintSnd();

/* ================= boot ================= */
$('#pieces-strip').innerHTML = ['wk', 'wq', 'wr', 'wb', 'wn', 'wp', 'bp', 'bn', 'bb', 'br', 'bq', 'bk'].map((k) => `<img src="img/${k}.png" alt="">`).join('');
route();
