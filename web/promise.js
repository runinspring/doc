

// http://www.cnblogs.com/lvdabao/p/es6-promise-1.html
// http://www.jianshu.com/
function runAsync1(){
	var p = new Promise(function(resolve, reject){
        //做一些异步操作
        console.log('start1')
        setTimeout(function(){
            console.log('执行完成');
            resolve('随便什么数据');
        }, 2000);
    });
    return p;
}
function runAsync2(){
	var p = new Promise(function(resolve, reject){
        //做一些异步操作
        console.log('start2')
        setTimeout(function(){
            console.log('执行完成2');
            resolve('随便什么数据2');
        }, 2000);
    });
    return p;
}
function runAsync3(){
	console.log('start3')
	var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('执行完成3');
            resolve('随便什么数据3');
        }, 2000);
    });
    return p;
}
runAsync1().then(function(data){
	console.log(111,data);
	return runAsync2();
})
.then(function(data){
	console.log(112,data);
	return runAsync3();
})
.then(function(data){
	console.log(113,data);

})
console.log(12313)