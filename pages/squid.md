# Config

sudo vim /etc/squid/squid.conf

```squid
File path: /etc/squid/squid.conf

# http
http_port 3128

# Access Control List (ACL) to allow local network
acl localhost src 127.0.0.1
acl localnet src 192.168.98.0/24

# Allow access from the local network
http_access allow localhost
http_access allow localnet

# Deny all other access by default
http_access deny all

# Log settings
access_log /var/log/squid/access.log squid
cache_log /var/log/squid/cache.log
```
