```bash
pm2 start --name insloc main.js

pm2 start yarn --name api -- start
pm2 start "yarn start" --name yourProjec

pm2 save


pm2 startup
# sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u xxx --hp /home/xxx

# 產生startup script
# 要複製起來並使用後才有效果
# env PATH=$PATH:/usr/bin: This part sets the environment variable PATH to include /usr/bin. It ensures that when PM2 starts as a service, it can locate the necessary binaries.
# /usr/lib/node_modules/pm2/bin/pm2: This is the path to the PM2 executable.
# startup systemd: Specifies that PM2 should set up its startup script for systemd, which is a system and service manager for Linux.
# -u xxx: Specifies the user under which the PM2 service should run. In this case, it's set to run under the user xxx.
# --hp /home/xxx: Specifies the home directory of the user xxx. This is where PM2 will look for configuration files and store its data.

pm2 resurrect
```

## Python

```bash
pm2 start loop.py --name line --interpreter python3
```
