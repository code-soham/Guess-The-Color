const cacheName = "guessIt-game-v1.1";
const cacheFiles = [
  "./",
  "./index.html",
  "./css/index.css",
  "./js/index.js",
  "./sw.js",
  "./manifest.json",
  "./images/icon512.png",
  "./images/icon192.png",
];
// const self = this;
self.addEventListener("install", (e) => {
  // console.log("Install!");
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      // console.log("caching shell files");
      cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener("fetch", (e) => {
  // console.log("Fetching");
  e.respondWith(
    caches.match(e.request).then((cacheRes) => {
      console.log("opened cache");
      return fetch(e.request) || cacheRes;
    })
  );
});

self.addEventListener("activate", (e) => {
  // console.log("Activating");
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName.startsWith(cacheName) && cacheName != cacheName;
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});
