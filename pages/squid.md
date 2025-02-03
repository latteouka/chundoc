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
acl address src 192.168.98.1, 192.168.98.2

# Allow access from the local network
http_access allow localhost
http_access allow localnet
http_access allow address

# Deny all other access by default
http_access deny all

# Log settings
access_log /var/log/squid/access.log squid
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
