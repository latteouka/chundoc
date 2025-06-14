# 把首頁轉向

```ts filename="next.config.mjs"
const config = {
  redirects() {
    return [
      {
        source: "/",
        destination: "/document",
        // permanent: true,
      },
    ];
  },
};

export default config;
```
