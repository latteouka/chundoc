### Pick one from array randomly

```typescript
const array = [1, 2, 3, 4, 5];

const randomChoosen = array[Math.floor(Math.random() * array.length)];
```

```typescript filename="lodash.ts"
_.sample(["January", "February", "March"]);

_.sample(["January", "February", "March"], 2);
```

### Fisher-Yates Shuffle

```typescript
// shuffle original array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// return new
function shuffle(array) {
  const temp = [...array];
  for (let i = temp.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }

  return temp;
}
```
