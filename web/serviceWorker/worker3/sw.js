importScripts('dist/serviceworker-cache-polyfill.js');
const catchVersion = 'cahce-list-v31';
console.log('catchVersion2:',catchVersion)
var cacheFiles1 = [
    '/worker3/id1.js'
];
this.addEventListener('install', function (evt) {
    console.log('install');
    evt.waitUntil(
        caches.open(catchVersion).then(function (cache) {
            return cache.addAll(cacheFiles1).then(function(){ self.skipWaiting()});;
        })
    );
});
this.addEventListener('fetch', function (evt) {
    var reqUrl = evt.request.url;
    evt.respondWith(
        caches.match(evt.request).then(function(response) {
            if (response) {
                console.log('fetch',reqUrl);
                return response;
            }
            console.log('not fetch',reqUrl);
            return fetch(evt.request);
        })
    )
});
this.addEventListener('activate', function(event) {
    var cacheWhitelist = [catchVersion];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    console.log('cacheName',cacheName);
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('clean oldCatch',cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

