import { t } from './i18n.js';
// Visual and sound effects: captures (explosion), check (crosshair + alert), checkmate (finale).
const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- sound (synthesized, no audio files) ---------------- */
let sndOn = (() => { try { return localStorage.getItem('gunmetal.sound') !== 'off'; } catch (e) { return true; } })();
export const isSoundOn = () => sndOn;
export function setSoundOn(v) { sndOn = v; try { localStorage.setItem('gunmetal.sound', v ? 'on' : 'off'); } catch (e) { /* ignore */ } }

let ac = null, noiseBuf = null;
function audio() {
  if (!sndOn) return null;
  if (!ac) {
    try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
    noiseBuf = ac.createBuffer(1, ac.sampleRate, ac.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  if (ac.state === 'suspended') ac.resume();
  return ac;
}
function noiseBurst({ dur = 0.4, type = 'lowpass', f0 = 1500, f1 = 100, gain = 0.8, delay = 0 }) {
  const a = audio(); if (!a) return;
  const t = a.currentTime + delay;
  const src = a.createBufferSource(); src.buffer = noiseBuf; src.loop = true;
  const f = a.createBiquadFilter(); f.type = type;
  f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
  const g = a.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  src.connect(f); f.connect(g); g.connect(a.destination);
  src.start(t); src.stop(t + dur + 0.05);
}
function tone({ f0 = 100, f1 = 40, dur = 0.4, gain = 0.8, type = 'sine', delay = 0 }) {
  const a = audio(); if (!a) return;
  const t = a.currentTime + delay;
  const o = a.createOscillator(); o.type = type;
  o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
  const g = a.createGain(); g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + dur + 0.05);
}
const clack = (delay = 0) => {
  tone({ f0: 420, f1: 110, dur: 0.06, gain: 0.22, type: 'square', delay });
  noiseBurst({ dur: 0.05, type: 'bandpass', f0: 3200, f1: 2600, gain: 0.35, delay });
};
const sfx = {
  capture() {
    noiseBurst({ dur: 0.07, type: 'highpass', f0: 2500, f1: 2500, gain: 0.7 });
    noiseBurst({ dur: 0.55, f0: 1800, f1: 90, gain: 0.9 });
    tone({ f0: 110, f1: 38, dur: 0.45, gain: 0.9 });
  },
  check() { clack(0); clack(0.12); tone({ f0: 660, f1: 640, dur: 0.5, gain: 0.07, type: 'sine', delay: 0.28 }); },
  mate() {
    noiseBurst({ dur: 0.08, type: 'highpass', f0: 2500, f1: 2500, gain: 0.8 });
    noiseBurst({ dur: 1.1, f0: 2200, f1: 60, gain: 1 });
    tone({ f0: 90, f1: 25, dur: 1.3, gain: 1 });
    noiseBurst({ dur: 1.8, f0: 300, f1: 40, gain: 0.5, delay: 0.1 });
    noiseBurst({ dur: 0.6, f0: 1800, f1: 80, gain: 0.7, delay: 0.25 });
    noiseBurst({ dur: 0.6, f0: 1800, f1: 80, gain: 0.7, delay: 0.48 });
    [523, 659, 784].forEach((f, i) => tone({ f0: f, f1: f * 0.99, dur: 1.6, gain: 0.07, delay: 0.7 + i * 0.12 }));
  }
};

/* ---------------- effects layer ---------------- */
export class Effects {
  constructor(board) {
    this.board = board;
    const root = board.root;
    const wrap = document.createElement('div');
    wrap.className = 'fx-wrap';
    root.parentNode.insertBefore(wrap, root);
    wrap.appendChild(root);
    this.wrap = wrap;
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'fx-canvas';
    wrap.appendChild(this.canvas);
    this.layer = document.createElement('div');
    this.layer.className = 'fx-layer';
    wrap.appendChild(this.layer);
    this.ctx = this.canvas.getContext('2d');
    this.parts = [];
    this.raf = null;
    this.last = 0;
  }

  /* --- helpers --- */
  size() {
    const r = this.wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.round(r.width * dpr);
    this.canvas.height = Math.round(r.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.sq = r.width / 8;
    this.W = r.width; this.H = r.height;
  }
  rect(sq) {
    const r = this.board.sqEls[sq].getBoundingClientRect();
    const w = this.wrap.getBoundingClientRect();
    return { x: r.left - w.left, y: r.top - w.top, w: r.width, h: r.height };
  }
  center(sq) { const r = this.rect(sq); return { x: r.x + r.w / 2, y: r.y + r.h * 0.55 }; }
  kingSquare(chess, color) {
    for (const row of chess.board()) for (const p of row) if (p && p.type === 'k' && p.color === color) return p.square;
    return null;
  }
  add(el, ms) { this.layer.appendChild(el); if (ms) setTimeout(() => el.remove(), ms); return el; }
  div(cls, html = '') { const d = document.createElement('div'); d.className = cls; d.innerHTML = html; return d; }
  shake(big) {
    if (reduce) return;
    const c = big ? 'fx-shake-lg' : 'fx-shake-sm';
    this.wrap.classList.remove('fx-shake-lg', 'fx-shake-sm'); void this.wrap.offsetWidth;
    this.wrap.classList.add(c);
    setTimeout(() => this.wrap.classList.remove(c), big ? 900 : 380);
  }
  flash(cls, ms) { this.add(this.div('fx-flash ' + cls), ms); }
  ghost(sq, color, type, cls, ms) {
    const r = this.rect(sq);
    const g = this.div('fx-ghost ' + cls);
    Object.assign(g.style, { left: r.x + 'px', top: r.y + 'px', width: r.w + 'px', height: r.h + 'px' });
    g.innerHTML = `<img class="piece t-${type}" src="img/${color}${type}.png" alt="">`;
    this.add(g, ms);
    return g;
  }

  /* --- particles --- */
  spawn(p) { this.parts.push({ age: 0, vx: 0, vy: 0, g: 0, drag: 0, rot: 0, vr: 0, ...p }); }
  explode(x, y, k = 1) {
    this.size();
    const s = this.sq / 80;
    const q = reduce ? 0.4 : 1;
    this.spawn({ type: 'dot', x, y, life: 0.16, size: this.sq * 1.5 * k });
    this.spawn({ type: 'ring', x, y, life: 0.5, r0: this.sq * 0.2, r1: this.sq * 1.7 * k, col: '255,170,70' });
    for (let i = 0; i < 16 * k * q; i++) {
      const a = Math.random() * 6.28, v = (40 + Math.random() * 200) * s * k;
      this.spawn({ type: 'fire', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 30 * s, drag: 2.2, life: 0.35 + Math.random() * 0.45, size: this.sq * (0.25 + Math.random() * 0.4) * k });
    }
    for (let i = 0; i < 24 * k * q; i++) {
      const a = Math.random() * 6.28, v = (150 + Math.random() * 420) * s * k;
      this.spawn({ type: 'spark', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: 650 * s, life: 0.3 + Math.random() * 0.6, size: 1.2 + Math.random() * 1.6 });
    }
    for (let i = 0; i < 8 * k * q; i++) {
      const a = Math.random() * 6.28, v = (20 + Math.random() * 60) * s;
      this.spawn({ type: 'smoke', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 25 * s, drag: 0.8, life: 0.9 + Math.random() * 0.8, size: this.sq * (0.3 + Math.random() * 0.3) * k });
    }
    for (let i = 0; i < 10 * k * q; i++) {
      const a = Math.random() * 6.28, v = (100 + Math.random() * 360) * s * k;
      this.spawn({ type: 'debris', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 120 * s, g: 900 * s, life: 0.9 + Math.random() * 0.7, size: this.sq * (0.06 + Math.random() * 0.09), rot: Math.random() * 6, vr: (Math.random() - 0.5) * 18, color: ['#c9ced6', '#6b4a2a', '#3a3f47', '#d9a93d'][i % 4] });
    }
    this.run();
  }
  casings(n = 70) {
    this.size();
    const q = reduce ? 0.3 : 1;
    for (let i = 0; i < n * q; i++) {
      this.spawn({ type: 'casing', x: Math.random() * this.W, y: -20 - Math.random() * this.H * 0.4, vx: (Math.random() - 0.5) * 80, vy: 80 + Math.random() * 160, g: 520, life: 2.6 + Math.random() * 1.2, size: this.sq * (0.09 + Math.random() * 0.06), rot: Math.random() * 6, vr: (Math.random() - 0.5) * 10, gold: Math.random() < 0.35 });
    }
    this.run();
  }
  run() { if (!this.raf) { this.last = performance.now(); this.raf = requestAnimationFrame((t) => this.loop(t)); } }
  loop(t) {
    const dt = this.freeze ? 0 : Math.min(0.033, (t - this.last) / 1000); this.last = t;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.W, this.H);
    this.parts = this.parts.filter((p) => (p.age += dt) < p.life);
    for (const p of this.parts) {
      if (p.drag) { const d = Math.max(0, 1 - p.drag * dt); p.vx *= d; p.vy *= d; }
      p.vy += p.g * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
      this.draw(ctx, p, 1 - p.age / p.life);
    }
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
    this.raf = this.parts.length ? requestAnimationFrame((tt) => this.loop(tt)) : null;
    if (!this.raf) ctx.clearRect(0, 0, this.W, this.H);
  }
  draw(ctx, p, k) {
    ctx.globalAlpha = 1;
    switch (p.type) {
      case 'fire': {
        ctx.globalCompositeOperation = 'source-over';
        const r = p.size * (0.6 + 0.6 * (1 - k));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, `rgba(255,${(235 * k + 20) | 0},${(120 * k) | 0},${Math.min(1, 1.2 * k)})`);
        g.addColorStop(0.45, `rgba(255,${(120 * k + 20) | 0},10,${0.85 * k})`);
        g.addColorStop(1, 'rgba(160,30,0,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7); ctx.fill(); break;
      }
      case 'smoke': {
        ctx.globalCompositeOperation = 'source-over';
        const r = p.size * (1 + 1.4 * (1 - k));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, `rgba(70,64,58,${0.38 * k})`); g.addColorStop(1, 'rgba(70,64,58,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7); ctx.fill(); break;
      }
      case 'spark':
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = `rgba(255,${(120 + 100 * k) | 0},20,${Math.min(1, k * 1.6)})`; ctx.lineWidth = p.size; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.vx * 0.04, p.y - p.vy * 0.04); ctx.stroke(); break;
      case 'debris':
        ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = Math.min(1, k * 3);
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66); ctx.restore(); break;
      case 'casing':
        ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = Math.min(1, k * 3);
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.gold ? '#f2d27a' : '#b8862b'; ctx.fillRect(-p.size * 0.22, -p.size / 2, p.size * 0.44, p.size);
        ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(-p.size * 0.12, -p.size / 2, p.size * 0.08, p.size);
        ctx.restore(); break;
      case 'ring': {
        ctx.globalCompositeOperation = 'source-over';
        const r = p.r0 + (p.r1 - p.r0) * (1 - k);
        ctx.strokeStyle = `rgba(${p.col},${k})`; ctx.lineWidth = 1 + 4 * k;
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7); ctx.stroke(); break;
      }
      case 'dot': {
        ctx.globalCompositeOperation = 'lighter';
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        g.addColorStop(0, `rgba(255,250,220,${k})`); g.addColorStop(0.4, `rgba(255,190,90,${0.7 * k})`); g.addColorStop(1, 'rgba(255,120,20,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, 7); ctx.fill(); break;
      }
      default: break;
    }
  }

  /* --- public API --- */
  reset() {
    this.layer.querySelectorAll('.fx-fallen').forEach((n) => n.remove());
  }

  /** m = chess.js verbose move, chess = position AFTER the move. */
  play(m, chess, { sub = '' } = {}) {
    const loser = m.color === 'w' ? 'b' : 'w';
    const mate = m.san.endsWith('#');
    const check = !mate && m.san.endsWith('+');
    let delay = 0;
    if (m.captured) {
      const capSq = m.flags.includes('e') ? m.to[0] + m.from[1] : m.to;
      this.capture(capSq, loser, m.captured);
      delay = 520;
    }
    if (mate) setTimeout(() => this.mate(loser, chess, sub), delay);
    else if (check) setTimeout(() => this.check(loser, chess), delay);
  }

  capture(sq, color, type) {
    const c = this.center(sq);
    this.ghost(sq, color, type, 'fx-blast', 650);
    this.explode(c.x, c.y, 1);
    this.shake(false);
    sfx.capture();
  }

  check(loserColor, chess) {
    const sq = this.kingSquare(chess, loserColor);
    if (!sq) return;
    this.size();
    const c = this.center(sq);
    this.spawn({ type: 'ring', x: c.x, y: c.y, life: 0.7, r0: this.sq * 0.3, r1: this.sq * 1.8, col: '255,70,50' });
    this.spawn({ type: 'ring', x: c.x, y: c.y, life: 0.9, r0: this.sq * 0.2, r1: this.sq * 2.6, col: '255,70,50' });
    this.run();
    this.flash('fx-vignette', 1000);
    this.add(this.div('fx-banner-wrap', `<div class="fx-banner check">${t('fx.check')}</div>`), 1300);
    sfx.check();
  }

  mate(loserColor, chess, sub) {
    const sq = this.kingSquare(chess, loserColor);
    if (!sq) return;
    this.size();
    const c = this.center(sq);
    // the losing king falls and stays down until the next redraw
    const real = this.board.sqEls[sq].querySelector('.piece');
    if (real) real.style.visibility = 'hidden';
    const fallen = this.ghost(sq, loserColor, 'k', 'fx-topple fx-fallen', 0);
    fallen.style.zIndex = 4;
    this.flash('fx-flash-white', 600);
    this.flash('fx-vignette fx-vignette-long', 3200);
    this.explode(c.x, c.y, 2.3);
    this.shake(true);
    sfx.mate();
    const cs = this.rect(sq);
    [[200, -0.9, -0.6], [380, 0.9, -0.4], [560, -0.4, 0.8]].forEach(([ms, dx, dy]) =>
      setTimeout(() => this.explode(c.x + dx * cs.w, c.y + dy * cs.h, 1.3), ms));
    setTimeout(() => {
      this.add(this.div('fx-banner-wrap long', `<div class="fx-banner mate">${t('fx.mate')}</div><div class="fx-sub">${sub}</div>`), 4200);
      this.casings(80);
    }, 520);
  }
}
