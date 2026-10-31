// "Learn" page: how each piece moves, special rules, and puzzles taken from the famous games.
import { Chess } from '../lib/chess.js';
import { Board } from './board.js';
import { Effects } from './effects.js';
import { GAMES as BASE_GAMES } from './games.js';
import { t, locGame } from './i18n.js';
import { $, sleep } from './ui.js';
import { trackEvent } from './analytics.js';

/* ---------------- piece demos ---------------- */
const DEMO = {
  k: ['8/8/8/8/3K4/8/8/7k w - - 0 1', 'd4'],
  q: ['8/8/8/8/3Q4/8/8/4K2k w - - 0 1', 'd4'],
  r: ['8/8/8/8/3R4/8/8/4K2k w - - 0 1', 'd4'],
  b: ['8/8/8/8/3B4/8/8/4K2k w - - 0 1', 'd4'],
  n: ['8/8/8/8/3N4/8/8/4K2k w - - 0 1', 'd4'],
  p: ['8/8/8/8/8/3p4/4P3/K6k w - - 0 1', 'e2']
};
const VALUE = { q: 9, r: 5, b: 3, n: 3, p: 1 };
let pieceSel = 'q';
let tab = 'pieces';

const boardLearn = new Board($('#board-learn'), { canPick: () => false, targetsFor: () => [], onUserMove: () => {} });

function renderPieces() {
  $('#ln-pick').innerHTML = ['k', 'q', 'r', 'b', 'n', 'p'].map((p) =>
    `<button class="pick ${p === pieceSel ? 'on' : ''} " data-p="${p}" title="${t('piece.' + p)}"><img src="img/w${p}.png" alt="${t('piece.' + p)}"><span>${t('piece.' + p)}</span></button>`).join('');
  const [fen, sq] = DEMO[pieceSel];
  const c = new Chess(fen);
  boardLearn.render(c);
  boardLearn.sel = sq;
  boardLearn.targets = c.moves({ square: sq, verbose: true }).map((m) => m.to);
  boardLearn.redraw();
  $('#ln-info').innerHTML = `<div class="info-head"><img src="img/w${pieceSel}.png" alt=""><img src="img/b${pieceSel}.png" alt="">
    <div><h3>${t('piece.' + pieceSel)}</h3><div class="gunname">${t('gun.' + pieceSel)}</div></div></div>
    <p>${t('how.' + pieceSel)}</p>
    <p class="val">${pieceSel === 'k' ? t('ln.valueK') : t('ln.value', { n: VALUE[pieceSel] })}</p>`;
}
$('#ln-pick').onclick = (e) => { const b = e.target.closest('[data-p]'); if (b) { pieceSel = b.dataset.p; renderPieces(); } };

/* ---------------- rules ---------------- */
function renderRules() {
  $('#ln-rules').innerHTML = `<div class="rule-grid">${['castle', 'ep', 'promo', 'check', 'stale'].map((k) =>
    `<div class="rule"><h3>${t('rule.' + k + '.t')}</h3><p>${t('rule.' + k + '.d')}</p></div>`).join('')}</div>`;
}

/* ---------------- puzzles ---------------- */
// [game id, ply after which the puzzle starts]. The solution is the rest of the game; every one ends in checkmate.
const DEFS = [
  ['fools-mate', 3], ['scholars-mate', 6], ['legal-mate', 8], ['gibaud-lazard-1924', 7], ['tartakower-reti-1910', 16],
  ['opera-game', 30], ['immortal-game', 42], ['game-of-the-century', 79], ['lasker-thomas-1912', 30], ['evergreen-game', 40]
];
const solved = new Set((() => { try { return JSON.parse(localStorage.getItem('gunmetal.puzzles') || '[]'); } catch (e) { return []; } })());
const saveSolved = () => { try { localStorage.setItem('gunmetal.puzzles', JSON.stringify([...solved])); } catch (e) { /* ignore */ } };

const PUZZLES = DEFS.map(([gid, ply]) => {
  const g = BASE_GAMES.find((x) => x.id === gid);
  const c = new Chess(); c.loadPgn(g.pgn);
  const h = c.history({ verbose: true });
  const sol = h.slice(ply);
  return { key: `${gid}:${ply}`, gid, ply, start: ply ? h[ply - 1].after : new Chess().fen(), sol, side: sol[0].color, mateIn: Math.ceil(sol.length / 2) };
}).sort((a, b) => a.mateIn - b.mateIn);

const PZ = { cur: null, chess: null, k: 0, busy: false };

const boardPz = new Board($('#board-puzzle'), {
  canPick: (sq, p) => PZ.cur && !PZ.busy && PZ.k < PZ.cur.sol.length && p.color === PZ.cur.side && PZ.cur.sol[PZ.k].color === PZ.cur.side,
  targetsFor: (sq) => PZ.chess.moves({ square: sq, verbose: true }).map((m) => m.to),
  onUserMove: (from, to) => pzMove(from, to)
});
const fxPz = new Effects(boardPz);

const mateLabel = (n) => (n === 1 ? t('pz.mate1') : t('pz.mateN', { n }));

