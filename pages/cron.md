## crontab

```bash
# log
grep CRON /var/log/syslog

# 設定任務
# 要注意有沒有用sudo會造成不同角色的任務被排到
crontab -e

# 路徑要用絕對的

# */1 * * * * /usr/bin/node /var/www/socialmail/utils/sendemailcron.js
```
