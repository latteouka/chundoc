沒辦法直接去改變 Pseudo 元素的內容，但可以用變數的方式去喬。

```css {6} filename="something.scss"
.nav-title {
  // ...

  &::after {
    content: attr(data-title);
    color: var(--navTitleColor, #838383);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: translate(0, 0%);
    transition: transform 0.4s ease;
  }
}
```

```typescript {4, 6} filename="something.ts"
const titles = document.querySelectorAll(".nav-title");
titles.forEach((title: any) => {
  if (title.dataset.title === active) {
    title.style.setProperty("--navTitleColor", "#1e293b");
  } else {
    title.style.setProperty("--navTitleColor", "#838383");
  }
});
```

BTW, :root

```scss
:root {
  --your-variable: #fff;
}
```

```typescript {} filename="root.ts"
document.documentElement.style.setProperty("--your-variable", "#YOURCOLOR");
```
