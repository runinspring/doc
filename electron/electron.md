## ElectronDownload 增加淘宝镜像的方法
electron-prebuilt/install.js
增加一个 mirror的option
var mirror = 'https://npm.taobao.org/mirrors/electron/'
// downloads if not cached
download({version: version, mirror:mirror,platform: process.env.npm_config_platform, arch: process.env.npm_config_arch, strictSSL: process.env.npm_config_strict_ssl === 'true'}, extractFile)


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
