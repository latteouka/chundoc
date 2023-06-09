這個部署 Next.js 到自己的主機會用到。

```bash
# install
sudo apt-get update
sudo apt-get install nginx letsencrypt

# Firewall
sudo ufw allow 'Nginx Full'

# config file location
sudo vim /etc/nginx/sites-available/default

# basic
sudo nginx -t # check syntax errors first
sudo systemctl restart nginx

```

### SSL

```bash
# letsencrypt
sudo letsencrypt certonly -a webroot --webroot-path=/var/www/html -d example.com -d www.example.com

# Generate key
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

sudo vim /etc/nginx/snippets/ssl-params.conf
```

```nginx filename="ssl-params.conf"
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";
ssl_ecdh_curve secp384r1;
ssl_session_cache shared:SSL:10m;
ssl_session_tickets off;
ssl_stapling on;
ssl_stapling_verify on;

resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;

add_header Strict-Transport-Security "max-age=63072000; includeSubdomains";
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;

ssl_dhparam /etc/ssl/certs/dhparam.pem;
```

### Config

```nginx filename="default"
# /etc/nginx/sites-available/default

server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name example www.example.com;
  return 301 https://$server_name$request_uri;
}

server {
  # listen on *:443 -> ssl; instead of *:80
  listen 443 ssl http2 default_server;
  listen [::]:443 ssl http2 default_server;

  server_name example.com;

  ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
  include snippets/ssl-params.conf;

  location / {
    # reverse proxy for next server
    # later we use pm2 to manage the starting of next server
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  location ~ /.well-known {
    allow all;
  }
}
```

如果有想要特殊的 Header 內資訊，就要在上面 proxy 中設定傳進 Next Server。

比如說：

```nginx {7-8}
location / {
  proxy_pass http://localhost:3000;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_cache_bypass $http_upgrade;
}

```

```typescript {6-8} filename="api.ts"
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  const ipAddress: any = req.headers["x-forwarded-for"]
    ? req.headers["x-forwarded-for"]
    : "";
  const { email, mailId, groupId, practiceId }: any = query;

  const filePath = path.resolve(".", "public/return.png");
  const imageBuffer = fs.readFileSync(filePath);

  await prisma.click.create({
    data: {
      address: email,
      mailId: parseInt(mailId),
      groupId: parseInt(groupId),
      practiceId: parseInt(practiceId),
      action: 2,
      ip: ipAddress,
    },
  });

  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "image/png");
  return res.send(imageBuffer);
}
```
