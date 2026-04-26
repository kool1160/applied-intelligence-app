const CACHE_NAME = 'applied-intelligence-v8-shell-2026-04-24-brand-01';

const APP_SHELL = [
  '/applied-intelligence-app/',
  '/applied-intelligence-app/index.html',
  '/applied-intelligence-app/manifest.json',
  '/applied-intelligence-app/install.js',
  '/assets/icons/icon-512.png',
  '/assets/icons/icon-512.png',
  '/assets/icons/icon-512.png',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png',
  '/assets/icons/icon-512.png',
  '/assets/brand/applied-intelligence-launch.svg',
  '/assets/brand/applied-intelligence-hat-icon-set.svg'
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

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
