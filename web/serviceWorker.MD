Service Worker

一个 service worker 是一段运行在浏览器后台进程里的脚本，它独立于当前页面，提供了那些不需要与web页面交互的功能在网页背后悄悄执行的能力。目前的主要功能是拦截和处理网络请求，主要用于缓存管理。

在 chrome 中输入 `chrome://inspect/#service-workers` 可以看到当前启动的所有的 service worker
![service worker](./chrome.png)


下面是一个示例,演示一下缓存管理。
我的项目是在自己的测试服务器上的 https://egret.sinaapp.com/worker3。
注意：service worker 一定要在运行在 https 的服务器上
~~~
项目结构
www/worker3/
	index.html 入口html
    main.js 主文件，注册service worker
    sw.js service worker代码
    id1.js 用来演示缓存的文件
    id2.js 用来演示缓存的文件
    dist/serviceworker-cache-polyfill.js  缓存策略
    
~~~

下面是 main.js 的代码
~~~
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
~~~
这里有个地方要注意，`erviceWorker.register('/worker3/sw.js')`，这个注册路径要以根域名为路径的起点，虽然我们的代码已经放到 worker3 目录下了，但还是要写上。
下面是 sw.js 的代码





下面主要说一下要注意的问题。

* Service worker拥有一个完全独立于Web页面的生命周期。比如用chrome 打开一个启动了 Service worker 的网页，即便关掉这个标签页，Service worker 还是会在后台运行，这个进程什么时候关闭，是由浏览器自动控制的，我们没法干预。
* 如果一个页面是刚刚注册了service worker，那么它这一次不会被接管，到下一次加载页面的时候，service worker才会生效。

一些相关的教程
[mozilla 官方 API 说明](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
http://www.w3ctech.com/topic/866
http://www.tuicool.com/articles/ieeEBr
http://web.jobbole.com/84792/
http://imweb.io/topic/56592b8a823633e31839fc01
http://www.07net01.com/2016/01/1102314.html
http://www.open-open.com/lib/view/open1426815580164.html


