Loading Component 設定 class 為 loading

先把 body 或 container 設定成`overflow: hidden;`(hide scrollbar)

### 動畫結束後

#### Enable scroll

```typescript filename="Body or Container"
document.body.style.overflow = "visible";

// or

document.getElementById("customIdForThatDiv").style.overflow = "visible";
```

#### Hide Loading Component

沒有用 !important 的話可能會遇到 [CSS Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)判斷蓋不過去。

```scss
.hidden {
  display: none !important;
}

.hidden {
  z-index: -1 !important;
}
```

要用 delay 確保動畫的播放時間，才不會讀取很快結束很違和。

```typescript {10, 15} filename="Loading Component"
document.querySelector(".loading").classList.toggle("hidden");
document.querySelector(".loading").classList.add("hidden");

// Next.js
useIsomorphicLayoutEffect(() => {
  const ctx = gsap.context(() => {
    if (loaded) {
      gsap.to(".loading", {
        opacity: -0.5,
        delay: 2.5,
        duration,
      });
      gsap.to(".loading-wrap", {
        opacity: -0.5,
        delay: 2.5,
        duration,
        onComplete: () => {
          document.querySelector(".loading-wrap")!.classList.toggle("hidden");
        },
      });
    }
  });

  return () => {
    ctx.revert();
  };
}, [loaded]);
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
