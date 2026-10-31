// Player profile, points and rankings.
// Rankings are always kept on this device. When a Supabase project is configured (config.js) the player's
// name is RESERVED worldwide (unique, protected by a secret recovery code) and results are reported
// to a shared table so a worldwide ranking can be shown.
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
export const cleanName = (s) => String(s || '').replace(/[^\p{L}\p{N} ._-]/gu, '').replace(/\s+/g, ' ').trim().slice(0, 20);
const nameKey = (s) => cleanName(s).toLowerCase();

/** Secret recovery code, e.g. K7M2-9QPX-4TWD-8HCB (no look-alike characters). */
function makeToken() {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const chars = [...bytes].map((b) => alphabet[b % alphabet.length]);
  return [0, 4, 8, 12].map((i) => chars.slice(i, i + 4).join('')).join('-');
}

const url = () => (CONFIG.supabaseUrl || '').trim().replace(/\/$/, '');
export const globalOn = !!(url() && (CONFIG.supabaseKey || '').trim());

async function rpc(fn, body) {
  const r = await fetch(`${url()}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { apikey: CONFIG.supabaseKey, Authorization: 'Bearer ' + CONFIG.supabaseKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error('rpc ' + fn + ' ' + r.status);
  return r.json();
}

/* ---------------- profile ---------------- */
export function getPlayer() { return read(PKEY, null); }
export function allLocalPlayers() { return Object.values(read(SKEY, {})); }
/** The secret recovery code of the current player (only exists when names are reserved worldwide). */
export function getRecoveryCode() { const p = getPlayer(); return p && p.claimed ? p.token : null; }

function saveProfile(p) {
  const stats = read(SKEY, {});
  stats[p.id] = { ...(stats[p.id] || { points: 0, w: 0, d: 0, l: 0, cpu: 0, online: 0, last: 0 }), id: p.id, name: p.name, token: p.token, claimed: !!p.claimed };
  write(SKEY, stats);
  write(PKEY, { id: p.id, name: p.name, token: p.token, claimed: !!p.claimed });
}

/** Is the name free worldwide? Returns true/false, or null when it cannot be checked. */
export async function checkName(name) {
  name = cleanName(name);
  if (name.length < 2) return false;
  if (!globalOn) return true;
  try { return !!(await rpc('name_available', { p_name: name })); } catch (e) { return null; }
}

/**
 * Start playing as `name` (creating the profile or switching to a profile already on this device).
 * Returns { ok: true } or { ok: false, reason: 'short' | 'taken' | 'invalid' | 'network' }.
 */
export async function registerName(name) {
  name = cleanName(name);
  if (name.length < 2) return { ok: false, reason: 'short' };
  const stats = read(SKEY, {});
  const existing = Object.values(stats).find((s) => nameKey(s.name) === nameKey(name));
  let p = existing ? { id: existing.id, name: existing.name, token: existing.token || makeToken(), claimed: !!existing.claimed } : { id: uuid(), name, token: makeToken(), claimed: false };
  if (globalOn && !p.claimed) {
    let res;
    try { res = await rpc('claim_name', { p_id: p.id, p_name: p.name, p_token: p.token }); } catch (e) { return { ok: false, reason: 'network' }; }
    if (res === 'taken') return { ok: false, reason: 'taken' };
    if (res !== 'ok' && res !== 'exists') return { ok: false, reason: 'invalid' };
    p.claimed = true;
  }
  saveProfile(p);
  return { ok: true, newlyClaimed: globalOn && !existing };
}

/** Use a ranking name from another device with its recovery code. */
export async function restoreAccount(name, code) {
  if (!globalOn) return { ok: false, reason: 'off' };
  name = cleanName(name); code = String(code || '').trim().toUpperCase();
  try {
    const id = await rpc('restore_player', { p_name: name, p_token: code });
    if (!id) return { ok: false, reason: 'wrong' };
    // use the name exactly as it was reserved (capital letters, spacing)
    try {
      const r = await fetch(`${url()}/rest/v1/public_ranking?select=id,name&id=eq.${id}`, { headers: { apikey: CONFIG.supabaseKey, Authorization: 'Bearer ' + CONFIG.supabaseKey } });
      const row = r.ok ? (await r.json()).find((x) => x.id === id) : null;
      if (row) name = row.name;
    } catch (e) { /* keep the typed name */ }
    saveProfile({ id, name, token: code, claimed: true });
    return { ok: true };
  } catch (e) { return { ok: false, reason: 'network' }; }
}

/* ---------------- points ---------------- */
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
  if (globalOn && me.claimed) {
    rpc('report_result', { p_id: me.id, p_token: me.token, p_result: result, p_mode: mode === 'online' ? 'online' : 'cpu', p_points: pts }).catch(() => { /* offline: the local ranking still counts it */ });
  }
  return pts;
}

/* ---------------- rankings ---------------- */
const sortBoard = (a, b) => b.points - a.points || b.w - a.w || (a.w + a.d + a.l) - (b.w + b.d + b.l) || a.name.localeCompare(b.name);
export function localBoard() { return allLocalPlayers().filter((p) => p.cpu + p.online > 0).sort(sortBoard); }

export async function globalBoard(limit = 50) {
  if (!globalOn) return [];
  const u = `${url()}/rest/v1/public_ranking?select=id,name,points,wins,draws,losses,cpu_games,online_games&order=points.desc,wins.desc&limit=${limit}`;
  const r = await fetch(u, { headers: { apikey: CONFIG.supabaseKey, Authorization: 'Bearer ' + CONFIG.supabaseKey } });
  if (!r.ok) throw new Error('ranking ' + r.status);
  return (await r.json()).map((x) => ({ id: x.id, name: x.name, points: x.points, w: x.wins, d: x.draws, l: x.losses, cpu: x.cpu_games, online: x.online_games }));
}
