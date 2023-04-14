[cheatsheet](https://greensock.com/cheatsheet/)

### matchmedia

```typescript
import gsap from "gsap";

const mm = gsap.matchMedia();

mm.add("(min-width: 900px)", () => {});
mm.add("(max-width: 901px)", () => {});
```

### scroll trigger

```typescript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
```

### overwrite

```typescript
gsap.defaults({ overwrite: true });
gsap.defaults({ overwrite: false });
```

### grid

```typescript {8}
const tl = gsap.timeline().from(".box", {
  scale: 0,
  rotation: -360,
  duration: 1,
  stagger: {
    each: 0.1,
    from: "center", // 中央から
    grid: "auto", // 格子状に開始
  },
});
```

### time mapping slow motion

[source](https://ics.media/entry/220825/)

```typescript {13, 18-23, 33}
const tl = gsap
  .timeline()
  .from(".rect", {
    scale: 0,
    rotation: -360,
    duration: 1,
    stagger: {
      each: 0.1,
      from: "center", // 中央から
      grid: "auto", // 格子状に開始
    },
  })
  .addLabel("complete");

// need to import EasePack module for
// slow easing
// https://greensock.com/docs/v3/Installation?checked=core
tl.tweenTo("complete", {
  duration: 4,
  ease: "slow(0.4, 0.8, false)",
  repeat: -1,
  repeatDelay: 1,
});

// with Next.js
import { gsap } from "gsap";
import { EasePack } from "gsap/dist/EasePack";

gsap.registerPlugin(EasePack);

tl.tweenTo("complete", {
  duration: 4,
  ease: EasePack.SlowMo.config(0.3, 0.5, false),
  repeat: -1,
  repeatDelay: 1,
});
```
