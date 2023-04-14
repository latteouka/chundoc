# public, private, protected

## Public

```typescript
class Animal {
  public name: string;

  public constructor(input: string) {
    this.name = input;
  }

  eat(something: string) {
    console.log(`I just ate ${something}`);
  }
}
```

default 宣告都是屬於 public，沒有什麼限制。

## Private

Javascript ES10 支援用#來表示 private members，Typescript 在 3.8 版本中跟上，另外也提供用 private 這個字來宣告成員，無法在 Class 外存取。

（但 typescript 只是在 compile 階段提醒）

[Typescript](https://www.typescriptlang.org/docs/handbook/classes.html#public-private-and-protected-modifiers)

```typescript
class Animal {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const animal1 = new Animal("animal1");

console.log(animal1.name);
// [LOG]: Property 'name' is private and only accessible within class 'Animal'.
// 只能在原class內存取private member

class Animal {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Cat extends Animal {
  private color: string;
  constructor(name: string, color: string) {
    super(name);
    this.color = color;
  }

  moew() {
    console.log(this.name);
    // [LOG]: Property 'name' is private and only accessible within class 'Animal'.
    // 加一個貓貓subclass，因為name是private即使subclass在class內一樣不能存取。
  }
}
```

## Protected

如果想要讓 subclass 可以在 class 內用，可以用 protected。

```typescript
class Animal {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const animal1 = new Animal("animal1");

console.log(animal1.name);
// [LOG]: Property 'name' is protected and only accessible within class 'Animal' and its subclasses.
// 跟private一樣不能從class外取用

class Cat extends Animal {
  private color: string;
  constructor(name: string, color: string) {
    super(name);
    this.color = color;
  }

  meow() {
    console.log(this.name);
    // subclass可以在class內取用
  }
}

const latte = new Cat("Latte", "Orange");

latte.meow();
// [LOG]: "Latte"
// 在subclass中也可以透過class內method存取

console.log(latte.name);
// [LOG]: Property 'name' is protected and only accessible within class 'Animal' and its subclasses.
// 但跟private一樣不能從外取用
```
