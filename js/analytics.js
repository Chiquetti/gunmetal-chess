// Usage statistics: Google Analytics 4 (with consent mode + a small consent bar) and/or GoatCounter.
// Everything stays OFF until an ID is set in config.js.
import { CONFIG } from './config.js';

const ga4 = (CONFIG.ga4 || '').trim();
const gc = (CONFIG.goatcounter || '').trim();
export const analyticsOn = !!(ga4 || gc);

const CONSENT_KEY = 'gunmetal.consent';
const getConsent = () => { try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; } };
const setConsent = (v) => { try { localStorage.setItem(CONSENT_KEY, v); } catch (e) { /* ignore */ } };

/* ---------------- Google Analytics 4 ---------------- */
function gtag() { window.dataLayer.push(arguments); } // eslint-disable-line prefer-rest-params
if (ga4) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = gtag;
  // Consent mode: nothing is stored until the visitor accepts.
  gtag('consent', 'default', { analytics_storage: getConsent() === 'granted' ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 400 });
  gtag('js', new Date());
  gtag('config', ga4, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ga4);
  document.head.appendChild(s);
}

/* ---------------- GoatCounter (optional, cookie-free) ---------------- */
let gcReady = false;
const gcQueue = [];
if (gc) {
  window.goatcounter = { no_onload: true, endpoint: `https://${gc}.goatcounter.com/count` };
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://gc.zgo.at/count.js';
  s.onload = () => { gcReady = true; gcQueue.splice(0).forEach(gcSend); };
  document.head.appendChild(s);
}
function gcSend(q) { try { window.goatcounter.count(q); } catch (e) { /* ignore */ } }

/* ---------------- public API ---------------- */
/** Page view for the current screen, e.g. '/library' or '/game/opera-game'. */
export function trackView(path, title) {
  if (ga4) gtag('event', 'page_view', { page_path: path, page_title: title || path, page_location: location.origin + location.pathname + '#' + path.replace(/^\//, '') });
  if (gc) { const q = { path, title: title || path }; if (gcReady) gcSend(q); else gcQueue.push(q); }
}
/** Custom event, e.g. trackEvent('game-start-medium', 'Game started (Medium)'). */
export function trackEvent(name, title) {
  if (ga4) gtag('event', name.replace(/[^a-zA-Z0-9_]/g, '_'), { event_label: title || name });
  if (gc) { const q = { path: 'event/' + name, title: title || name, event: true }; if (gcReady) gcSend(q); else gcQueue.push(q); }
}

/** Shows the consent bar when Google Analytics is on and the visitor has not chosen yet. */
export function initConsent() {
  const bar = document.getElementById('consent');
  if (!bar || !ga4) return;
  if (getConsent()) return;
  bar.hidden = false;
  document.getElementById('consent-yes').onclick = () => {
    setConsent('granted'); gtag('consent', 'update', { analytics_storage: 'granted' }); bar.hidden = true;
  };
  document.getElementById('consent-no').onclick = () => { setConsent('denied'); bar.hidden = true; };
}
