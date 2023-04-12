先把 body 或 container 設定成`overflow: hidden;`

### 動畫結束後

#### Enable scroll

```typescript filename="Body or Container"
document.body.style.overflow = "visible";

document.getElementById("overflowControl").style.overflow = "visible";
```

#### Hide Loading Component

```typescript filename="Loading Component"
document.querySelector(".loading").classList.add("hidden");
```

#### webgl 不想被 scroll bar 影響寬度的話

控制 scroll library

```typescript filename="Lenis"
lenis.stop();

lenis.start();
```

## Preload Image Hook

```typescript filename="usePreloadImage.ts"
import { useEffect, useState } from "react";

function preloadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = img.onabort = function () {
      reject(src);
    };
    img.src = src;
  });
}

export default function useImagePreloader(imageList: string[]) {
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    async function effect() {
      // console.log("PRELOAD");

      if (isCancelled) {
        return;
      }

      const imagesPromiseList: Promise<any>[] = [];
      for (const i of imageList) {
        imagesPromiseList.push(preloadImage(i));
      }

      await Promise.all(imagesPromiseList);

      if (isCancelled) {
        return;
      }

      setImagesPreloaded(true);
    }

    effect();

    return () => {
      isCancelled = true;
    };
  }, [imageList]);

  return { imagesPreloaded };
}
```
