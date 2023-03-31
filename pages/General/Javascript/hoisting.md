---
---

## Hoisting

Hoisting 是一個在 javascrpit 中會看到的機制/現象，首先要先了解 Execution Context 在執行上有兩個階段：`Creation Phase` 跟 `Execution Phase`，在 Creation Phase 的時候，JS Engine 會做一個 Global Execution Context 出來，然後建立 this object 並綁到 global object，接下來會將 variables 跟 function 登記到記憶體位置上，這時給他們的值是 undefined，最後這個步驟就是 Hoisting 了，實際上沒有東西真的被「提升」，只是先分配到記憶體位置上。

所以到了 Execution Phase 的時候，variables 們如果在真的被指派值之前去使用它，會發現他們的值是 undefined，而 function 因為已經存到記憶體上了，即使 lexical 看上去還沒執行到那邊，還是可以順利執行。

```typescript
console.log(a);
console.log(b());

// undefined
// "this is b!"
// undefined

var a = 3;
function b() {
  console.log("this is b!");
  return a;
}

console.log(a);
console.log(b());

// 3
// "this is b!"
// 3
```

## Arrow Function

上述的例子如果把 b 改成 arrow function，因為 arrow function 並不會被 Hoisting，所以呼叫的當下 b 是作為 variables 被 Hoisting 設為 undefined，若在指派之後才 console.log 就沒有錯誤了。

```typescript
console.log(b());

// Uncaught TypeError: b is not a function

var b = () => {
  console.log("this is b!");
  return a;
};
```

另一個常見的場景是，用 const/let 搭配 arrow function assign 時，在 execution phase 前期 const/let hoist 會在 TDZ 不能用（var 則如上所說還是 undefined），而用 function 宣告時會正常 hoist，常見把 function 放到最後面來讓程式碼好讀一點，除了寫 callback 以外的場合用 function 去宣告其實也不錯。

```typescript
add(4, 5);
// Error: Block-scoped variable 'add' used before its declaration.

add2(4, 5);
// OK!

const add = (a: number, b: number) => {
  return a + b;
};

function add2(a: number, b: number) {
  return a + b;
}
```

## this in arrow function

另外 Arrow function 中的 this 表示的是往外一層的物件。

```typescript
const cat = {
  name: "Latte",
  weight: 6,
  printIntro: () => {
    console.log(`The weight of ${this.name} is ${this.weight} KG.`);
  },
};

cat.printIntro();

// -> The weight of undefined is undefined KG.

const cat = {
  name: "Latte",
  weight: 6,
  printIntro: function () {
    console.log(`The weight of ${this.name} is ${this.weight} KG.`);
  },
};

cat.printIntro();

// -> The weight of Latte is 6KG.
```
