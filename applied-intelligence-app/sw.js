const CACHE_NAME = 'applied-intelligence-v8-shell-2026-04-24-stability-01';

const APP_SHELL = [
  '/applied-intelligence-app/',
  '/applied-intelligence-app/index.html',
  '/applied-intelligence-app/manifest.json',
  '/applied-intelligence-app/install.js',
  '/applied-intelligence-app/assets/icons/favicon-16.png',
  '/applied-intelligence-app/assets/icons/favicon-32.png',
  '/applied-intelligence-app/assets/icons/apple-touch-icon.png',
  '/applied-intelligence-app/assets/icons/icon-192.png',
  '/applied-intelligence-app/assets/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
