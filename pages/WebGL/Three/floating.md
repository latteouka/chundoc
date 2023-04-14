# 上下漂浮

```typescript
useFrame((state) => {
  const t = state.clock.getElapsedTime();

  ref.current.rotation.set(
    Math.cos(t / 4) / 8,
    Math.sin(t / 4) / 8,
    -0.2 - (1 + Math.sin(t / 1.5)) / 20
  );
  ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
});
```
