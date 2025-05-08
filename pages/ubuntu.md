# Deploy 綜合版

## 網路

如果顯卡有被偵測到，系統安裝過程中可能會幫你生成檔案（如01-netcfg.yaml、50-cloud-init.yaml），如果沒有就自己建。

檔名沒有關係，但建議前面帶數字表示套用的順序。

```yaml filename="/etc/netplan/xx-xxx.yaml"
network:
  version: 2
  renderer: networkd
  ethernets:
    ens160:
      dhcp4: false
      addresses:
        - 192.168.1.100/24
      nameservers:
        addresses:
          - 192.168.1.3
      routes:
        - to: default
          via: 192.168.1.254
```

這步驟做好理當可以改用ssh進來了。

## 時間

```bash
timedatectl set-timezone 'Asia/Taipei'

## check
date
```

## 先更新及安裝想要裝的東西

```bash

apt update && apt upgrade

sudo apt install ntp
```

## ssh

如果確定要關閉root或使用密碼登入。

```bash filename="/etc/ssh/sshd_config"

PermitRootLogin no
PasswordAuthentication no

```

```bash
# restart ssh
sudo systemctl restart sshd
```

## Firewall

看自己想要開什麼，預設都是關的，所以enable後只有allow的可以過。

```bash
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443

sudo ufw enable
```

## Github

```bash
# 生一組ssh key
ssh-keygen -t ed25519 -C "xxx@gmail.com"

# 複製到github後台
cat ~/.ssh/id_ed25519.pub

# test
ssh -T git@github.com
```

## nginx

```bash
sudo apt install nginx
sudo ufw allow 'Nginx Full'


# 自簽ssl
sudo mkdir /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt

# 加在/etc/nginx/sites-available/default 的server區塊中
ssl_certificate /etc/nginx/ssl/nginx.crt;
ssl_certificate_key /etc/nginx/ssl/nginx.key;


# check
sudo nginx -t

# restart
sudo nginx -s reload
sudo systemctl restart nginx
```
