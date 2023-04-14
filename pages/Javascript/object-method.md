# [js] Object Method

這些 method 存在於 Object 的 Prototype 之中，只列出遇過的，可能會慢慢補上。

static: The static keyword defines a static method or field for a class, or a static initialization block (see the link for more information about this usage). Static properties **cannot be directly accessed on instances of the class**. Instead, they're accessed on the class itself.

## Object.create()

(static method)

```typescript
const pro = {
  name: "default",
};

// 以pro當作prototype生成一個新object
const a = Object.create(pro);

console.log(a);
// Expected output: {}

console.log(a.name);
// Expected output: "default"
```

## Object.hasOwnProperty()

```typescript
const pro = {
  name: "default",
};

const a = Object.create(pro);

a.color = "red";

console.log(a.hasOwnProperty("name"));
// name 存在於 prototype 不是自己的
// Expected output: false

console.log(a.hasOwnProperty("color"));
// Expected output: true
```

## Object.keys(), Object.values()

(static method)

會回傳含有所有 key 或 value 的 array，很常見會拿來做 mapping 或是 foreach。

```typescript
const object1 = {
  a: "somestring",
  b: 42,
  c: false,
  d: 42,
};

console.log(Object.keys(object1));
// Expected output: ["a", "b", "c", "d"]

console.log(Object.values(object1));
// Expected output: ["somestring", 42, false, 42]
```

## Object.assign()

(static method)

```typescript
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// Expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget === target);
// Expected output: true
// 回傳的結果是變動後的target object
```
