---
---

# [ani] Asscroll with GSAP

**無法解決 resize 時 trigger 會跳動的問題，兩個函式庫直接搭配時有 Bug，改用 smooth-scrollbar 吃進 proxy 就沒問題**

**the timing of setting scroll and triggers matters!**

**console log to make sure triggers are being set after scroll proxy init**

## setup func

### js (after mount: useEffect)

```typescript
const setupScroll = () => {
  const ASScroll = require("@ashthornton/asscroll");

  // 用query以className抓
  // 直接放asscroll-container跟asscroll-content在div的props，lsp會不爽
  const containerElement = document.querySelector(".asscroll-container");
  const scrollElements = document.querySelector(".asscroll-content");

  const asscroll = new ASScroll({
    // 要加ease不然trigger反應會很慢
    ease: 0.6,
    disableRaf: true,
    // 指定上面的元素
    containerElement,
    scrollElements,
  });
  gsap.ticker.add(asscroll.update);

  ScrollTrigger.defaults({
    scroller: asscroll.containerElement,
  });

  ScrollTrigger.scrollerProxy(asscroll.containerElement, {
    scrollTop(value) {
      return arguments.length
        ? (asscroll.currentPos = value)
        : asscroll.currentPos;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    fixedMarkers: true,
  });

  // gsap scroll triggers!
  // 確定在這時候才設定scroll triggers
  // gsap scroll triggers!

  asscroll.on("update", ScrollTrigger.update);
  ScrollTrigger.addEventListener("refresh", asscroll.resize);

  return asscroll;
};
```

### html

```html
<!-- container -->
<div className="asscroll-container">
  <!-- scroll content -->
  <div className="asscroll-content"></div>
</div>
```

如果要直接可以用，可以直接 enable()不用 return

用 function 回 asscroll 回來，剩下 enable()還沒做
因為不一定希望一開始就啟動 scroller

但這個 setup 要在其他 gsap trigger 用之前先做
（proxy 有設定 scroll container）
不然 trigger 會參照到錯誤的 container

## enable

```typescript
// ass!
const ass = setupScroll();

// 在想要讓user可以scroll時使用（比如說intro動畫放完後）
// 要不要requestAnimationFrame?
// 看不出指定元素有沒有差
// 三種肉眼沒看出差異
// 應該用 gsap.ticker.add(asscroll.update) 就已經有RAF了;

ass.enable();

ass.enable({
  newScrollElements: document.querySelectorAll(
    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
  ),
});

requestAnimationFrame(() => {
  ass.enable({
    newScrollElements: document.querySelectorAll(
      ".gsap-marker-start, .gsap-marker-end, .asscroll-content"
    ),
  });
});
```

## urls

https://codepen.io/GreenSock/pen/rNyyxBP

https://codepen.io/ashthornton/pen/PoZRwPW

## greensock demo

```typescript
import ASScroll from "https://cdn.skypack.dev/@ashthornton/asscroll";
import gsap from "https://cdn.skypack.dev/gsap@3.6.1";
import ScrollTrigger from "https://cdn.skypack.dev/gsap@3.6.1/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  const asscroll = setupASScroll();
  const isTouch = "ontouchstart" in document.documentElement;
  const totalScroll = asscroll.containerElement.scrollHeight - innerHeight;

  gsap.to(".peach", {
    scrollTrigger: {
      pin: true,
      pinType: isTouch ? "fixed" : "transform",
      end: "200%",
      scrub: 0.2,
      trigger: ".peaches",
    },
    y: (i, target) => -totalScroll * target.dataset.speed,
    ease: "none",
  });

  gsap.from(".gif img", {
    scrollTrigger: {
      pin: true,
      pinType: isTouch ? "fixed" : "transform",
      scrub: true,
      trigger: ".gif",
    },
    scale: 0.2,
    autoAlpha: 0,
    ease: "sine.out",
  });
});

function setupASScroll() {
  // https://github.com/ashthornton/asscroll
  const asscroll = new ASScroll({
    // requestAnimationFrame
    disableRaf: true,
  });

  gsap.ticker.add(asscroll.update);

  ScrollTrigger.defaults({
    scroller: asscroll.containerElement,
  });

  ScrollTrigger.scrollerProxy(asscroll.containerElement, {
    scrollTop(value) {
      if (arguments.length) {
        asscroll.currentPos = value;
        return;
      }
      return asscroll.currentPos;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    fixedMarkers: true,
  });

  asscroll.on("update", ScrollTrigger.update);
  ScrollTrigger.addEventListener("refresh", asscroll.resize);

  requestAnimationFrame(() => {
    asscroll.enable({
      newScrollElements: document.querySelectorAll(
        ".gsap-marker-start, .gsap-marker-end, [asscroll]"
      ),
    });
  });
  return asscroll;
}
```

## how

觀察 style 可以發現是把整個 content 用 transform: translateY 往上移

遇到移動完才觸發 trigger 怎麼辦？
