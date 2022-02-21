const cacheName = "guessIt-game_v1.1";
const cacheFiles = [
  "./",
  "./index.html",
  "./css/index.css",
  "./js/index.js",
  "./js/app.js",
  "./images/icon512.png",
  "./images/icon192.png",
  "./images/wrong.png"
];
// const self = this;
self.addEventListener("install", (e) => {
  // console.log("Install!");
  self.skipWaiting(); //auto activate latest service worker from web
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("caching shell files");
      cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener("fetch", (e) => {
  // console.log("Fetching");
  e.respondWith(
    caches.match(e.request).then((cacheRes) => {
      // console.log(cacheRes);
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

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
