const CACHE_NAME = 'shooter-cache-v1';
const urlsToCache = [
  '/index.html',
  '/game.css',
  '/main.js',
  '/Character.js',
  '/Entity.js',
  '/Game.js',
  '/Opponent.js',
  '/Player.js',
  '/Shot.js',
  '/assets/bueno.png',
  '/assets/malo.png',
  '/assets/shot1.png',
  '/assets/shot2.png'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});