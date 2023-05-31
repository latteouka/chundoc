```bash
pm2 start --name insloc main.js

pm2 start yarn --name api -- start
pm2 start "yarn start" --name yourProjec

pm2 save
```
