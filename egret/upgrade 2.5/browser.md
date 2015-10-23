Browser类已经废除，请使用新的类 egret-core\src\egret\system\Capabilities.ts

保留和新增的方法如下：

保留的方法
~~~
Browser.isMobile --> Capabilities.isMobile
~~~
新增的方法
~~~
Capabilities.os
获取具体的操所系统类型，比如 "iOS" "Android"
~~~
~~~
Capabilities.runtimeType
获取当前的运行类型
运行在Web上  egret.RuntimeType.WEB
运行在Native上     egret.RuntimeType.NATIVE
~~~
~~~
Capabilities.hasGeolocation
系统是否支持地理位置服务
~~~
~~~
Capabilities.hasOrientation
系统是否支持检测设备方向
~~~
~~~
Capabilities.hasMotion
系统是否支持运动传感器
~~~
