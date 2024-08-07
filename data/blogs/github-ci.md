## CI

在這檔案設定 Github Actions

```yaml filename="./github/workflows/ci.yml"
name: CI

on: [push, pull_request]

env:
  DATABASE_URL: "https://something.com"

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Install Dependencies
        run: yarn install

      - name: Typecheck
        run: yarn typecheck

      - name: Lint
        run: yarn lint

      - name: Print E Variables
        run: echo $DATABASE_URL
```

在 next.config 取消 typescript, linting 的設定，這樣部署時就會跳過

```js filename="next.config.mjs"
const config = {
  // add these to skip at deploy phase
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
```

別忘了確認這兩個動作有加入。

```json filename="package.json"
"scripts": {
   "lint": "next lint",
   "typecheck": "tsc --noEmit",
 },
```
