# .github/workflows/main.yml

```yml
name: Auto Deploy

on:
  push:
    branches:
      - main # or any other branch you want to trigger this workflow

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: deploy to vm
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.LINODE_HOST }}
          username: ${{ secrets.LINODE_USERNAME }}
          key: ${{ secrets.LINODE_SSHKEY }}
          script: |
            cd ${{ secrets.PROJECT_PATH }}
            git pull
            rm -rf .next
            yarn
            yarn build
            pm2 restart chundoc
```

# Settings

> Repository / Settings / Secrets and variables -> Actions

## LINODE_HOST

## LINODE_SSHKEY

這裡要用private key

cat ~/.ssh/id_rsa

## LINODE_USERNAME

PROJECT_PATH
