// Two-player online games. Peer-to-peer (WebRTC) through PeerJS: no game server is needed,
// a free public signaling server only introduces the two browsers to each other.
import { Chess } from '../lib/chess.js';
import { Board } from './board.js';
import { Effects } from './effects.js';
import { t } from './i18n.js';
import { $, esc, openModal, closeModal, askPromotion, capsHtml, capturedBy, lastMoveOf, renderMoves } from './ui.js';
import { trackEvent } from './analytics.js';
import { getPlayer, recordResult, cleanName } from './player.js';
import { ensureProfile } from './profile-ui.js';

const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const ICE = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:global.stun.twilio.com:3478' },
    { urls: ['turn:openrelay.metered.ca:80', 'turn:openrelay.metered.ca:443', 'turn:openrelay.metered.ca:443?transport=tcp'], username: 'openrelayproject', credential: 'openrelayproject' }
  ]
};
const PeerCtor = () => (window.peerjs && window.peerjs.Peer) || window.Peer;

const O = {
  peer: null, conn: null, role: null, my: 'w', chess: new Chess(), code: '',
  pick: 'w', started: false, over: false, ended: '', drawSent: false, rematchSent: false, panel: 'lobby',
  oppName: '', counted: false, pts: 0
};
const myName = () => (getPlayer() ? getPlayer().name : t('on.you'));
const oppName = () => O.oppName || t('on.opponent');

const boardOn = new Board($('#board-online'), {
  canPick: (sq, p) => O.started && !O.over && p.color === O.my && O.chess.turn() === O.my,
  targetsFor: (sq) => O.chess.moves({ square: sq, verbose: true }).map((m) => m.to),
  onUserMove: (from, to) => userMove(from, to)
});
const fxOn = new Effects(boardOn);

/* ---------- panels ---------- */
function showPanel(p) {
  O.panel = p;
  $('#on-lobby').hidden = p !== 'lobby';
  $('#on-wait').hidden = p !== 'wait';
  $('#on-game').hidden = p !== 'game';
}
function setMsg(text) { $('#on-msg').textContent = text || ''; }

function renderColorPick() {
  $('#on-color').innerHTML = [['w', t('color.w')], ['b', t('color.b')], ['r', t('color.r')]]
    .map(([k, n]) => `<button class="opt ${k === O.pick ? 'on' : ''}" data-cl="${k}"><b>${n}</b></button>`).join('');
}
$('#on-color').onclick = (e) => { const b = e.target.closest('[data-cl]'); if (b) { O.pick = b.dataset.cl; renderColorPick(); } };

