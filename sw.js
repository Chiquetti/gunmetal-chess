// Service worker: lets the game open offline and install as an app.
// Static files are cached on install. Pages and scripts are fetched network-first (so updates
// arrive as soon as you are online); images, the chess engine and libraries are cache-first.
const VERSION = 'gunmetal-v1';
const CORE = [
  './', 'index.html', 'style.css', 'manifest.webmanifest',
  'js/app.js', 'js/board.js', 'js/engine.js', 'js/effects.js', 'js/games.js', 'js/i18n.js', 'js/ui.js',
  'js/online.js', 'js/player.js', 'js/profile-ui.js', 'js/analytics.js', 'js/config.js', 'js/learn.js',
  'js/i18n/games.pt.js', 'js/i18n/games.fr.js', 'js/i18n/games.es.js', 'js/i18n/ui.es.js',
  'lib/chess.js', 'lib/peerjs.min.js', 'lib/stockfish-19-lite-single.js', 'lib/stockfish-19-lite-single.wasm',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
  ...['k', 'q', 'r', 'b', 'n', 'p'].flatMap((p) => [`img/w${p}.png`, `img/b${p}.png`])
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => Promise.all(CORE.map((u) => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // never touch third-party requests (analytics, PeerJS...)
  const heavy = /\/(img|lib|icons)\//.test(url.pathname);
  if (heavy) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })));
    return;
  }
  e.respondWith(fetch(req).then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })
    .catch(() => caches.match(req).then((hit) => hit || caches.match('index.html'))));
});
