mongobooster 可视化工具

```
cd bin    //进入到bin目录
./mongo   //启动mongod的命令行
use mydb  //切换到mydb数据库下
db.auth('username','password') //根据用户名和密码授权
//返回 0 失败； 返回 1 成功
```

```
node 链接 mongodb
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = "mongodb://useName:passWord@IpAddress:port/dbName";
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    db.close();
});
```