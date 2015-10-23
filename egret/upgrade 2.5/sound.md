# egret 2.4版本声音说明
新版本的 Sound 与老版本有很多不同，首先 Sound 类本身不再支持对音频的 stop 以及声音的大小进行设置，这些将会在 play 之后创建的 SoundChannel 中去设置。

另外我们对Sound进行了重新设计，解决了不能同时播放多个同一个音频的问题（手机必须得支持同时播放多个音频）。

SoundEvent 也被移除了，您可以通过监听 SoundChannel 的 egret.Event.SOUND_COMPLETE 这个事件获得声音播放完成的消息。

下面我们来讲下具体的使用方法。

## 创建 Sound
有3种方法获取音频
### 1通过 Sound 获取音频
~~~
var sound:egret.Sound = new egret.Sound();
sound.addEventListener(egret.Event.COMPLETE, function loadOver(event:egret.Event) {
			sound.play(0,1);
		}, this);
sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event:egret.IOErrorEvent) {
    			console.log("loaded error!");
    		}, this);
sound.load("resource/sound.mp3");

~~~
创建一个 Sound 对象，通过 load 方法加载路径中的声音文件。

Sound 类只有2个加载的事件：
~~~
egret.Event.COMPLETE 音频加载完成时抛出

egret.IOErrorEvent.IO_ERROR 音频加载失败时抛出
~~~
### 2通过 URLLoader 获取音频
~~~
var loader:egret.URLLoader = new egret.URLLoader();
loader.addEventListener(egret.Event.COMPLETE, function loadOver(event:egret.Event) {
			var sound:egret.Sound = loader.data;
			sound.play(0,1);
}, this);
loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
loader.load(new egret.URLRequest("resource/sound.mp3"));
~~~

### 3通过 RES 获取音频
~~~
var sound:egret.Sound = RES.getRes("sound_mp3");
sound.play(0,1);
~~~
一般我们推荐用这种方法，最简单。


## 播放 Sound
~~~
var sound:egret.Sound = RES.getRes("sound_mp3");
var channel:egret.SoundChannel = sound.play(0,1);
channel.addEventListener(egret.Event.SOUND_COMPLETE, function soundComplete(event:egret.Event) {
      console.log("soundComplete");
}, this);

~~~
* play 的2个参数。startTime：声音开始播放的位置，默认为0。loops：声音播放的次数，小于等于0均为无限循环播放，大于0按照对应的值播放次数。
* 和之前不一样的是，新版 Sound play 之后，会创建一个 SoundChannel 对象，开发者可以直接对 SoundChannel 进行操作。
~~~
volume  音量范围从 0（静音）至 1（最大音量）
position 当前声音播放的位置（以秒为单位）
stop 停止在该声道中播放声音
~~~
* 对于声音的播放完成的事件监听，从原来对 Sound 进行监听，变成对 play 后创建的 SoundChannel 监听 egret.Event.SOUND_COMPLETE ，并且去掉了 Sound 的 pause 和 resume方法。如果想要实现此方法，可以根据 SoundChannel 返回的 position 和 Sound 的 play 来实现。

## 播放类型
目前引擎内提供了4种声音的兼容模式，分别是 Audio、 WebAudio、QQAudio（qzone提供的声音解决方案）、以及 NativeAudio（打包方案Audio）：

* WebAudio：IOS系统版本大于等于7的所有IOS版本的浏览器。
* QQAudio：在html页面指定了 “http://qzonestyle.gtimg.cn/qzone/phone/m/v4/widget/mobile/jsbridge.js” （Qzone使用的js api）并且运行在 qq空间的 的android机型。
* Audio：除使用WebAudio以及QQAudio外的其他所有的Web浏览器或者平台。可能出现的问题是声音播放有延迟，同一时间只能有一个音频的存在。
* NativeAudio：打包方案使用的audio。

## 其他
新版不再需要手动调用 Sound 的 preload 以及 destroy 来将资源从本地加载到内存以及销毁，这些都会在内部自动实现。
