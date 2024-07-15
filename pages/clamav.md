# install

```bash
# update api
sudo apt update && sudo apt upgrade

# install
sudo apt install clamav clamav-daemon -y

# update definitions
sudo freshclam

# if failed
sudo systemctl stop clamav-freshclam.service
sudo freshclam
sudo systemctl start clamav-freshclam.service

# run at startup
sudo systemctl enable clamav-freshclam.service


# scan
clamscan -r /path/to/scan --log=/path/to/scan_report.txt
```
