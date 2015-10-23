# 扩展资源加载url地址
有的时候，我们需要根据不同的版本加载不同的资源，目前已经有很多种方法，比如可以根据版本来配置resource.json。

2.4版本新增了一种方式供您选择。
~~~
RES.registerUrlConvert(call:(url:string)=>string,thisObj:any);
~~~

比如我有2张背景图分别名为 bg_black.png 和 bg_white.png 。默认是使用 bg_black.png ，当我的版本是白色的时候，使用 bg_white.png。
代码如下:
~~~
public constructor() {
    super();
    RES.registerUrlConvert(this.getUrl,this);
}
private version: string = "white";//设置为白色版本
private getUrl(url: string): string {
    if(url.indexOf("bg_black.png") >=0 && this.version == "white"){//判断替换
      url = url.replace("bg_black.png","bg_white.png");
    }
    return url;
}
~~~
这样以后再使用图片的时候就不需要判断版本了，直接使用就可以
~~~
var bitmap = new egret.Bitmap(RES.getRes("bg_black_png"));
this.addChild(bitmap);
~~~
注意，这个方法需要写在加载资源文件之前。

