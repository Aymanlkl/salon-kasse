/* Salon Kasse – Service Worker
   Aufgabe: die App startet auch ohne Internet und meldet neue Versionen.
   Bei jeder neuen App-Version die VERSION hochzählen. */
const VERSION = 'salon-kasse-v11';
const FONTS   = VERSION + '-fonts';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION && k !== FONTS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Seitenaufruf: erst Netz (damit Updates ankommen), sonst Cache
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); return r; })
        .catch(() => caches.match('./index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  // Schriften: aus dem Cache, im Hintergrund erneuern
  if (url.hostname.endsWith('googleapis.com') || url.hostname.endsWith('gstatic.com')) {
    e.respondWith(caches.open(FONTS).then(c => c.match(req).then(hit => {
      const net = fetch(req)
        .then(r => { c.put(req, r.clone()); return r; })
        .catch(() => hit || new Response('', { status: 504, statusText: 'offline' }));
      return hit || net;
    })));
    return;
  }

  if (url.origin !== location.origin) return;

  // Eigene Dateien: Cache zuerst
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)
    .then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return r; })
    .catch(() => hit || new Response('', { status: 504, statusText: 'offline' }))));
});
