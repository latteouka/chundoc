# [js] export { default }

在 `zustand` 的 source code 中可以看到

```typescript
export * from "./vanilla";
export * from "./react";
export { default as createStore } from "./vanilla";
export { default } from "./react";

// 現在剩下
// 不過這不是重點
export * from "./vanilla";
export * from "./react";
export { default } from "./react";
```

首先

```typescript
export { default as createStore } from "./vanilla";
```

從 vanilla 這個檔案拿他的 default export，然後用 createStore 這個名稱 export。

```typescript
export { default } from "./react";
```

從 react 這個檔案拿他的 default export，然後以 default export。

## named export and default export

ES6 有分為 named export 跟 default export，上面的`export * from "./vanilla"`是把 vanilla 中的 named export 在 index.ts 底下再 export 一次。

不過最後一行的`export { default } from "./react"`其實也已經 deprecated 啦。

所以現在用到 create 時我們會用`import { create } from "zustand"`

```typescript
/**
 * @deprecated Use `import { create } from 'zustand'`
 */
export default ((createState: any) => {
  if (__DEV__) {
    console.warn(
      "[DEPRECATED] default export is deprecated, instead import { create } from'zustand'"
    );
  }
  return create(createState);
}) as Create;
```

那第三行的`export { default as createStore } from "./vanilla"`，去翻當時的檔案，可以看見 vanilla.ts 中

```typescript
const createStore = ((createState) =>
  createState ? createStoreImpl(createState) : createStoreImpl) as CreateStore;

export default createStore;
```

我們就是把這個 default export 在 index 中重新以 createStore 的名稱 export。(named export)

所以我們可以直接從 zustand(index.ts)這樣叫 createStore

```typescript
import { createStore } from "zustand";
```

這些平常可能不會特別注意到，因為從 documeny 複製貼上時不會想那麼多對吧。
