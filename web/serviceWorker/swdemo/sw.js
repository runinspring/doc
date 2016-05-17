importScripts('dist/serviceworker-cache-polyfill.js');
const catchVersion = 'cahce-list-v30';
console.log('catchVersion:',catchVersion)
var cacheFiles1 = [
    '/swdemo/',
    '/swdemo/index.html',
    '/swdemo/id1.js',
    '/swdemo/id2.js',
    '/swdemo/main.js',
];
this.addEventListener('install', function (evt) {
    console.log('install::');
    evt.waitUntil(
        caches.open(catchVersion).then(function (cache) {
            return cache.addAll(cacheFiles1);
            // return cache.addAll(cacheFiles1).then(function(){ self.skipWaiting()});;
        })
    );
});
this.addEventListener('fetch', function (evt) {
    var reqUrl = evt.request.url;
    //console.log('startFetch:',reqUrl)
    if(reqUrl == 'https://egret.sinaapp.com/swdemo/okok'){
        console.log('create response:',reqUrl);
        evt.respondWith(new Response("ServiceWorker 返回自定义内容成功",{headers:{ "Content-Type": "text/html"},"status":200 }))
    }else{
        evt.respondWith(
            caches.match(evt.request).then(function(response) {
                if (response) {
                    console.log('fetch',reqUrl);
                    return response;
                }
                console.log('not fetch',reqUrl);
                return fetch(evt.request);
                /*var request = evt.request.clone();
                 return fetch(request).then(function (response) {
                 if(reqUrl == "https://egret.sinaapp.com/worker3/okok"){
                 console.log('create new response:',reqUrl);
                 return new Response(catchVersion,{ "Content-Type": "text/html","status":200 });
                 }else{
                 console.log('nofetch:',reqUrl)
                 return response;
                 }
                 });*/
            })
        )
    }

});
this.addEventListener('activate', function(event) {
    //var cacheWhitelist = ['whiteList-v1'];
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

