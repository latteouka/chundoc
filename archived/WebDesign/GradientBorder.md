```scss
wrapper {
  position: relative;
  border-radius: 1.25rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    border-radius: 1.25rem;
    border: 2px solid transparent;

    // two colors
    background: linear-gradient(45deg, $gradient2, $gradient4) border-box;

    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
}
```
