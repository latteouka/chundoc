# 取消瀏覽器的上一頁行為

```ts
import Router from "next/router";

useEffect(() => {
  // 取消上一頁的行為並保留網址
  Router.beforePopState(() => {
    // 讓history的網址不要變
    const currentPath = Router.asPath;
    window.history.pushState(null, "", currentPath);

    // Do whatever you want
    setShow(false);

    return false;
  });

  // 要復歸回去不然上一頁的功能會一直失效
  return () => {
    Router.beforePopState(() => true);
  };
}, []);
```
