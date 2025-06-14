# dom 與 canvas 同時接收 event

**重點是 share same parent**

Canvas 有可能存在於 dom 的前方或後方，如果在前面的話會擋住後方的內容。

所以指定 Canvas 的 eventSource 至 dom 與 canvas 的 parent div，可讓兩者都接收到 Event

但又為避免 Canvas 擋住 dom 接收，Canvas css 設為 `pointer-event: none;`

```typescript filename="App.tsx"
export default function App() {
  const parentRef = useRef<HTMLDivElement | null>(null);
  return (
    <div ref={parentRef}>
      <div className="dom"></div>

      <div className="canvas-wrapper">
        <Scene eventSource={parentRef} />
      </div>
    </div>
  );
}
```

```typescript filename="Scene.tsx"
export default function App({ ...props }) {
  return (
    <Canvas {...props} className="canvas">
      <directionalLight />
    </Canvas>
  );
}
```

```css filename="App.css
.App {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 5;
  left: 5;
  z-index: 20;
}

.canvas-wrapper {
  width: 100vw;
  height: 100vh;
  position: "fixed";
  z-index: 10;
}

.canvas {
  pointer-events: none;
}
```
