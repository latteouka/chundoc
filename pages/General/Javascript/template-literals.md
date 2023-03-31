---
---

# [js] tagged template literals

## Template literals

```typescript
// styled-component
const Button = styled.button`
  display: inline-block;
  color: white;
`;
```

\`\`叫做 Template literals。

Template literals 其中一個進階形式叫做
[Tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
，他會把除了變數以外的字串拆出來放進 Array（有點像是.split(變數)?），並且可以用直接放在 function 後面免括號當成變數送進去。

先看看：

```typescript
const name = "chun";
const age = 30;

console.log`My name is ${name}, I am ${age} years old.`;
// -> ['My name is ', ', I am ', ' years old.'] 'chun' 30
```

可以看到第一個產出的是 string array，然後依序是${}內的元素，當這樣給 function 時，就能以這樣的順序當作變數處理。

```typescript
const name = "chun";
const age = 30;

const tag = (...args) => {
  console.log(args);
};

tag`My name is ${name}, I am ${age} years old.`;
// -> [Array(3), 'chun', 30]
// Array(3) 的內容就是 ['My name is ', ', I am ', ' years old.']
```

而 styled.button 這樣的形式，從原始碼可以看見 styled.button 其實就是 styled['button']，也能查看完整的 [domElement](https://github.com/styled-components/styled-components/blob/v3.3.3/src/utils/domElements.js) 有哪些。

```typescript
// source code
export default (styledComponent: Function, constructWithOptions: Function) => {
  const styled = (tag: Target) => constructWithOptions(styledComponent, tag);

  // Shorthands for all valid HTML Elements
  domElements.forEach((domElement) => {
    styled[domElement] = styled(domElement);
  });

  return styled;
};
```

透過這樣的語法結構，styled 成為一個製造 component 的工廠，收入我們丟進去的 CSS 內容（包含 props），經過處理後回傳給你結果的 styled-component。
