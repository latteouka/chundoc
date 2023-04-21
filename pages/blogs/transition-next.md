## Next.js + GSAP

喜歡 GSAP 控制一切的感覺嗎？就用它來處理 Page Transition 吧。

[Demo](https://transition.chundev.com/)

[Github](https://github.com/latteouka/three-transition-next)

很棒吧～轉場的時候可以繼續玩 shader！

如果只是單純操作 CSS 的話或許可以用 react-transition-group 或是 framer motion 的 AnimatePresence。
但因為想要同時連 threejs 元素一起操作，覺得反而自己好好地設定時間軸更清楚。

另外 react-transition-group 看原始碼也是包一個 context 用類似的方式。

## Gtranz

[Gtranz](https://www.npmjs.com/package/@chundev/gtranz?activeTab=readme)

主要是參考[這個](https://tweenpages.vercel.app/docs)實作方式，但有遇到一些問題需要調整。

首先先來介紹一下邏輯。

我們用 React Context 來共享同一個 timeline，這個 timeline 是我們用來做 Outro 動畫用。

~~其實 setTimeline 根本也不會用到，所以這個 Context 並不會因為 state 更新而出現 re-render 地獄。~~

因為不會用到所以把 timeline 用 useMemo 處理了。

```tsx {13, 18} filename="TransitionContext.tsx"
import { useState, createContext } from "react";
import gsap from "gsap";

interface TransitionContextProps {
  timeline: gsap.core.Timeline | null;
}

const TransitionContext = createContext<TransitionContextProps>({
  timeline: null,
});

const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const timeline = useMemo(() => gsap.timeline({ paused: true }), []);

  return (
    <TransitionContext.Provider
      value={{
        timeline,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
};

export { TransitionContext, TransitionProvider };
```

再來就是處理實際 Page Transition 的 HOC。

~~跟原本參考的有出入的地方是，
dependencies 用 `router.asPath` 而不是 `children`，
這樣可以避免明明超連結路徑一樣卻還是觸發動畫，可以依個人需求調整。~~

我沒辦法把 useRouter 包到 npm package 中，所以基本款還是用 children。
所以要注意比如說不要提供同 path 的連結在頁面中。

另外原本的程式碼中 outro 播放完後是用`timeline.seek(0).pause().clear()`，
萬萬不可`seek(0)`東西都飛來飛去惹，
這個我因為相信他至少邏輯部分沒問題所以都沒檢查，除錯除了超久。

```tsx
import { useTimeline, useIsomorphicLayoutEffect } from "./Gtranz";
import { useState, useRef } from "react";

export default function TransitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const router = useRouter();
  const timeline = useTimeline();

  useIsomorphicLayoutEffect(() => {
    // 檢查children是否一樣
    if (children !== displayChildren) {
      // 不一樣，所以要播放timeline中的outro
      if (timeline.duration() === 0) {
        // 但timeline長度是0耶，表示這頁沒有設定outro動畫，那就直接轉頁
        setDisplayChildren(children);
      } else {
        // 播放設定好的outro動畫
        // 播完後停止並重置
        // 然後轉頁
        timeline.play().then(() => {
          // outro complete so reset to an empty paused timeline
          timeline.pause().clear();
          setDisplayChildren(children);
        });
      }
    }
  }, [children]);
  return <div>{displayChildren}</div>;
}
```

別忘了把上面的取一個中二的名字包起來後，把`_app.tsx`也包起來。

```tsx "Gtranz.tsx
// Provider
const Gtranz = ({ children }: { children: React.ReactNode }) => {
  return (
    <TransitionProvider>
      <TransitionLayout>{children}</TransitionLayout>
    </TransitionProvider>
  );
};
```

```tsx {1, 10}
<Gtranz>
  <main className={font.className}>
    <Head>
      <title>Next.js Transition</title>
    </Head>
    <canvas className="l-canvas"></canvas>
    <Component {...pageProps} />
    <Loading />
  </main>
</Gtranz>
```

## useIsomorphicLayoutEffect

`useLayoutEffect`可以在 dom 渲染之前就執行，避免動畫閃動。

但 Next.js 在 Server 端會不開心報錯，所以要讓他判斷一下，在 server 就用 useEffect。

```ts
import { useEffect, useLayoutEffect } from "react";

const isBrowser = typeof window !== "undefined";

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
```

## Intro/Outro

其實這裡我還遇到一個坑就是，要不要讓 gsap 預設為 overwrite，
由於我的需求除了 transition 之外，滑鼠滾動也會觸發「transition 有操作到的」元素，
所以會不斷地產生衝突。

先不討論這個的話，gsap 預設 overwrite 是關掉的。

```tsx filename="index.tsx"
const timeline = useTimeline();
// intro
// 進場把字秀出來
useIsomorphicLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      ".title",
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
      }
    );
  });

  return () => {
    ctx.revert();
  };
}, []);

// outro
// 離場把字弄不見
useIsomorphicLayoutEffect(() => {
  timeline.add(
    gsap.to(".title", {
      opacity: 0,
    }),
    0
  );

  return () => {
    timeline?.clear();
  };
}, []);
```

啊，這個 timeline 就是 context 中的 timeline，只是另外包起來又能檢查又好看。

```typescript
// timeline
const useTimeline = () => {
  const { timeline } = useContext(TransitionContext);

  if (timeline === undefined || timeline === null) {
    throw new Error("You should use context within Provider(Gransition)");
  }
  return timeline;
};

export { useTimeline };
```

## Overwrite

但如果就是要衝突怎麼辦？

```typescript filename="_app.tsx"
// 決鬥ㄚ
gsap.defaults({ overwrite: true });
```

如果做了上面的動作讓預設變為要 overwrite，那我們的 intro 跟 outro 就會開始打架，
你會發現動畫完全邏輯紊亂，難以除錯。

這時候，就要自己控制整個動畫執行以及設定的順序。（所以要對 React 的生命週期熟悉）

第一，可以用一個 state 來確保 intro 「動畫結束」後再設定 outro 動畫。

```typescript {1, 14, 29, 40} filename="index.tsx"
const timeline = useTimeline();
const [introPlayed, setIntroPlayed] = useState(false);
// intro
// 進場把字秀出來
useIsomorphicLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      ".title",
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        onComplete: () => {
          setIntroPlayed(true);
        },
      }
    );
  });

  return () => {
    ctx.revert();
  };
}, []);

// out
// 還沒播放intro的話就不要設定
// intro播完會因為dependencies才執行
useIsomorphicLayoutEffect(() => {
  if (!introPlayed) return;
  timeline.add(
    gsap.to(".title", {
      opacity: 0,
    }),
    0
  );

  return () => {
    timeline?.clear();
  };
}, [introPlayed]);
```

第二，我的例子的話因為同一頁我讓其他行為也操作到 「outro 動畫操作到的元素」的關係，
我就把設定 outro 元素設為一個 function，
然後「其他行為的動畫結束時」發送 Custom Event 觸發這個 function 重跑 outro 動畫設定。

```typescript {6-7, 17-18, 30-37} filename="index.tsx"
const timeline = useTimeline();
const [introPlayed, setIntroPlayed] = useState(false);
// intro
// 進場把字秀出來
useIsomorphicLayoutEffect(() => {
  // bind: outro你來吧
  document.addEventListener("setupAnimation", setupOutro);

  const ctx = gsap.context(() => {
    gsap.fromTo(
      ".title",
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        onComplete: () => {
          // intro結束時也觸發一下
          dispatchSetupOutroEvent("setupAnimation");
        },
      }
    );
  });

  return () => {
    document.removeEventListener("setupAnimation", setupOutro);
    ctx.revert();
  };
}, []);

// outro setup
function setupOutro() {
  timeline.add(
    gsap.to(".title", {
      opacity: 0,
    }),
    0
  );
}
```

```typescript {8} filename="某個遙遠的地方.tsx"
gsap.fromTo(
  ".title",
  { x: -100, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    onComplete: () => {
      dispatchSetupOutroEvent("setupAnimation");
    },
  }
);
```

類似這樣，可以在想要的地方觸發。

```typescript
function dispatchSetupOutroEvent(eventName: string, data: any) {
  const e = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(e);
}

dispatchSetupOutroEvent("setupAnimation");
```
