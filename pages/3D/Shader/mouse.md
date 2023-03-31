![coordinate](/img/coordinate-system.jpeg)
要給 vertex shader 計算的話，以畫面為中心，不用 normalize。

```typescript
protected _update(): void {
  super._update();

  const material = this._mesh.material as THREE.ShaderMaterial;

  // 這裡是vector3是因為用滑鼠當light position
  // 然後在vertex這裡跟position做別的計算
  material.uniforms.u_mouse.value.set(
    MousePointer.instance.x - Func.instance.sw() / 2,
    -MousePointer.instance.y + Func.instance.sh() / 2,
    0
  );
}
```

直接要用在 fragment 的話，要正規化，而且 (0, 0) 是螢幕左下角。

```typescript
protected _update(): void {
  super._update();

  const material = this._mesh.material as THREE.ShaderMaterial;

  // 原本是螢幕中心為 (0, 0)
  // (-1, 1)     (1, 1)
  // (-1, -1)    (1, -1)
  // ↓
  // (0, 1)      (1, 1)
  // (0, 0)      (1, 0)
  material.uniforms.u_mouse.value.set(
    (MousePointer.instance.normal.x + 1) / 2,
    (-MousePointer.instance.normal.y + 1) / 2
  );
}
```
