```bash
pm2 start --name insloc main.js

pm2 start yarn --name api -- start
pm2 start "yarn start" --name yourProjec

pm2 save

pm2 resurrect
```

## Python

```bash
pm2 start loop.py --name line --interpreter python3
```
