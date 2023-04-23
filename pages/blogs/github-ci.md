## CI

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

```js filename="next.config.mjs"
const config = {
  // add these to skip at deploy phase
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
};
```
