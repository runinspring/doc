###Nginx 配置多域名不同端口
首先需要编辑/etc/nginx/nginx.conf，在http模块中引入其他配置文件：

include /etc/nginx/conf.d/*.conf;

这样你就可以在/etc/nginx/conf.d文件夹中分别设置每个虚拟主机。

然后在上面的文件夹下分别新建文件/etc/nginx/conf.d/a.conf和/etc/nginx/conf.d/b.conf，当然文件名a，b随你起。
```
server {
    listen       80;
    server_name  a.abc.com;
    access_log /data/node/log/host.access.log  main;
    location / {
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-Ip $remote_addr;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://127.0.0.1:/;
        proxy_redirect off;
    }
}
```
对b.abc.com的应用只需要修改上面的server_name就可以。

这样每个访问 `http://a.abc.com` 的请求就会被转发到相应的端口上，由各自的应用处理。

###Nginx 配置https
http的端口为80，https的端口为443，这是2个不同的服务，所以需要配置2个server，同时把http的跳转到https上。SSL是腾讯云帮助页面的配置，别家的不知道一样不一样
```
server {
        listen       80;
        server_name  a.abc.com;
        rewrite ^(.*) https://a.abc.com$1 permanent;
}
server {
        listen       443;
        server_name  a.abc.com;
        ssl on;
        ssl_certificate 1_a.abc.com_bundle.crt;
        ssl_certificate_key 2_a.abc.com.key;
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;
        location /
        {
		proxy_redirect off;
      proxy_set_header   X-Real-IP            $remote_addr;
      proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
      proxy_set_header   Host                   $http_host;
      proxy_set_header   X-NginX-Proxy    true;
      proxy_set_header   Connection "";
      proxy_http_version 1.1;
      proxy_pass        http://127.0.0.1:3010;
        }
        include /data/home/server/nginx/conf/rewrite/default.conf;
        access_log  /data/home/log/nginx/access/default.log;
}
```