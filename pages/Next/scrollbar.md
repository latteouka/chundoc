簡約的Scrollbar

## install

```bash
yarn add sass
```

# global.scss

```scss
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

#scroller * {
  overflow-anchor: none;
}

#anchor {
  overflow-anchor: auto;
  height: 1px;
}

:root {
  --scrollbar-thumb-color: #ccc;
  --scrollbar-thumb-hover-color: #aaa;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb-color);
  border-radius: 999px;
  transition:
    width 0.3s,
    height 0.3s,
    visibility 0.5s;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--scrollbar-thumb-hover-color);
}

::-webkit-scrollbar-thumb:not(:hover) {
  width: 0;
  height: 0;
}

/* don't show arror */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
```
