## Demo

請先看最後要呈現的[結果](https://www.chundev.com/demo/sticky-tiles)（拉到 section3 位置）。

## 構想

先跟著我想像一下，黑色區域的高度其實是五個螢幕高度，然後五個 div 其實全部都是 absolute 疊在一起的，只是滾動時依照滾動進度改變了 opacity，並另外以 translateY 製造視差效果。

到這邊已經懂的話，有些人應該不用繼續看下去就能自己實作出來了，不仿自己試試看。

## scrollY

因為整個過程都會需要用到已經從上面滾動多少（scrollY）的數據，先用 Context API 來把整個 APP 包起來，之後不管在哪裡都可以取用（不一定要包在最上層，但因為 scrollY 通常別的 Components 也可能用到）。

另外 addEventListener 裡面的 passive option 可以參考[這裡](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#%E4%BD%BF%E7%94%A8_passive_%E6%94%B9%E5%96%84%E7%9A%84%E6%BB%9A%E5%B1%8F%E6%80%A7%E8%83%BD)。

```typescript filename="scroll-observer.ts"
import React, { useCallback, useEffect, useState } from "react";

interface ScrollValue {
  scrollY: number;
}

interface Props {
  children: React.ReactNode;
}

export const ScrollContext = React.createContext<ScrollValue>({ scrollY: 0 });

const ScrollObserver = ({ children }: Props) => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <ScrollContext.Provider value={{ scrollY }}>
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollObserver;
```

```typescript filename="_app.tsx"
...
  <ScrollObserver>
    <Component {...pageProps} />
  </ScrollObserver>
...
```

## Tiles

從上面的構想可以知道我們大概是要做成這樣：在 TileWrapper 設定`relative`，然後 TileContent 則是`sticky`，最後真的要放內容的 Tile 則是`absolute`讓他們全部疊在一起。

```jsx
<div className="flex flex-col">
  <TileWrapper>
    <TileContent>
      <Tile />
      <Tile />
      ...
    </TileContent>
  </TileWrapper>
</div>
```

先從 Wrapper 開始

```typescript
import { ScrollContext } from "../../utils/scroll-observer";

interface TileWrapperProps {
  numOfPages: number;
  children: React.ReactNode;
}

interface TileContextValue {
  numOfPages: number;
  currentPage: number;
}

const TileContext =
  React.createContext <
  TileContextValue >
  {
    numOfPages: 0,
    currentPage: 0,
  };

export const TileWrapper = ({ children, numOfPages }: TileWrapperProps) => {
  const { scrollY } = useContext(ScrollContext);
  const refContainer = useRef < HTMLDivElement > null;

  let currentPage = 0;

  const { current: elContainer } = refContainer;

  if (elContainer) {
    const { clientHeight, offsetTop } = elContainer;
    const screenH = window.innerHeight;
    const halfHeight = screenH / 2;

    // 半頁進入視窗後開始算%數
    // scrollY - offsetTop 就是滾到我們ref的這個div了
    const percentY = (scrollY - offsetTop + halfHeight) / clientHeight;
    currentPage = percentY * numOfPages;
  }

  return (
    <TileContext.Provider value={{ numOfPages, currentPage }}>
      <div
        ref={refContainer}
        className="relative bg-black"
        style={{ height: numOfPages * 100 + "vh" }}
      >
        {children}
      </div>
    </TileContext.Provider>
  );
};
```

再來是 Content 沒什麼特別，就是`sticky`，如果沒有`overflow-hidden`，之後你放東西進來後，如手機畫面垂直距離較長東西就有可能會跑出去，但我們希望效果全都在這個 div 裡面出現就好。

```ts
export const TileContent = ({ children }) => {
  return (
    <div className="sticky top-0 h-screen overflow-hidden">{children}</div>
  );
};
```

最後是重點的 Tile，要在這邊對 opacity 動手動腳。因為全都是`absolute`疊在一起的，所以要利用 TileContext 給我們的`numOfPages`及`currentPage`，搭配我們自己給 Tile 的`page`編號，這個記得要從 0 開始，計算 opacity 才會正確！

```ts
interface TileProps {
  page: number;
}

export const Tile = ({ page }: TileProps) => {
  const { numOfPages, currentPage } = useContext(TileContext);
  const progress = Math.max(0, currentPage - page);

  let opacity = Math.min(1, Math.max(0, progress * 4));

  if (progress > 0.85 && page < numOfPages - 1) {
    opacity = Math.max(0, (1.0 - progress) * 4);
  }

  return (
    <div
      className="text-white absolute top-0 w-full text-2xl md:text-4xl lg:text-6xl flex justify-center items-center h-screen"
      style={{ opacity }}
    >
      {progress}
    </div>
  );
};
```

組合起來 jsx 的部分則是：

```jsx
<div className="flex flex-col">
  <div className="h-screen flex justify-center items-center">
    Placeholder Section1
  </div>
  <div className="h-screen flex justify-center items-center">
    Placeholder Section2
  </div>
  <TileWrapper numOfPages={5}>
    <div>start at half screen height</div>

    <TileBackground></TileBackground>
    <TileContent>
      <Tile page={0} />
      <Tile page={1} />
      <Tile page={2} />
      <Tile page={3} />
      <Tile page={4} />
    </TileContent>
  </TileWrapper>
  <div className="h-screen flex justify-center items-center">
    Placeholder Section4
  </div>
</div>
```

做到這邊已經可以看見滾動加上透明度變化的效果了，但還沒有做到視差的效果，我們需要把 Tile 裡面的`progress`拿來運用，當然你可以直接在 Tile 底下寫進去，但萬一你想要用`progress`做更多視覺效果，Tile 底下可能會有更多 components，所以可以這麼做：

```js
interface TileProps {
  page: number;
  renderContent: (props: { progress: number }) => any;
}

export const Tile = ({ page, renderContent }: TileProps) => {
  ...
  return (
    <div
      className="text-white absolute top-0 w-full text-2xl md:text-4xl lg:text-6xl flex justify-center items-center h-screen"
      style={{ opacity }}
    >
      {renderContent({ progress })}
    </div>
  );
};
```

```js
const ContentBox = ({ progress }: contentBoxProps) => {
  let translateY = Math.max(-100, -(progress - 0.5) * 100);
  return (
    <div style={{ transform: `translateY(${translateY}px)` }}>{progress}</div>
  );
};
...
  <TileContent>
    <Tile
      page={0}
      renderContent={({ progress }) => (
        <ContentBox progress={progress}></ContentBox>
      )}
    />
    <Tile
      page={1}
      renderContent={({ progress }) => (
        <ContentBox progress={progress}></ContentBox>
      )}
    />
    <Tile
      page={2}
      renderContent={({ progress }) => (
        <ContentBox progress={progress}></ContentBox>
      )}
    />
...
```

自己利用 progress 試試其他效果吧！
