# [js] First-class Function

當一個語言中，function 可以向其他變數一樣被傳來傳去時，就稱為 First-class Function。

比如說在 javascript 中可以將 function 作為參數傳給其他 function，或是可以當作 function return 的對象，也可以當作一個被 assign 給變數的值。

其實只要了解到 function 也是 object，這一切就很自然。

```typescript filename="用state函式庫來舉例.ts"
// 這跟closure也有關係
// as arguments
export const createStore = (init) => {
  let store = null;
  const get = () => store;
  const set = (operation) => (store = operation(store));

  store = init(get, set);

  // assign
  const useStore = () => {
    return store;
  };

  // return
  return useStore;
};
```

建立了一個 function(on the fly)並 assign 給 createStore，然後 export，所以再來 import 並使用這個 createStore 的時候，都會拿到同一個 useStore function，執行後得到同一個 store。
