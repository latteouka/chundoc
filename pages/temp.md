## Fixing untrusted Hatching apt repository

[Fixing untrusted Hatching apt repository](https://hatching.dev/install-docs/#fixing-untrusted-hatching-apt-repository)

```
# Remove the untrusted/expired key and then download the new key.

apt-key list
apt-key del <key id>

# In order to get up-and-running again, you must refetch the signing key:

wget https://deploy.hatching.io/pkg/<company>/<unique>/hatching.gpg -O /etc/apt/trusted.gpg.d/hatching.gpg

# https://deploy.hatching.io/pkg/kymo/470feda2198c727c
```

## most used

```
systemctl start hatching-sandbox-net
systemctl start hatching-sandbox
systemctl start hatching-vms


# log
journalctl -u hatching-vms -f

# status

systemctl status hatching-sandbox-net
systemctl status hatching-sandbox
ls -al /var/lib/sandbox/logs
```
