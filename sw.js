const self=this
self.addEventListener("install", e=>{
    // console.log("Install!");
    e.waitUntil(
        caches.open("static").then(cache=>{
            // console.log("caching shell files");
            cache.addAll([
                "./",
                "./index.html",
                "./js/index.js",
                "./css/index.css",
            ]);
        })
    );  
});

self.addEventListener("fetch", e=>{
    // console.log("Fetching");
    e.respondWith(
        caches.match(e.request).then(cacheRes=>{
            console.log("opened cache");
            return cacheRes || fetch(e.request);
        })
    );
});

self.addEventListener("activate", e=>{
    // console.log("Activating");
    e.waitUntil(
        caches.keys().then(cacheNames=>{
            return Promise.all(
                cacheNames.filter(cacheName=>{
                    return cacheName.startsWith("static") && cacheName != "static";
                }).map(cacheName=>{
                    return caches.delete(cacheName);
                })
            );
        })
    );
});