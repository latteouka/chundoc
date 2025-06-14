## Hide scrollbar

```scss
// for copy-paste
html {
  scrollbar-width: none !important;
  -ms-overflow-style: none;
}

html body::-webkit-scrollbar {
  display: none;
}

// browser
html {
  // firefox
  scrollbar-width: none !important;

  // IE, Edge
  -ms-overflow-style: none;
}

html body::-webkit-scrollbar {
  // safari
  display: none;
}
```

## Lenis

```typescript filename="vanilla.ts"
import Lenis from "@studio-freight/lenis";
import { Func } from "../core/func";

export const lenis = new Lenis({
  duration: 2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //infinite: true,
  smoothTouch: true,
});

function raf(time: number) {
  if (Func.instance.sw() > 800) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
}

requestAnimationFrame(raf);
```

### Next.js

```typescript filename="useScroll.ts"
const useScroll = () => {
  const [lenis, setLenis] = useState<Lenis | null>();
  const reqIdRef = useRef<ReturnType<typeof requestAnimationFrame>>();

  useEffect(() => {
    const animate = (time: DOMHighResTimeStamp) => {
      lenis?.raf(time);
      reqIdRef.current = requestAnimationFrame(animate);
    };
    reqIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqIdRef.current as number);
  }, [lenis]);

  useIsomorphicLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0
          ? 0
          : t === 1
          ? 1
          : Math.pow(2, -10 * t) * Math.sin((t * 12 - 0.75) * c4) + 1;
      },
      infinite: true,
      smoothTouch: true,
    });

    setLenis(lenis);

    function onScroll({ velocity }: Lenis) {}

    lenis.on("scroll", onScroll);
    return () => {
      lenis.destroy();
    };
  }, []);
};
export default useScroll;
```

### 製造 wheel event

```typescript
// initEvent已經deprecated
function before() {
  const wheelEvt = document.createEvent("MouseEvents") as any;
  wheelEvt.initEvent("wheel", true, true);
  wheelEvt.deltaY = -170;
  document.dispatchEvent(wheelEvt);
}

function next() {
  const wheelEvt = document.createEvent("MouseEvents") as any;
  wheelEvt.initEvent("wheel", true, true);
  wheelEvt.deltaY = 170;
  document.dispatchEvent(wheelEvt);
}
```
