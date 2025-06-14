## ssh key

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

eval "$(ssh-agent -s)"

cat ~/.ssh/id_rsa.pub
```

## test connection

```bash
ssh -T git@github.com
ssh -T git@github.com -v
```
