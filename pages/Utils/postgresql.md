## command

```bash
# restart
sudo systemctl restart postgresql

# ssl settings etc
sudo vim /etc/postgresql/12/main/postgresql.conf

# allow connections
sudo vim /etc/postgresql/12/main/pg_hba.conf

# check logs
sudo tail /var/log/postgresql/postgresql-12-main.log
```

## SSL

節錄一下。\*表示全接受。
ssl 這邊另外開一個資料夾避掉權限問題，然後在 letsencrype 那邊要設一個 renew 的 hook 來複製，這樣就會自動處理憑證更新了。

```bash filename="/etc/postgresql/12/main/postgresql.conf"
listen_addresses = '*'          # what IP address(es) to listen on;

# - SSL -
ssl = on
#ssl_ca_file = '/etc/ssl/postgresql/'
ssl_cert_file = '/etc/ssl/postgresql/server.crt'
#ssl_crl_file = ''
ssl_key_file = '/etc/ssl/postgresql/server.key'
```

這裡最下面加上，表示全都要。（ㄜ..也可以不要這樣

```bash filename="/etc/postgresql/12/main/pg_hba.conf"
hostssl  all         all          0.0.0.0/0             md5
host  all  all 0.0.0.0/0 md5
```

## prisma

```bash
DATABASE_URL='postgresql://user:password@ip:5432/dbname?schema=user'
```
