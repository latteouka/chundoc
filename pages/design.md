## 0 SOLID Principles

### Object-oriented programming

把資料跟與資料有關的行為包在 Object 中，通常在語言中會是用 Class 來做這些「設定」。

OOP 四大概念 abstraction, polymorphism, encapsulation, inheritance

- Abstraction 我們能自由地決定如何摘要物件的目的、特質，比如針對一樣的對象，依照目的不同可能會有不同的屬性或方法。
- Polymorphism 可以在 superclass 決定某些 interface 就是要讓 subclass 透過 override 的方式來達成不同功能。
- Encapsulation 我們可以對外（對其他物件）隱藏部分狀態跟行為，只能透過有限的 interface(public part of an object)存取。
- Inheritance 可以從 class 繼承建立新的 class。

### Basic

一開始讀 Desing Pattern，看到 Principle 覺得好像不遵守不行壓力山大，後來換個心態去想 Pattern 本身是自由的，有點像是看我能不能把一個東西說得好，解釋得好，如果用 Pattern 的方式去解釋，就能提升寫 code 品質、reuse 的程度、好不好延展等等。

最基本的準則在

- 封裝在哪裡，我覺得講封裝很抽象，比較直覺的就是要不要把邏輯放到 method 去，如果更複雜，要不要整個包到另一個 class 去。
- 兩個 class 有互動時，考慮以 interface>implementation，比如說 Man eat Cake，Cake 的部分可用 Food 的 interface 實作，Food 可能就能有卡路里、有效期限等，能新增不同的食物遵循 Food interface 去寫。
- 組成>繼承，用 Subclass 有必須實作所有 interface、實作還得考慮相容性、改 superclass 容易造成 subclass 出錯等缺點，所以比起用繼承的，用什麼東西有什麼的概念去做比較好，比如說我們不會 extends WebGLRenderer 在其上加功能，而是用一個新的 class，然後在裡面加入 scene、renderer、camera 等等。

上面的是基本的原則，後來 Robert Martin 在他的「Agile Software
Development, Principles, Patterns, and Practices」一書中介紹了 SOLID 準則，放在心裡可能可以幫助寫出更好理解、更彈性、更好維護的程式碼。

### SOLID

#### Single Responsibility

一個 class 應只有一個理由才會去更動它。

#### Open/Closed

class 應可設計的可被延伸、不需要被修改。

比如說如果我在一個 addGeometry 的 method 中判斷 input 是 box 還是 sphere 等，那如果我想要加這兩者以外的東西時，我就得修改這個 class，但要是把 input 定義在一個 interface，這個 class 就不需要被修改，而只要往外去確定送進 input 的東西有沒有遵循 interface 即可。

#### Liskov Substitution

如果 extend 一個 class，應該要確定 subclass 跟 superclass 相容。Parameter 的 type 要能往上，return type 的 type 要能往下。

比如說

#### Interface Segregation

設想 interface 時要有分離的概念，不要全部放在一起，不然有的物件就需要實作它可能根本不需要的功能。

#### Dependency Inversion

高階 class（複雜邏輯）不應該依賴到低階 class（低階實作）。依賴這個字有點難理解，但跟上述「Open/Closed」原則一樣，應該盡量以 interface 去思考，不要直接讓高階 class 去取用一些很細節的實作部分，而是用概念來決定（具體來說我覺得就是想要做的事情的大方向，像是「吃水果」，而不是一連串的打開冰箱、檢查庫存、切蘋果、吃，要是直接寫後者的話，會變成吃蘋果這個動作依賴了很多低階實作，在高階 class 中，我們可以定義水果的 interface 有檢查庫存、切、吃等等，然後讓低階去實作水果的部分）

```typescript
class Refrigerator {
    fruit: Apple
    constructor() {
        this.fruit = new Apple()
    }
}

class Apple {
    cut() {}
    eat() {}
    decreaceNumber() {}
}

↓↓↓↓↓↓↓↓↓↓↓↓

interface Fruit {
    consume: () => void
}

class Refrigerator {
    fruit: Fruit
    constructor() {
        this.fruit = new Orange()
    }
}

class Apple implements Fruit {
    cut() {}
    eat() {}
    decreaceCount() {}
    consume() {
        this.cut()
        this.eat()
        this.decreaceCount()
    }
}

class Orange implements Fruit {
    cut() {}
    eat() {}
    decreaceCount() {}
    consume() {
        this.cut()
        this.eat()
        this.decreaceCount()
    }
}

```

## 1 Factory Method

### Main idea

Factory Method 是一個概念，核心是在一個統一的地方（Class）設定產出的規則（要符合的 interface），就能產出符合規定的產品（Client Code）。

Design Pattern 主要分成三大主軸，Creational, Structrual, Behavior，目前我們看到的 Factory 當然是屬於第一種 Creational，在 Factory Method 之下，才會去談到 Abstract Factory, Builder, Prototype, Singleton，另外也會看到 Function Factory。

很常見的就是 MainClass 訂好了該施作的 interface，然後生成 xxxMainClass，
