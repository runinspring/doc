if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/worker3/sw.js').then(function(registration) {
        document.getElementById('app').innerHTML="ServiceWorker 注册成功"
        console.log('service worker 注册成功');
    }).catch(function (err) {
        document.getElementById('app').innerHTML="ServiceWorker 注册失败"
        console.log('servcie worker 注册失败',err)
    });
}else{
    document.getElementById('app').innerHTML="不支持 ServiceWorker"
}
//skipWaiting clients.claim() Promise