# [ts] getter, setter

getter, setter 是 js 本身的功能。

```typescript
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // get雖然是function的形式，但會產生一個名稱對應的property (color)
  get color() {
    return "orange";
  }

  // 必須要至少有一個參數，且不能return任何東西
  set color(input: string) {
    this.color = input;
  }
}

const latte = new Animal("Latte");
console.log(latte.color);
// [LOG]: "orange"
```

```typescript
// 把get拿掉，set存取this.color也不會出錯
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  set color(input: string) {
    this.color = input;
  }
}

const latte = new Animal("Latte");
console.log(latte.color);
// 只有設定setter
// [LOG]: undefined
```

```typescript
// 把set拿掉該member會變成read-only
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  get color() {
    return "orange";
  }
}

const latte = new Animal("Latte");
console.log(latte.color);

latte.color = "black";
// Cannot assign to 'color' because it is a read-only property.
// Cannot set property color of #<Animal> which has only a getter
```

```typescript
// 用了跟自己宣告的member一樣名字的話
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // Duplicate identifier 'name'.
  // highlight-next-line
  get name() {
    return "orange";
  }
}
```

```typescript
// 常見的做法是指定另一個帶底線member，讓get, set操作他
class Animal {
  name: string;
  // highlight-next-line
  _color: string;

  constructor(name: string) {
    this.name = name;
    this._color = "orange";
  }

  get color() {
    // highlight-next-line
    return this._color;
  }

  set color(input: string) {
    // highlight-next-line
    this._color = input;
  }
}

const latte = new Animal("Latte");
latte.color = "black";
console.log(latte.color);
// [LOG]: "black"
```

```typescript
// get, set 可以使用private member
class Animal {
  name: string;
  // highlight-next-line
  private _color: string;

  constructor(name: string) {
    this.name = name;
    this._color = "orange";
  }

  get color() {
    return this._color;
  }

  set color(input: string) {
    this._color = input;
  }
}

const latte = new Animal("Latte");
latte.color = "black";
console.log(latte.color);
// [LOG]: "black"
```

```typescript
// 在get, set 中可以做自己指定的操作
// 可不受限於原本的單一member，比如可以if, switch, throw Errow等等
class Animal {
  name: string;
  private _color: string;

  constructor(name: string) {
    this.name = name;
    this._color = "orange";
  }

  get color() {
    // highlight-next-line
    return "My color is: " + this._color;
  }

  set color(input: string) {
    // highlight-next-line
    this._color = "+++" + input + "+++";
  }
}

const latte = new Animal("Latte");
latte.color = "black";
console.log(latte.color);
// [LOG]: "My color is: +++black+++"
```
