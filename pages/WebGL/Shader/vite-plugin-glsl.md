# vite-plugin-glsl

[Github](https://github.com/UstymUkhman/vite-plugin-glsl)

```typescript
// vite.config.js
import glsl from "vite-plugin-glsl";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [glsl()],
});
```

```glsl
// main.js
import fragment from './glsl/main.frag';

// import something
#include chunk0.frag;
#include utils/chunk1;
#include chunk2.frag;
#include ../chunk3.frag;
```
