// ΚΑΘΕ ΦΟΡΑ ΠΟΥ ΚΑΝΕΙΣ ΑΛΛΑΓΗ ΣΤΟ INDEX.HTML, ΘΑ ΑΛΛΑΖΕΙΣ ΑΥΤΟ ΤΟ ΝΟΥΜΕΡΟ (π.χ. v2, v3, v4)
const CACHE_NAME = 'emode-calc-v6'; 

const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'icon-512.png'
];

// Εγκατάσταση νέας έκδοσης
self.addEventListener('install', event => {
  self.skipWaiting(); // Ενεργοποιεί τη νέα έκδοση αμέσως
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Διαγραφή παλιών εκδόσεων
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // Διαγράφει το παλιό cache
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Φόρτωση αρχείων
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
