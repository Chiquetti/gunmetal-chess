// Player profile, points and rankings.
// Rankings are kept on this device. If a Supabase project is configured (config.js), results are also
// reported to a shared table so a worldwide ranking can be shown.
import { CONFIG } from './config.js';

const PKEY = 'gunmetal.player';
const SKEY = 'gunmetal.stats';

/** Points per result: [win, draw]. A loss is always 0. */
export const POINTS = {
  cpu: { easy: [10, 5], medium: [25, 12], hard: [50, 25] },
  online: [40, 20]
};

const read = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v === null || v === undefined ? d : v; } catch (e) { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } };
const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); }));
export const cleanName = (s) => String(s || '').replace(/[\u0000-\u001f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 20);

export const globalOn = !!((CONFIG.supabaseUrl || '').trim() && (CONFIG.supabaseKey || '').trim());

export function getPlayer() { return read(PKEY, null); }
export function allLocalPlayers() { return Object.values(read(SKEY, {})); }

/** Switch to (or create) the local profile with this name. */
export function setPlayerByName(name) {
  name = cleanName(name);
  const stats = read(SKEY, {});
  let p = Object.values(stats).find((s) => s.name.toLowerCase() === name.toLowerCase());
  if (!p) {
    p = { id: uuid(), name, points: 0, w: 0, d: 0, l: 0, cpu: 0, online: 0, last: 0 };
    stats[p.id] = p;
    write(SKEY, stats);
  }
  write(PKEY, { id: p.id, name: p.name });
  if (globalOn) globalCall('report_result', { p_id: p.id, p_name: p.name, p_result: 'name', p_mode: 'name', p_points: 0 });
  return { id: p.id, name: p.name };
}

export function pointsFor(mode, level, result) {
  if (result === 'loss') return 0;
  const pair = mode === 'online' ? POINTS.online : (POINTS.cpu[level] || POINTS.cpu.medium);
  return result === 'win' ? pair[0] : pair[1];
}

/** Records a finished game for the current player. Returns the points earned. */
export function recordResult({ mode, level, result }) {
  const me = getPlayer();
  if (!me) return 0;
  const pts = pointsFor(mode, level, result);
  const stats = read(SKEY, {});
  const p = stats[me.id] || { id: me.id, name: me.name, points: 0, w: 0, d: 0, l: 0, cpu: 0, online: 0, last: 0 };
  p.points += pts;
  if (result === 'win') p.w++; else if (result === 'draw') p.d++; else p.l++;
  if (mode === 'online') p.online++; else p.cpu++;
  p.last = Date.now();
  stats[me.id] = p;
  write(SKEY, stats);
  if (globalOn) globalCall('report_result', { p_id: me.id, p_name: me.name, p_result: result, p_mode: mode === 'online' ? 'online' : 'cpu', p_points: pts });
  return pts;
}

const sortBoard = (a, b) => b.points - a.points || b.w - a.w || (a.w + a.d + a.l) - (b.w + b.d + b.l) || a.name.localeCompare(b.name);
export function localBoard() { return allLocalPlayers().filter((p) => p.cpu + p.online > 0).sort(sortBoard); }

/* ---------------- worldwide ranking (Supabase REST) ---------------- */
async function globalCall(fn, body) {
  try {
    await fetch(`${CONFIG.supabaseUrl.replace(/\/$/, '')}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: { apikey: CONFIG.supabaseKey, Authorization: 'Bearer ' + CONFIG.supabaseKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  } catch (e) { /* offline: local ranking still works */ }
}
export async function globalBoard(limit = 50) {
  if (!globalOn) return [];
  const url = `${CONFIG.supabaseUrl.replace(/\/$/, '')}/rest/v1/players?select=id,name,points,wins,draws,losses,cpu_games,online_games&order=points.desc,wins.desc&limit=${limit}`;
  const r = await fetch(url, { headers: { apikey: CONFIG.supabaseKey, Authorization: 'Bearer ' + CONFIG.supabaseKey } });
  if (!r.ok) throw new Error('ranking ' + r.status);
  return (await r.json()).map((x) => ({ id: x.id, name: x.name, points: x.points, w: x.wins, d: x.draws, l: x.losses, cpu: x.cpu_games, online: x.online_games }));
}
