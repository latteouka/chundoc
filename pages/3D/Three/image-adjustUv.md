Adjust image texture's uv

## ts

用 Vector4 的用意是拿沒有用到的 z 跟 w 來存放比例，這比例會在 shader 中對 x, y 乘上用。

```typescript {21} filename="item.ts"
const imageAspect = 853 / 1280;

// retrieve width and height of the container
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

// ...
const material = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
  uniforms: {
    u_resolution: {
      value: new THREE.Vector4(width, height, a1, a2),
    },
  },
});
```

## shader

```glsl {5} filename="fragment.glsl"
uniform vec4 u_resolution;
varying vec2 vUv;

void main(void) {
  vec2 newUv = (vUv - vec2(0.5)) * u_resolution.zw + vec2(0.5);

  vec4 color = texture2D(u_texture, newUv);
  gl_FragColor = color;
}
```
