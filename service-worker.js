const CACHE_NAME = 'amarjeet-portfolio-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/assets/css/style.css',
  '/assets/js/script.js',
  '/assets/js/app.js',
  '/assets/images/AS.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Navigation requests: network-first, fallback to offline page
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Put a copy in cache
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => caches.match('/offline.html'))
    );
    return;
  }

  // Other requests: cache-first, then network
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).catch(() => {
      // fallback to a generic asset (image) when offline
      if (event.request.destination === 'image') {
        return caches.match('/assets/images/AS.png');
      }
    }))
  );
});

// Optional: listen for skipWaiting message to immediately activate new SW
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});