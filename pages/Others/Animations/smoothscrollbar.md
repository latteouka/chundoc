---
---

# [ani] Smooth Scrollbar with GSAP

## setup func

### js (after mount: useEffect)

```typescript
// https://github.com/idiotWu/smooth-scrollbar

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Scrollbar, { ScrollbarPlugin } from "smooth-scrollbar";

gsap.registerPlugin(ScrollTrigger);

// for disable and enable after intro played
class TogglePlugin extends ScrollbarPlugin {
  static pluginName = "toggle";

  static defaultOptions = {
    // 預設先關起來
    disable: true,
  };

  transformDelta(delta) {
    // 如果打開才回傳捲動數字 不然就都是零
    return this.options.disable ? { x: 0, y: 0 } : delta;
  }
}

const setupSmoothScrollbar = () => {
  console.log("setup smooth scrollbar");
  const scroller: HTMLElement = document.querySelector(".scroller");

  Scrollbar.use(TogglePlugin);

  const scrollBar = Scrollbar.init(scroller, {
    damping: 0.1,
    delegateTo: document,
    alwaysShowTracks: true,
  });

  // let ScrollTrigger know your position when using third-party scrolling
  ScrollTrigger.scrollerProxy(".scroller", {
    scrollTop(value) {
      if (arguments.length) {
        scrollBar.scrollTop = value;
      }
      return scrollBar.scrollTop;
    },
  });

  scrollBar.addListener(ScrollTrigger.update);
  ScrollTrigger.defaults({ scroller: scroller });

  console.log("init finish");

  // Only necessary to correct marker position - not needed in production
  if (document.querySelector(".gsap-marker-scroller-start")) {
    const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

    scrollBar.addListener(({ offset }) => {
      gsap.set(markers, { marginTop: -offset.y });
    });
  }

  return scrollBar;
};

export default setupSmoothScrollbar;
```

### html

```html
<!-- scroll container -->
<div className="scroller">
  <!-- contents -->
</div>
```

## enable

```typescript
scrollBar.updatePluginOptions("toggle", { disable: false });
```
