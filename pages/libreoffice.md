```
sudo apt install libreoffice

sudo apt install libreoffice-l10n-zh-tw

## sudo apt-get install fonts-wqy-zenhei fonts-wqy-microhei fonts-arphic-ukai

# 常用中文字體
sudo apt install ttf-mscorefonts-installer

sudo fc-cache -fv

fc-list :lang=zh

```

### 怎樣處理標楷體

```
# 自己想辦法用到kaiu.ttf
scp kaiu.ttf xxx@target.com:~/kaiu.ttf

# copy to
/usr/share/fonts/truetype/

# 刷新字型快取
fc-cache -fv
```
