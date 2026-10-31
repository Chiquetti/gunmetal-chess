// Chess board renderer with click-to-move and drag-and-drop. No game logic lives here.
const FILES = 'abcdefgh';

export class Board {
  /**
   * opts.canPick(square, piece) -> bool
   * opts.targetsFor(square)     -> array of target squares
   * opts.onUserMove(from, to)
   */
  constructor(root, opts = {}) {
    this.root = root;
    this.opts = opts;
    this.flipped = false;
    this.sel = null;
    this.targets = [];
    this.hint = null;
    this.chess = null;
    this.last = null;
    this.drag = null;
    this.build();
    this.bind();
  }

  build() {
    const root = this.root;
    root.innerHTML = '';
    root.classList.add('board');
    this.sqEls = {};
    const ranks = this.flipped ? [1, 2, 3, 4, 5, 6, 7, 8] : [8, 7, 6, 5, 4, 3, 2, 1];
    const files = this.flipped ? [...FILES].reverse() : [...FILES];
    ranks.forEach((r, ri) => {
      files.forEach((f, fi) => {
        const sq = f + r;
        const el = document.createElement('div');
        el.className = 'sq ' + ((FILES.indexOf(f) + r) % 2 === 0 ? 'dark' : 'light');
        el.dataset.sq = sq;
        if (fi === 0) el.insertAdjacentHTML('beforeend', `<span class="coord rank">${r}</span>`);
        if (ri === 7) el.insertAdjacentHTML('beforeend', `<span class="coord file">${f}</span>`);
        root.appendChild(el);
        this.sqEls[sq] = el;
      });
    });
  }

  flip() { this.flipped = !this.flipped; this.build(); this.redraw(); }

  render(chess, { last = null } = {}) {
    this.chess = chess;
    this.last = last;
    this.sel = null;
    this.targets = [];
    this.redraw();
  }

  setHint(from, to) { this.hint = from ? { from, to } : null; this.redraw(); }
  clearSel() { this.sel = null; this.targets = []; this.redraw(); }

  kingInCheckSquare() {
    if (!this.chess || !this.chess.isCheck()) return null;
    const turn = this.chess.turn();
    for (const row of this.chess.board()) for (const p of row) if (p && p.type === 'k' && p.color === turn) return p.square;
    return null;
  }

  redraw() {
    if (!this.chess) return;
    const check = this.kingInCheckSquare();
    for (const [sq, el] of Object.entries(this.sqEls)) {
      el.classList.remove('last', 'check', 'sel', 'target', 'capture', 'hint');
      el.querySelectorAll('.piece').forEach((n) => n.remove());
      const p = this.chess.get(sq);
      if (p) {
        const img = document.createElement('img');
        img.className = 'piece t-' + p.type;
        img.src = `img/${p.color}${p.type}.png`;
        img.alt = `${p.color === 'w' ? 'White' : 'Black'} ${p.type}`;
        img.draggable = false;
        el.appendChild(img);
      }
      if (this.last && (sq === this.last.from || sq === this.last.to)) el.classList.add('last');
      if (sq === check) el.classList.add('check');
      if (sq === this.sel) el.classList.add('sel');
      if (this.targets.includes(sq)) el.classList.add('target', ...(p ? ['capture'] : []));
      if (this.hint && (sq === this.hint.from || sq === this.hint.to)) el.classList.add('hint');
    }
  }

  bind() {
    const root = this.root;
    root.addEventListener('pointerdown', (e) => {
      const sqEl = e.target.closest('.sq');
      if (!sqEl || !this.chess) return;
      const sq = sqEl.dataset.sq;
      if (this.sel && this.targets.includes(sq)) {
        const from = this.sel;
        this.clearSel();
        this.opts.onUserMove(from, sq);
        return;
      }
      const p = this.chess.get(sq);
      if (p && this.opts.canPick && this.opts.canPick(sq, p)) {
        this.sel = sq;
        this.targets = this.opts.targetsFor(sq);
        this.hint = null;
        this.redraw();
        this.drag = { from: sq, x: e.clientX, y: e.clientY, ghost: null };
        try { root.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      } else if (this.sel) {
        this.clearSel();
      }
    });

    root.addEventListener('pointermove', (e) => {
      const d = this.drag;
      if (!d) return;
      if (!d.ghost && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 6) {
        const src = this.sqEls[d.from].querySelector('.piece');
        if (!src) return;
        const ghost = src.cloneNode();
        const r = src.getBoundingClientRect();
        ghost.className = 'piece ghost t-' + (this.chess.get(d.from).type);
        ghost.style.width = r.width + 'px';
        ghost.style.height = r.height + 'px';
        document.body.appendChild(ghost);
        src.style.opacity = '.25';
        d.ghost = ghost;
      }
      if (d.ghost) {
        d.ghost.style.left = e.clientX - parseFloat(d.ghost.style.width) / 2 + 'px';
        d.ghost.style.top = e.clientY - parseFloat(d.ghost.style.height) * 0.6 + 'px';
      }
    });

    const finish = (e) => {
      const d = this.drag;
      if (!d) return;
      this.drag = null;
      if (!d.ghost) return;
      d.ghost.remove();
      const srcImg = this.sqEls[d.from].querySelector('.piece');
      if (srcImg) srcImg.style.opacity = '';
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const to = el && el.closest('.sq') ? el.closest('.sq').dataset.sq : null;
      if (to && to !== d.from && this.targets.includes(to)) {
        this.clearSel();
        this.opts.onUserMove(d.from, to);
      }
    };
    root.addEventListener('pointerup', finish);
    root.addEventListener('pointercancel', finish);
  }
}
