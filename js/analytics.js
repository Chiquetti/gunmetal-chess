// Anonymous, cookie-free usage statistics through GoatCounter (page views + game events).
// Disabled until a site code is set in config.js.
import { CONFIG } from './config.js';

const code = (CONFIG.goatcounter || '').trim();
export const analyticsOn = !!code;
let ready = false;
const queue = [];

if (analyticsOn) {
  window.goatcounter = { no_onload: true, endpoint: `https://${code}.goatcounter.com/count` };
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.onload = () => { ready = true; queue.splice(0).forEach((q) => send(q)); };
  document.head.appendChild(s);
}

function send(q) {
  try { window.goatcounter.count(q); } catch (e) { /* ignore */ }
}
function push(q) {
  if (!analyticsOn) return;
  if (ready) send(q); else queue.push(q);
}

/** Page view for the current screen, e.g. '/library' or '/game/opera-game'. */
export function trackView(path, title) {
  push({ path, title: title || path });
}
/** Custom event, e.g. trackEvent('game-start-medium', 'Game started (Medium)'). */
export function trackEvent(name, title) {
  push({ path: 'event/' + name, title: title || name, event: true });
}
