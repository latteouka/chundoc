# abstract

表示這個 class 就像是一個抽象的藍圖，應被繼承產生新的 class。
通常 abstract class 中也會設有 abstract properties 跟 methods，建立 subclass 時就必須要去實作這些要求。

See also: Design Pattern - Factory Method

```typescript
abstract class Person {
  name: string;
  abstract something: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract find(name: string): Person;
}

const employee = new Person("Latte");
// Error: Cannot create an instance of an abstract class.
```

```typescript
class Employee extends Person {
  constructor(name: string, job: string) {
    super(name);
  }
}

// Error: Non-abstract class 'Employee' does not implement
// inherited abstract member 'find' from class 'Person'.

// Error: Non-abstract class 'Employee' does not implement
// inherited abstract member 'something' from class 'Person'.
```

```typescript
class Employee extends Person {
  job: string;
  something: string;

  constructor(name: string, job: string) {
    super(name);
    this.job = job;
    this.something = "something";
  }

  find(name: string): Person {
    return new Employee("Latte", "cat");
  }
}

// something and find() are now defined.
```
