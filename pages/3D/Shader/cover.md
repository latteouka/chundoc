將比例一起傳入 uniform

```typescript {6-13} filename="item.ts"
// function
function getResolution(imageHeight: number, imageWidth: number) {
  const imageAspect = imageHeight / imageWidth;
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

  return { width, height, a1, a2 };
}


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

// for mouse and other element
const { width, height, a1, a2 } = getResolution(1, 1);
// for image
const cover = getResolution(853, 1280);

this._material = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
  uniforms: {
    u_texture: {
      value: TexLoader.instance.get("/img/image.png"),
    },
    u_resolution: {
      value: new THREE.Vector4(width, height, a1, a2),
    },
    u_cover: {
      cover.width,
      cover.height,
      cover.a1,
      cover.a2
    },
  },
});


// resize
protected _resize(): void {
    super._resize();
    this._mesh.scale.set(Func.instance.sw(), Func.instance.sh(), 1);

    const { width, height, a1, a2 } = getResolution(1, 1);
    const cover = getResolution(853, 1280);
    this._material.uniforms.u_resolution.value.set(width, height, a1, a2);
    this._material.uniforms.u_cover.value.set(
      cover.width,
      cover.height,
      cover.a1,
      cover.a2
    );
  }
```

```glsl {9,12-13} filename="frag.glsl"
uniform vec4 u_resolution;
uniform vec2 u_mouse;

varying vec2 v_uv;

void main(void) {
  // for cover images
  // 受圖片比例影響
  vec2 coverUv = (v_uv - vec2(0.5)) * u_cover.zw + vec2(0.5);
  // mouse position也要調整(with height and width)
  // 不受圖片比例影響
  vec2 newUv = (v_uv - vec2(0.5)) * u_resolution.zw + vec2(0.5);
  vec2 mouse = (u_mouse - vec2(0.5)) * u_resolution.zw + vec2(0.5);

  // 如果mouse沒有一起調整的話，出來的會是橢圓
  float mouseDistance = length(newUv - mouse);
  float smoothMouse = smoothstep(0.2, 0.0, mouseDistance);

  // ...
}

```
