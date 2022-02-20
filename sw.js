const cacheName = "guessIt-game-v2.2";
const cacheFiles = [
  "./",
  "./index.html",
  "./css/index.css",
  "./js/index.js",
  "./images/icon512.png",
  "./images/icon192.png",
];
// const self = this;
self.addEventListener("install", (e) => {
  // console.log("Install!");
  self.skipWaiting();
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
      return cacheRes || fetch(e.request);
    })
  );
});

self.addEventListener("activate", (e) => {
  // console.log("Activating");
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((key) => {
            return key !== cacheName;
          })
          .map((key) => {
            return caches.delete(key);
          })
      );
    })
  );
});
