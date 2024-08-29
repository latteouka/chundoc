# BIGGGGGGG UPGRADE!!

```bash
ssh usr@192.168.0.128

# mini
ssh mjib@192.168.0.129
```

## Check current settings and do the backup

1. Backup/copy all YAML configuration files from the old install/server.

- /var/lib/triage/: \*.yaml
- /var/lib/sandbox/: \_.yaml
- /var/lib/sandbox/vms: \_.yaml
- /var/lib/triage-frontend/: \*.yaml (database)

> 紀錄一下目前所有的config files
> 目前有哪些VM存在？

2. Backup and restore the PostgreSQL database on the old install/server.

```bash
sudo -u postgres pg_dump -d triage-www > database_dump.sql
```

Verify that the dump is not empty.

3. Backup/copy/move the remaining contents of /var/lib/triage of the old install/server to the new install/server.

4. Backup/copy/move the remaining contents of /var/lib/sandbox of the old install/server to the new install/server. You can skip backing up managedvms/ and hatchvm/ if you intend to regenerate VMs (recommended).

## Upgrade to 22.04

```bash
# check for version
lsb_release -a

# to 20.04 first
sudo apt update
sudo apt upgrade
reboot

cat /etc/update-manager/release-upgrades
# prompt should be lts

# apt install update-manager-core
do-release-upgrade

# now for 22.04
sudo apt update
sudo apt upgrade

do-release-upgrade
```

# Upgrade Triage

```bash
# Ensure you have the latest Let's Encrypt root certificate and GnuPG installed
apt update
apt install ca-certificates gnupg

# Configuring apt
# Enable repositories to receive security updates
deb http://archive.ubuntu.com/ubuntu jammy-updates main universe

# Create /etc/apt/sources.list.d/jammy-security.list with the contents:
deb http://security.ubuntu.com/ubuntu jammy-security main restricted
deb http://security.ubuntu.com/ubuntu jammy-security universe
deb http://security.ubuntu.com/ubuntu jammy-security multiverse

# Configure the hatching repository

# https://deploy.hatching.io/pkg/<company>/<unique>-<version>
# https://deploy.hatching.io/pkg/kymo/470feda2198c727c-22.04

wget https://deploy.hatching.io/pkg/kymo/470feda2198c727c-22.04/hatching.gpg -O /etc/apt/trusted.gpg.d/hatching.gpg

echo deb https://deploy.hatching.io/pkg/kymo/470feda2198c727c-22.04 ./ > /etc/apt/sources.list.d/hatching.list
echo 'APT::Install-Recommends "false";' >> /etc/apt/apt.conf.d/99norecommend
echo 'APT::Install-Suggests "false";' >> /etc/apt/apt.conf.d/99norecommend

# Update apt to make the packages provided by Hatching available
apt update

#####
# Every now and then the package signing key is rotated.
# remove the untrusted/expired key
apt-key list
apt-key del <key id>

# refetch the signing key
wget https://deploy.hatching.io/pkg/kymo/470feda2198c727c-22.04/hatching.gpg -O /etc/apt/trusted.gpg.d/hatching.gpg
```

## Route 1

用hatching-update

```bash
# Updating tool
apt install hatching-onprem-ops
hatching-update
```

## Route 2

Update separately.

https://hatching.dev/install-docs/update/

## Build new vms

https://hatching.dev/install-docs/sandbox/

### Windows 10 build 2004

### Windows 11 (21H2)

## Questions

1. Should I do anything to the Mac mini?
2. Can I use those old vms that we generated before?

## How to check USB storage and mount it?

```bash
# list USBs
sudo lsblk

# verbose
sudo lsusb -v

# the filesystem type
# look for the USB drive already plugged in
sudo fdisk -l

# find and mount
sudo mkdir /media/usb
sudo mount /dev/hda1 /media/usb

# unmount
sudo umount /media/usb
```
