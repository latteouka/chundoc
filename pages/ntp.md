## Commands

```bash
# 應該是已經有裝了
sudo apt install systemd-timesyncd
timedatectl set-ntp true

sudo systemctl start systemd-timesyncd

# check status
sudo systemctl status systemd-timesyncd

# edit config
sudo vim /etc/systemd/timesyncd.conf

# restart
sudo systemctl restart systemd-timesyncd

# check for settings
timedatectl show-timesync --all

# logs for checking synchronization
sudo journalctl -u systemd-timesyncd -f
```

## /etc/systemd/timesyncd.conf

```
[Time]
NTP=ntp.server.you.want next.server.you.want
#FallbackNTP=ntp.ubuntu.com
#RootDistanceMaxSec=5
#PollIntervalMinSec=32
#PollIntervalMaxSec=2048
```

## 中華電信研究所時間與頻率國家標準實驗室

- tock.stdtime.gov.tw
- watch.stdtime.gov.tw
- time.stdtime.gov.tw
- clock.stdtime.gov.tw
- tick.stdtime.gov.tw
