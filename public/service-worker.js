const CACHE_NAME = "v1";
const CACHE_ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/favicon_io/android-chrome-192x192.png",
  "/favicon_io/android-chrome-512x512.png",
  "/favicon_io/apple-touch-icon.png",
  "/favicon_io/favicon-32x32.png",
  "/favicon_io/favicon-16x16.png",
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Caching files");
        return cache.addAll(CACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Clearing old cache");
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
