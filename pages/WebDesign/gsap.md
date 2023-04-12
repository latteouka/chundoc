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