/* ---------- connection ---------- */
const genCode = () => Array.from({ length: 6 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('');
const other = (c) => (c === 'w' ? 'b' : 'w');

function teardown() {
  try { if (O.conn) O.conn.close(); } catch (e) { /* ignore */ }
  try { if (O.peer) O.peer.destroy(); } catch (e) { /* ignore */ }
  O.conn = null; O.peer = null; O.started = false; O.over = false; O.role = null;
  O.drawSent = false; O.rematchSent = false; O.oppName = ''; O.counted = false; O.pts = 0;
}

function createGame() {
  teardown(); setMsg('');
  const Peer = PeerCtor();
  if (!Peer) { setMsg(t('on.failed')); return; }
  O.role = 'host';
  const open = (retries) => {
    O.code = genCode();
    const peer = new Peer('gcm-' + O.code, { config: ICE });
    O.peer = peer;
    peer.on('open', () => showWait());
    peer.on('connection', (conn) => { if (O.conn) { conn.close(); return; } setupConn(conn); });
    peer.on('error', (err) => {
      if (err.type === 'unavailable-id' && retries < 6) { try { peer.destroy(); } catch (e) { /* ignore */ } open(retries + 1); return; }
      teardown(); showPanel('lobby'); setMsg(t('on.failed'));
    });
  };
  open(0);
  trackEvent('online-create', 'Online game created');
}

function showWait() {
  const url = `${location.origin}${location.pathname}#join/${O.code}`;
  $('#on-link').value = url;
  $('#on-codeshow').textContent = O.code;
  showPanel('wait');
}

function joinGame(raw) {
  const code = String(raw || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (code.length !== 6) { setMsg(t('on.noGame')); return; }
  teardown(); setMsg(t('on.connecting'));
  const Peer = PeerCtor();
  if (!Peer) { setMsg(t('on.failed')); return; }
  O.role = 'guest'; O.code = code;
  const peer = new Peer(undefined, { config: ICE });
  O.peer = peer;
  let timer = setTimeout(() => { teardown(); showPanel('lobby'); setMsg(t('on.failed')); }, 20000);
  peer.on('open', () => {
    const conn = peer.connect('gcm-' + code, { reliable: true });
    setupConn(conn, () => clearTimeout(timer));
  });
  peer.on('error', (err) => {
    clearTimeout(timer);
    const msg = err.type === 'peer-unavailable' ? t('on.noGame') : t('on.failed');
    teardown(); showPanel('lobby'); setMsg(msg);
  });
  trackEvent('online-join', 'Online game joined');
}

function setupConn(conn, onOpen) {
  O.conn = conn;
  conn.on('open', () => {
    if (onOpen) onOpen();
    if (O.role === 'host') {
      const mine = O.pick === 'r' ? (Math.random() < 0.5 ? 'w' : 'b') : O.pick;
      O.my = mine;
      conn.send({ t: 'start', guestColor: other(mine), name: myName() });
      beginGame();
    }
  });
  conn.on('data', onData);
  conn.on('close', () => {
    if (O.started && !O.over) { O.over = true; O.ended = 'disc'; update(); }
    else if (!O.started && O.panel === 'wait') { /* friend never joined */ }
  });
  conn.on('error', () => { if (O.started && !O.over) { O.over = true; O.ended = 'disc'; update(); } });
}

function send(msg) { try { if (O.conn && O.conn.open) O.conn.send(msg); } catch (e) { /* ignore */ } }

function onData(msg) {
  if (!msg || typeof msg !== 'object') return;
  switch (msg.t) {
    case 'start':
      O.my = msg.guestColor === 'b' ? 'b' : 'w';
      O.oppName = cleanName(msg.name);
      send({ t: 'hello', name: myName() });
      beginGame();
      break;
    case 'hello': O.oppName = cleanName(msg.name); update(); break;
    case 'move': {
      if (!O.started || O.over || O.chess.turn() === O.my) return;
      let mv;
      try { mv = O.chess.move({ from: msg.from, to: msg.to, promotion: msg.promotion }); } catch (e) { return; }
      update(mv);
      break;
    }
    case 'resign': O.over = true; O.ended = 'resignedThem'; update(); break;
    case 'draw-offer': askBar(t('on.drawAsk', { name: oppName() }), 'draw'); break;
    case 'draw-accept': O.over = true; O.ended = 'draw'; O.drawSent = false; update(); break;
    case 'draw-decline': O.drawSent = false; flash(t('on.drawDeclined')); update(); break;
    case 'rematch-offer':
      if (O.rematchSent) { send({ t: 'rematch-accept' }); nextGame(); }
      else askBar(t('on.rematchAsk', { name: oppName() }), 'rematch');
      break;
    case 'rematch-accept': nextGame(); break;
    case 'chat': if (typeof msg.text === 'string') addChat('them', msg.text.slice(0, 200), oppName()); break;
    default: break;
  }
}

/* ---------- game flow ---------- */
function beginGame() {
  O.chess = new Chess();
  setMsg('');
  O.started = true; O.over = false; O.ended = ''; O.drawSent = false; O.rematchSent = false; O.counted = false; O.pts = 0;
  boardOn.flipped = O.my === 'b'; boardOn.build();
  $('#on-chatlog').innerHTML = '';
  addChat('sys', t('on.connected'));
  hideAsk();
  showPanel('game');
  update();
  trackEvent('online-start', 'Online game started');
}
function nextGame() {
  O.my = other(O.my);
  O.chess = new Chess();
  O.over = false; O.ended = ''; O.drawSent = false; O.rematchSent = false; O.counted = false; O.pts = 0;
  boardOn.flipped = O.my === 'b'; boardOn.build();
  hideAsk(); update();
}

async function userMove(from, to) {
  const c = O.chess;
  const cands = c.moves({ square: from, verbose: true }).filter((m) => m.to === to);
  if (!cands.length) return;
  let promotion;
  if (cands[0].promotion) { promotion = await askPromotion(O.my); if (!promotion) { boardOn.render(c, { last: lastMoveOf(c) }); return; } }
  let mv;
  try { mv = c.move({ from, to, promotion }); } catch (e) { return; }
  send({ t: 'move', from, to, promotion });
  update(mv);
}

function outcome() {
  const c = O.chess;
  if (O.ended === 'resignedMe') return 'loss';
  if (O.ended === 'resignedThem') return 'win';
  if (O.ended === 'draw') return 'draw';
  if (O.ended === 'disc') return null;
  if (c.isCheckmate()) return c.turn() === O.my ? 'loss' : 'win';
  if (c.isGameOver()) return 'draw';
  return null;
}

function resultText() {
  const c = O.chess;
  switch (O.ended) {
    case 'resignedMe': return t('on.resignedMe');
    case 'resignedThem': return t('on.resignedThem', { name: oppName() });
    case 'draw': return t('on.drawAgreed');
    case 'disc': return t('on.disconnected', { name: oppName() });
    default: break;
  }
  if (c.isCheckmate()) return c.turn() === O.my ? t('on.mateLose', { name: oppName() }) : t('on.mateWin');
  if (c.isStalemate()) return t('res.stalemate');
  if (c.isThreefoldRepetition()) return t('res.repetition');
  if (c.isInsufficientMaterial()) return t('res.insufficient');
  if (c.isDraw()) return t('res.fifty');
  return t('res.over');
}

function update(fxMove = null) {
  if (!O.started) return;
  const c = O.chess;
  fxOn.reset();
  boardOn.render(c, { last: lastMoveOf(c) });
  if (fxMove) fxOn.play(fxMove, c, { sub: fxMove.color === O.my ? t('fx.youwin') : t('fx.oppwins', { name: oppName() }) });
  const opp = other(O.my);
  $('#on-opp-bar').innerHTML = `<b>${esc(oppName())}</b> <span>${t('color.' + opp)}</span><span class="caps">${capsHtml(capturedBy(c, opp), O.my)}</span>`;
  $('#on-me-bar').innerHTML = `<b>${esc(myName())}</b> <span>${t('color.' + O.my)}</span><span class="caps">${capsHtml(capturedBy(c, O.my), opp)}</span>`;
  renderMoves($('#on-moves'), c.history(), -1, null, false);
  let msg, cls = '';
  if (c.isGameOver() && !O.over) { O.over = true; }
  if (O.over && !O.counted) {
    O.counted = true;
    const res = outcome();
    if (res) { O.pts = recordResult({ mode: 'online', result: res }); trackEvent('online-end-' + res, 'Online game ended'); }
  }
  if (O.over) { msg = resultText(); cls = 'over'; }
  else if (O.drawSent) msg = t('on.drawOffered');
  else if (c.turn() === O.my) msg = c.isCheck() ? t('on.check') + ' ' + t('on.yourTurn') : t('on.yourTurn');
  else msg = t('on.theirTurn', { name: oppName() });
  const st = $('#on-status'); st.className = 'status ' + cls; st.textContent = msg;
  if (O.over && O.pts) st.insertAdjacentHTML('beforeend', ` <span class="pts-earned">${t('rk.earned', { n: O.pts })}</span>`);
  $('#on-draw').disabled = O.over || O.drawSent;
  $('#on-resign').disabled = O.over;
  $('#on-rematch').hidden = !O.over || O.ended === 'disc';
  $('#on-rematch').disabled = O.rematchSent;
  $('#on-rematch').textContent = O.rematchSent ? t('on.rematchWait') : t('on.rematch');
}

/* ---------- small helpers: ask bar, chat, flash ---------- */
function askBar(text, kind) {
  const el = $('#on-ask');
  el.hidden = false;
  el.innerHTML = `<div>${esc(text)}</div><div class="btn-row"><button class="btn primary" data-a="yes">${t('on.accept')}</button><button class="btn" data-a="no">${t('on.decline')}</button></div>`;
  el.onclick = (e) => {
    const b = e.target.closest('[data-a]'); if (!b) return;
    const yes = b.dataset.a === 'yes';
    hideAsk();
    if (kind === 'draw') {
      send({ t: yes ? 'draw-accept' : 'draw-decline' });
      if (yes) { O.over = true; O.ended = 'draw'; update(); }
    } else if (kind === 'rematch') {
      if (yes) { send({ t: 'rematch-accept' }); nextGame(); }
    }
  };
}
function hideAsk() { const el = $('#on-ask'); el.hidden = true; el.innerHTML = ''; }
function flash(text) { addChat('sys', text); }

function addChat(who, text, name) {
  const log = $('#on-chatlog');
  const d = document.createElement('div');
  d.className = 'chat ' + who;
  d.textContent = name ? `${name}: ${text}` : text;
  log.appendChild(d);
  log.scrollTop = log.scrollHeight;
}
$('#on-chatform').onsubmit = (e) => {
  e.preventDefault();
  const inp = $('#on-chatin');
  const text = inp.value.trim();
  if (!text || !O.started) return;
  send({ t: 'chat', text });
  addChat('me', text);
  inp.value = '';
};

/* ---------- buttons ---------- */
$('#on-create').onclick = async () => { if (!(await ensureProfile())) return; createGame(); };
$('#on-join').onclick = async () => { if (!(await ensureProfile())) return; joinGame($('#on-code').value); };
$('#on-code').onkeydown = async (e) => { if (e.key === 'Enter') { if (!(await ensureProfile())) return; joinGame($('#on-code').value); } };
$('#on-cancel').onclick = () => { teardown(); showPanel('lobby'); setMsg(''); };
$('#on-copy').onclick = async () => {
  const url = $('#on-link').value;
  try { await navigator.clipboard.writeText(url); } catch (e) { $('#on-link').select(); document.execCommand('copy'); }
  $('#on-copy').textContent = t('on.copied');
  setTimeout(() => { $('#on-copy').textContent = t('on.copy'); }, 1800);
};
$('#on-flip').onclick = () => boardOn.flip();
$('#on-draw').onclick = () => { if (O.over || O.drawSent) return; O.drawSent = true; send({ t: 'draw-offer' }); update(); };
$('#on-resign').onclick = () => {
  openModal(`<h2>${t('on.resignTitle')}</h2><p class="sub">${t('on.resignSub')}</p>
    <div class="modal-actions"><button class="btn" id="no">${t('resign.keep')}</button><button class="btn danger" id="yes">${t('resign.confirm')}</button></div>`);
  $('#no').onclick = closeModal;
  $('#yes').onclick = () => { closeModal(); send({ t: 'resign' }); O.over = true; O.ended = 'resignedMe'; update(); };
};
$('#on-rematch').onclick = () => { if (O.rematchSent) return; O.rematchSent = true; send({ t: 'rematch-offer' }); update(); };
$('#on-leave').onclick = () => { teardown(); showPanel('lobby'); setMsg(''); location.hash = '#online'; };

/* ---------- public API ---------- */
export function enterOnline(joinCode) {
  renderColorPick();
  if (joinCode) {
    $('#on-code').value = joinCode.toUpperCase();
    if (!O.started && O.panel !== 'wait') ensureProfile().then((p) => { if (p) joinGame(joinCode); });
    return;
  }
  showPanel(O.panel);
}
export function refreshOnline() {
  renderColorPick();
  if (O.started) update();
}
