# Config

## vim

sudo vim /etc/squid/squid.conf

## basic config

```bash filename="/etc/squid/squid.conf"
# http
http_port 3128

# Access Control List (ACL) to allow local network
acl localhost src 127.0.0.1
acl localnet src 192.168.98.0/24
acl address src 192.168.98.1 192.168.98.2

# Allow access from the local network
http_access allow localhost
http_access allow localnet
http_access allow address

# 定義允許存取的目的網站（主域與子域）
acl apt_servers dst \
    esm.ubuntu.com \
    security.ubuntu.com \
    ppa.launchpadcontent.net \
    dl.yarnpkg.com \
    tw.archive.ubuntu.com \
    developer.download.nvidia.com

acl git_servers dst \
    github.com \
    gist.github.com \
    codeload.github.com \
    ssh.github.com

acl yarn_misc dst \
    binaries.prisma.sh

acl python_servers dstdomain \
    .pypi.org \
    .files.pythonhosted.org \
    .infominer.io

acl model_servers dst \
    huggingface.co


acl yarnpkg_domains dstdomain .yarnpkg.com .d.akamaiedge.net

# === 組合所有允許的情境 ===
http_access allow external_user apt_servers Safe_ports
http_access allow external_user git_servers Safe_ports
http_access allow external_user yarn_misc Safe_ports
http_access allow external_user python_servers Safe_ports
http_access allow external_user model_servers Safe_ports
http_access allow external_user yarnpkg_domains Safe_ports

# Deny all other access by default
http_access deny all

# Log settings
logformat readable_time %{%Y-%m-%d %H:%M:%S}tl %6tr %>a %Ss/%03>Hs %<st %rm %ru %un %Sh/%<a %mt
access_log /var/log/squid/access.log readable_time
cache_log /var/log/squid/cache.log
```

## upstream parent proxy

表示我可以讓B Server設定upstream到A Server  
C Server設定proxy到B Server  
這樣C Server等於proxy到A Server

```bash filename="/etc/squid/squid.conf"
# http
http_port 3128

# Access Control List (ACL) to allow local network
acl localhost src 127.0.0.1
acl localnet src 192.168.1.0/24
acl addresses src 192.168.1.43

cache_peer 172.104.2.1 parent 80 0 no-query default
never_direct allow all
# Allow access from the local network
http_access allow localhost
http_access allow localnet
http_access allow addresses

# Deny all other access by default
http_access deny all

# Log settings
access_log /var/log/squid/access.log squid
cache_log /var/log/squid/cache.log
```

## ubuntu proxy setting

env | grep proxy

```bash filename="/etc/environment"
http_proxy=http://192.168.98.59:3128
https_proxy=http://192.168.98.59:3128
```

source /etc/environment

出去再進來

## backup

```bash
# http
http_port 80

acl Safe_ports port 80 443

# Access Control List (ACL) to allow local network
acl external_user src 223.200.x.x 61.220.x.85 61.220.x.2

# 定義允許存取的目的網站（主域與子域）
acl apt_servers dst \
    esm.ubuntu.com \
    security.ubuntu.com \
    ppa.launchpadcontent.net \
    dl.yarnpkg.com \
    tw.archive.ubuntu.com \
    developer.download.nvidia.com

acl git_servers dst \
    github.com \
    gist.github.com \
    codeload.github.com \
    ssh.github.com

acl yarn_misc dst \
    binaries.prisma.sh

acl python_servers dstdomain \
    .pypi.org \
    .files.pythonhosted.org \
    .infominer.io

acl model_servers dst \
    huggingface.co


acl yarnpkg_domains dstdomain .yarnpkg.com .d.akamaiedge.net

# === 組合所有允許的情境 ===
http_access allow external_user apt_servers Safe_ports
http_access allow external_user git_servers Safe_ports
http_access allow external_user yarn_misc Safe_ports
http_access allow external_user python_servers Safe_ports
http_access allow external_user model_servers Safe_ports
http_access allow external_user yarnpkg_domains Safe_ports

# Deny all other access by default
http_access deny all

# Log settings
# 定義時間格式
logformat readable_time %{%Y-%m-%d %H:%M:%S}tl %6tr %>a %Ss/%03>Hs %<st %rm %ru %un %Sh/%<a %mt
access_log /var/log/squid/access.log readable_time
cache_log /var/log/squid/cache.log


connect_timeout 60 seconds
request_timeout 5 minutes
read_timeout 5 minutes
```
