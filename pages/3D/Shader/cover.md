將比例一起傳入 uniform

```typescript {5-12} filename="item.ts"
// height / width
const imageAspect = 900 / 1600;
const width = Func.instance.sw();
const height = Func.instance.sh();
let a1, a2;
if (height / width > imageAspect) {
  a1 = (width / height) * imageAspect;
  a2 = 1;
} else {
  a1 = 1;
  a2 = height / width / imageAspect;
}

// material
const material = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
  uniforms: {
    u_texture: {
      value: TexLoader.instance.get("/img/image.png"),
    },
    u_resolution: {
      value: new THREE.Vector4(width, height, a1, a2),
    },
  },
});


// resize
protected _resize(): void {
    super._resize();
    this._mesh.scale.set(Func.instance.sw(), Func.instance.sh(), 1);

    const imageAspect = 900 / 1600;
    const width = Func.instance.sw();
    const height = Func.instance.sh();
    let a1, a2;
    if (height / width > imageAspect) {
      a1 = (width / height) * imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = height / width / imageAspect;
    }
    const material = this._mesh.material as THREE.ShaderMaterial;
    material.uniforms.u_resolution.value.set(width, height, a1, a2);
  }
```

```glsl {8,9} filename="frag.glsl"
uniform vec4 u_resolution;
uniform vec2 u_mouse;

varying vec2 vUv;

void main(void) {
  // mouse position也要調整
  vec2 newUv = (vUv - vec2(0.5)) * u_resolution.zw + vec2(0.5);
  vec2 mouse = (u_mouse - vec2(0.5)) * u_resolution.zw + vec2(0.5);

  // 如果mouse沒有一起調整的話，出來的會是橢圓
  float mouseDistance = length(newUv - mouse);
  float smoothMouse = smoothstep(0.2, 0.0, mouseDistance);

  // ...
}

```
