var value = 'id2-42';
document.getElementById('testID2').innerHTML = value;
var xhr = new XMLHttpRequest();
var url = "https://egret.sinaapp.com/worker4/okok";
xhr.open("GET", url, true);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var value = xhr.responseText;
        console.log("xhr.responseText", value);
        document.getElementById('swid').innerHTML = value;
    }
};
xhr.send();
console.log(value);