function renderPuzzleList() {
  const done = PUZZLES.filter((p) => solved.has(p.key)).length;
  $('#pz-progress').textContent = t('pz.progress', { a: done, b: PUZZLES.length });
  $('#pz-list').innerHTML = PUZZLES.map((p) => {
    const g = locGame(BASE_GAMES.find((x) => x.id === p.gid));
    return `<button class="pz-card ${solved.has(p.key) ? 'done' : ''}" data-k="${p.key}">
      <span class="badge ${p.mateIn === 1 ? 'Beginner' : p.mateIn <= 3 ? 'Intermediate' : 'Advanced'}">${mateLabel(p.mateIn)}</span>
      <b>${p.side === 'w' ? t('pz.white') : t('pz.black')}</b>
      <span class="pz-from">${t('pz.from', { game: g.title })}</span>${solved.has(p.key) ? '<i>&#10003;</i>' : ''}</button>`;
  }).join('');
}
$('#pz-list').onclick = (e) => { const b = e.target.closest('[data-k]'); if (b) startPuzzle(PUZZLES.find((p) => p.key === b.dataset.k)); };

function startPuzzle(p) {
  PZ.cur = p; PZ.chess = new Chess(p.start); PZ.k = 0; PZ.busy = false;
  $('#pz-list-wrap').hidden = true; $('#pz-play').hidden = false;
  boardPz.flipped = p.side === 'b'; boardPz.build();
  fxPz.reset(); boardPz.render(PZ.chess);
  const g = locGame(BASE_GAMES.find((x) => x.id === p.gid));
  $('#pz-title').textContent = `${mateLabel(p.mateIn)} · ${p.side === 'w' ? t('pz.white') : t('pz.black')}`;
  $('#pz-from').textContent = t('pz.from', { game: g.title });
  pzSay(t('pz.prompt'));
  $('#pz-next').hidden = true;
  trackEvent('puzzle-start', 'Puzzle started');
}
function pzSay(html, cls = '') { const el = $('#pz-msg'); el.className = 'coach ' + cls; el.innerHTML = html; }

async function pzMove(from, to) {
  const m = PZ.cur.sol[PZ.k];
  if (!m) return;
  if (m.from !== from || m.to !== to) {
    boardPz.render(PZ.chess, lastOf());
    const bx = $('#board-puzzle'); bx.classList.remove('shake'); void bx.offsetWidth; bx.classList.add('shake');
    pzSay(t('pz.wrong'), 'no');
    return;
  }
  play(m);
  if (PZ.k >= PZ.cur.sol.length) { finish(); return; }
  pzSay(t('pz.correct'), 'ok');
  PZ.busy = true;
  await sleep(750);
  play(PZ.cur.sol[PZ.k]);
  PZ.busy = false;
  if (PZ.k >= PZ.cur.sol.length) finish();
}
function lastOf() { const h = PZ.chess.history({ verbose: true }); return h.length ? { last: { from: h.at(-1).from, to: h.at(-1).to } } : {}; }
function play(m) {
  const mv = PZ.chess.move({ from: m.from, to: m.to, promotion: m.promotion });
  PZ.k++;
  fxPz.reset();
  boardPz.render(PZ.chess, { last: { from: mv.from, to: mv.to } });
  fxPz.play(mv, PZ.chess, { sub: t('pz.solved') });
}
function finish() {
  solved.add(PZ.cur.key); saveSolved();
  pzSay(`<div class="mv">${t('pz.solved')}</div>${t('pz.solvedMsg')}`, 'ok');
  $('#pz-next').hidden = false;
  trackEvent('puzzle-solved', 'Puzzle solved');
}
$('#pz-hint').onclick = () => { const m = PZ.cur && PZ.cur.sol[PZ.k]; if (m && !PZ.busy && m.color === PZ.cur.side) boardPz.setHint(m.from, null); };
$('#pz-show').onclick = () => {
  const m = PZ.cur && PZ.cur.sol[PZ.k];
  if (!m || PZ.busy || m.color !== PZ.cur.side) return;
  boardPz.setHint(m.from, m.to);
  pzSay(t('pz.reveal', { m: m.san }), 'no');
};
$('#pz-restart').onclick = () => startPuzzle(PZ.cur);
$('#pz-next').onclick = () => {
  const i = PUZZLES.findIndex((p) => p.key === PZ.cur.key);
  startPuzzle(PUZZLES[(i + 1) % PUZZLES.length]);
};
$('#pz-back').onclick = () => { PZ.cur = null; $('#pz-play').hidden = true; $('#pz-list-wrap').hidden = false; renderPuzzleList(); };

/* ---------------- tabs / public API ---------------- */
function showTab(name) {
  tab = name;
  ['pieces', 'rules', 'puzzles'].forEach((k) => {
    $('#ln-' + k).hidden = k !== name;
    $('#ln-t-' + k).classList.toggle('on', k === name);
  });
  if (name === 'pieces') renderPieces();
  if (name === 'rules') renderRules();
  if (name === 'puzzles') { if (PZ.cur) { $('#pz-list-wrap').hidden = true; $('#pz-play').hidden = false; } else renderPuzzleList(); }
}
['pieces', 'rules', 'puzzles'].forEach((k) => { $('#ln-t-' + k).onclick = () => showTab(k); });

export function enterLearn() { showTab(tab); }
export function refreshLearn() {
  showTab(tab);
  if (tab === 'puzzles' && PZ.cur) {
    const g = locGame(BASE_GAMES.find((x) => x.id === PZ.cur.gid));
    $('#pz-title').textContent = `${mateLabel(PZ.cur.mateIn)} · ${PZ.cur.side === 'w' ? t('pz.white') : t('pz.black')}`;
    $('#pz-from').textContent = t('pz.from', { game: g.title });
  }
}
