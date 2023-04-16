## Outline

outline + border-radius 的組合在 Chrome 正常，但 Safari 不可以，所以要用 pseudo element 自己實作才行。

```scss
.rect {
  position: relative;

  display: border-box;
  width: $width;
  height: $width;
  display: block;

  &::before {
    content: "";
    position: absolute;

    // outline: 2px solid #fea9cb;
    inset: -2px;
    border: 2px solid #fea9cb;
    border-radius: 0.3rem;

    @include sp {
      border-radius: 0.1rem;
    }
  }
}
```
