// Thin wrapper around the Stockfish WebAssembly worker (UCI protocol).
export const LEVELS = {
  easy:   { label: 'Easy',   skill: 0,  movetime: 150,  blurb: 'A friendly opponent that makes plenty of mistakes.' },
  medium: { label: 'Medium', skill: 9,  movetime: 400,  blurb: 'Solid club player. Punishes obvious errors.' },
  hard:   { label: 'Hard',   skill: 17, movetime: 1200, blurb: 'Strong and tactical. Expect no gifts.' }
};

export class Engine {
  constructor() {
    this.listeners = new Set();
    this.failed = false;
    try {
      this.worker = new Worker('lib/stockfish-19-lite-single.js');
      this.worker.onmessage = (e) => this.listeners.forEach((f) => f(String(e.data)));
      this.worker.onerror = () => { this.failed = true; };
      this.ready = this.send('uci', 'uciok').then(() => this.send('isready', 'readyok'));
    } catch (err) {
      this.failed = true;
      this.ready = Promise.reject(err);
    }
  }

  send(cmd, until) {
    return new Promise((resolve) => {
      if (until) {
        const f = (line) => { if (line.startsWith(until)) { this.listeners.delete(f); resolve(line); } };
        this.listeners.add(f);
      } else resolve();
      this.worker.postMessage(cmd);
    });
  }

  /** Returns a UCI move such as "e2e4" or "e7e8q". */
  async bestMove(fen, { skill = 10, movetime = 400 } = {}) {
    await this.ready;
    this.worker.postMessage(`setoption name Skill Level value ${skill}`);
    this.worker.postMessage(`position fen ${fen}`);
    const line = await this.send(`go movetime ${movetime}`, 'bestmove');
    const mv = line.split(' ')[1];
    return mv && mv !== '(none)' ? mv : null;
  }

  stop() { try { this.worker.postMessage('stop'); } catch (e) { /* ignore */ } }
}
