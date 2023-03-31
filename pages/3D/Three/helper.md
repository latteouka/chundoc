# helpers, controls

### Grid, Axes

```jsx
<Canvas>
  {/* size, division, centerLineColor, gridColor */}
  <gridHelper args={[10, 10, "blue", "red"]} />

  {/* size */}
  <axesHelper args={[10]} />

  <planeHelper args={[plane, 5, 0xff0000]} />

  <OrbitControls minZoom={10} maxZoom={50} enabled={true} />
</Canvas>
```

### Light Helper

```typescript
const Lights = () => {
  const light = useRef();
  useHelper(light, SpotLightHelper);
  return (
    <group>
      <ambientLight />
      <spotLight ref={light} position={[50, 40, 40]} castShadow />
    </group>
  );
};
```
