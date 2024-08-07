# Nvidia driver install

```bash
# check gpu
sudo lshw -numeric -C display

sudo add-apt-repository ppa:graphics-drivers
sudo apt-get update
sudo apt upgrade

# list all
ubuntu-drivers list

# 輸出建議安裝驅動
nvidia-detector

sudo apt install nvidia-driver-555
sudo apt install nvidia-driver-535-server

# RTX A5000 on Ubuntu 22.04
sudo apt install nvidia-driver-535

# 後悔清空用
sudo apt-get purge nvidia*
sudo apt-get purge cuda*
sudo apt-get autoremove
sudo apt-get autoclean
sudo rm -rf /usr/local/cuda*



# cuda

# 找自己要的版本
# https://developer.nvidia.com/cuda-12-1-0-download-archive?target_os=Linux&target_arch=x86_64&Distribution=Ubuntu&target_version=22.04&target_type=deb_local

wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-ubuntu2204.pin
sudo mv cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600
wget https://developer.download.nvidia.com/compute/cuda/12.1.0/local_installers/cuda-repo-ubuntu2204-12-1-local_12.1.0-530.30.02-1_amd64.deb
sudo dpkg -i cuda-repo-ubuntu2204-12-1-local_12.1.0-530.30.02-1_amd64.deb
sudo cp /var/cuda-repo-ubuntu2204-12-1-local/cuda-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update

# 最後一步用有版本的
sudo apt-get -y install cuda-toolkit-12-1

# add to .bashrc with your version
export PATH=/usr/local/cuda-12.1/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda-12.1/lib64:$LD_LIBRARY_PATH
```

# disable secure boot

在安裝移除過程中可能被變成 secure boot

```bash
# 會輸入密碼
sudo apt install mokutil
sudo mokutil --disable-validation

# restart
sudo reboot

# 四個選項選第二個change secure boot state

# 照指示輸入密碼的第幾位

# diable secure boot

# ok!
```
