if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/swdemo/sw.js').then(function (reg) {
        
        var installType;
        if (reg.installing) {
            installType = "ServiceWorker 注册成功--installing";
        } else if (reg.waiting) {
            installType = "ServiceWorker 注册成功--installed";         
        } else if (reg.active) {
            installType = "ServiceWorker 注册成功--active";
        }
        console.log(installType);
        document.getElementById('app').innerHTML = installType;
    }).catch(function (err) {
        document.getElementById('app').innerHTML = "ServiceWorker 注册失败"
        console.log('servcie worker 注册失败', err)
    });
} else {
    document.getElementById('app').innerHTML = "不支持 ServiceWorker"
}
document.getElementById('ua').innerHTML = navigator.userAgent;
//skipWaiting clients.claim() Promise