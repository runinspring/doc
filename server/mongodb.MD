mongobooster 可视化工具

```
cd bin    //进入到bin目录
./mongo   //启动mongod的命令行
use mydb  //切换到mydb数据库下
db.auth('username','password') //根据用户名和密码授权
//返回 0 失败； 返回 1 成功
```
###node 链接 mongodb
npm install mongodb --save
```
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
//链接到带用户名密码的db数据库
var url = "mongodb://useName:passWord@IpAddress:port/dbName";
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    //插入一个数据
    insertData(db);
    findData(db);
    
    //db.close(); 应该写在结束了所有操作数据的最后面
});
//插入数据
function insertData(db){
	//连接到名为mydb的数据库上
	var collection = db.collection('mydb');
	var insertData={'key':'okok'}
    collection.insert(insertData, function (err, result) {
    	if (err) {
            console.log('Err:' + err);
        } else {
            console.log('成功')
        }
    })
}
//查询数据
function findData(db){
	var collection = db.collection('mydb');
    var findData={'key':'okok'}
    collection.find(findData).toArray(function (err, result) {
        // db.close();
        if (err) {
            console.log('Err:' + err);
            callback(null);
        } else {
        	//返回一个符合条件的数组
            callback(result);
        }
    })
}
```