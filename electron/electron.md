## Electron 增加淘宝镜像的方法

npm config set registry http://registry.cnpmjs.org 


npm info underscore （如果上面配置正确这个命令会有字符串response）

在 项目的package.json里增加mirror的属性

"package": "electron-packager ./ RuffHelper --all --out ~/Desktop/RuffHelper --mirror https://npm.taobao.org/mirrors/electron/ --version 0.37.3 --overwrite",

然后在
electron-packager/index.js  第104行增加 mirror 的属性
~~~
combinations.push({
        platform: platform,
        arch: arch,
        version: opts.version,
        cache: opts.cache,
        mirror: opts.mirror,
        strictSSL: opts['strict-ssl']
      })
~~~
这个已经给 electron-packager pull requests 了


electron 官网
API
https://github.com/atom/electron/tree/master/docs/api
https://github.com/atom/electron/tree/v0.34.5/docs/api
Shell-中文
https://github.com/atom/electron/blob/e5e4749eb3c592667922f87c1105981db9dd84f7/docs-translations/zh-CN/api/shell.md
中文官方文档
https://github.com/atom/electron/tree/master/docs-translations/zh-CN
英文官方文档
https://github.com/atom/electron/tree/master/docs
好的教程
http://www.liuhaihua.cn/archives/124970.html
其他教程
http://www.cnblogs.com/lhb25/p/create-cross-platform-desktop-applications.html
http://get.ftqq.com/7870.get
官方讨论区
https://discuss.atom.io/c/electron

1.0的api变化
http://blog.atom.io/2015/11/17/electron-api-changes.html
