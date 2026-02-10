const CACHE_NAME = 'fichapp-wrapper-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  // Note: App shell icons should be cached when they exist
  // './icons/icon-192x192.png',
  // './icons/icon-512x512.png'
];

// Install Event: Cache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
  self.skipWaiting();
});

// Activate Event: Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Event: Network First strategy for the wrapper shell
// If network fails (offline), serve the offline page
self.addEventListener('fetch', (event) => {
  
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Verify if request is for our origin (The wrapper shell)
  const url = new URL(event.request.url);
  
  // We can't really cache the google script iframe content due to cross-origin/CORS policies
  // So we focus on keeping the shell alive
  if (url.origin === location.origin) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // If network fails, try cache
          return caches.match(event.request)
            .then((response) => {
              if (response) {
                return response;
              }
              // If not in cache (and network failed), return offline page
              if (event.request.mode === 'navigate') {
                 return caches.match('./offline.html');
              }
            });
        })
    );
  }
});
