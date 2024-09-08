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

## 如何新增資料庫

```

psql -U postgres

postgres=# CREATE DATABASE xxx;

postgres=# CREATE USER xxx;

postgres=# ALTER USER xxx WITH PASSWORD 'new_password';

postgres=# GRANT ALL PRIVILEGES ON DATABASE db_name TO user_name;

postgres=# \c example_db
example_db=# GRANT ALL ON SCHEMA public TO example_user;

```

## example

```sql
SELECT * FROM "Document" WHERE id = 'cm0nbn6500001ldrm5bjbk7ox'

DELETE FROM "Document" WHERE id = 'cm0nbn6500001ldrm5bjbk7ox';

```

## dump and restore

```bash
pg_dump -U user_name database_name > output_filename.log


# scp your file

CREATE DATABASE new_database_name;

psql -U username -d new_database_name -f /path/to/dumpfile.sql

# create user
CREATE USER new_username WITH PASSWORD 'your_password';

# 上面那個會留下history
CREATE USER new_username;

\password new_username

# 權限要設定
# db
GRANT ALL PRIVILEGES ON DATABASE new_database_name TO new_username;

# 看要不要設owner
ALTER DATABASE new_database_name OWNER TO new_username;

# grant access
\c new_database_name
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO new_username;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO new_username;
```

## 如果遇到不能用user登入

```bash
/etc/postgresql/1x/main/pg_hba.conf

local     all         all             peer # change this to md5
local     all         all             md5 # like this

sudo service postgresql restart
```

## reset postgres password

```bash
sudo -u postgres psql
\password postgres
```
