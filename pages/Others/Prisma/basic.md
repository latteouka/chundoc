---
---

# [prisma] Basic

## dependency

```bash
yarn add prisma
```

## init

產生 schema file

[SQL Schema 設定會用到](https://www.prisma.io/docs/concepts/database-connectors/mysql)

```bash
npx prisma init
```

## Schema 參考

```js:prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["referentialIntegrity"]
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  referentialIntegrity = "prisma"
}

model Exchange {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  bankname  String   @unique
  bankbuy   String
  banksell  String
  time      String?
  allowance Float?
}

```

資料庫的連線資料 PlanetScale 會給，密碼一產出來就要複製走不然之後不給看就要重新產了。

```js:.env
DATABASE_URL='mysql://username:password@database_url/database_name?sslaccept=strict'
```

## Migrate

在本地端 migrate+產生 migration file 跟 prisma client 要用的檔案（type 就是從這邊自動產好，所以之後用 prisma client 都會有 type 提示，其實跟其他 ORM 套件一樣）。

```bash
npx prisma migrate dev --name init
```

migrate 推到 PlanetScale

```bash
npx prisma db push
```

跟 PlanetScale 資料庫連線要裝 pscale CLI

```bash
brew install planetscale/tap/pscale
```

```bash
pscale connect star-app initial-setup --port 3309
      databasename↑     branch↑
```

## 基本用法

[最基本的 CRUD](https://www.prisma.io/docs/concepts/components/prisma-client/crud)

```js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```
