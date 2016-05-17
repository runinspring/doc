var value = 'id2-43';
document.getElementById('testID2').innerHTML = value;
var xhr = new XMLHttpRequest();
var url = "https://egret.sinaapp.com/swdemo/okok";
xhr.open("GET", url, true);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var value = xhr.responseText;
        console.log("xhr.responseText", value);
        document.getElementById('swid').innerHTML = value;
    }else{
        document.getElementById('swid').innerHTML = '没有从 ServiceWorker 返回自定义内容';
    }
};
xhr.send();
console.log(value);