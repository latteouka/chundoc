## Ubuntu

```bash
# check settings
env | grep proxy

# test
curl -v https://google.com
```

```bash filename="/etc/environment"
http_proxy=http://192.168.98.1:3128
https_proxy=http://192.168.98.1:3128
```

## apt update

吃系統proxy

```bash
sudo http_proxy=http://172.104.88.1:3128 apt update
```

## git

```bash
# set
git config --global http.proxy http://192.168.98.1:3128
git config --global https.proxy http://192.168.98.1:3128

# unset
git config --global --unset http.proxy
git config --global --unset https.proxy
```

讓github ssh透過443 port並且走proxy
（如果防火牆沒開22到github.com）

```bash filename="~/.ssh/config"
Host github.com
  Hostname ssh.github.com
  Port 443
  User git
  ProxyCommand nc -X connect -x your-proxy-server:port %h %p
```

## Yarn

```bash
# set
yarn config set proxy http://192.168.98.1:3128
yarn config set https-proxy http://192.168.98.1:3128

yarn config unset proxy http://192.168.98.1:3128
yarn config unset https-proxy http://192.168.98.1:3128

# check
yarn config list
```

## Python PIP

### temp

吃系統proxy

```bash
export http_proxy=http://192.168.98.56:3128
export https_proxy=http://192.168.98.56:3128

# 可以直接測試 pip install cats
```

## Python program

吃系統proxy

```python
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

## proxy settings
http_proxy = os.getenv("HTTP_PROXY")
https_proxy = os.getenv("HTTPS_PROXY")

if http_proxy:
    os.environ["HTTP_PROXY"] = http_proxy
    logging.info(f"HTTP_PROXY set to: {http_proxy}")
else:
    logging.info("HTTP_PROXY is not set.")

if https_proxy:
    os.environ["HTTPS_PROXY"] = https_proxy
    logging.info(f"HTTPS_PROXY set to: {https_proxy}")
else:
    logging.info("HTTPS_PROXY is not set.")
```

.env

```python

# .env
# HTTP_PROXY=http://your_http_proxy
# HTTPS_PROXY=http://your_https_proxy

import os
import logging
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Proxy settings from .env file
http_proxy = os.getenv("HTTP_PROXY")
https_proxy = os.getenv("HTTPS_PROXY")

if http_proxy:
    os.environ["HTTP_PROXY"] = http_proxy
    logging.info(f"HTTP_PROXY set to: {http_proxy}")
else:
    logging.debug("HTTP_PROXY is not set.")

if https_proxy:
    os.environ["HTTPS_PROXY"] = https_proxy
    logging.info(f"HTTPS_PROXY set to: {https_proxy}")
else:
    logging.debug("HTTPS_PROXY is not set.")
```
