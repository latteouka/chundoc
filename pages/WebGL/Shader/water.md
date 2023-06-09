# Underwater pass

**This is a custom pass**

原 [CodeSandbox](https://codesandbox.io/s/github/drcmda/r3fv4/tree/master/)

- Simple underwater shader
- parameters:
  tDiffuse: texture
  time: this should increase with time passing
  distort_speed: how fast you want the distortion effect of water to proceed
  distortion: to what degree will the shader distort the screen
  centerX: the distortion center X coord
  centerY: the distortion center Y coord

- explaination:
  the shader is quite simple
  it chooses a center and start from there make pixels around it to "swell" then "shrink" then "swell"...
  this is of course nothing really similar to underwater scene
  but you can combine several this shaders together to create the effect you need...
  And yes, this shader could be used for something other than underwater effect, for example, magnifier effect :)

- @author vergil Wang

改為 typescript class，繼承 postprocessing 的 Pass

```typescript
import { ShaderMaterial, UniformsUtils, IUniform, Vector2 } from "three";
import { Pass } from "postprocessing";

const WaterShader = {
  uniforms: {
    byp: { value: 0 }, //apply the glitch ?
    water_texture: { type: "t", value: null },
    time: { type: "f", value: 0.0 },
    factor: { type: "f", value: 0.0 },
    resolution: { type: "v2", value: null },
  },

  vertexShader: `varying vec2 vUv;
    void main(){
      vUv = uv;
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition;
    }`,

  fragmentShader: `uniform int byp; //should we apply the glitch ?
    uniform float time;
    uniform float factor;
    uniform vec2 resolution;
    uniform sampler2D water_texture;

    varying vec2 vUv;

    void main() {
      if (byp<1) {
        vec2 uv1 = vUv;
        vec2 uv = gl_FragCoord.xy/resolution.xy;
        float frequency = 6.0;
        float amplitude = 0.015 * factor;
        float x = uv1.y * frequency + time * .7;
        float y = uv1.x * frequency + time * .3;
        uv1.x += cos(x+y) * amplitude * cos(y);
        uv1.y += sin(x-y) * amplitude * cos(y);
        vec4 rgba = texture2D(water_texture, uv1);
        gl_FragColor = rgba;
      } else {
        gl_FragColor = texture2D(water_texture, vUv);
      }
    }`,
};

export default class WaterPass extends Pass {
  uniforms: { [key: string]: IUniform<any> };
  material: ShaderMaterial;
  quad: THREE.Mesh;
  factor: number;
  time: number;
  clear: boolean;

  constructor(dt_size?: number) {
    super();
    var shader = WaterShader;
    this.uniforms = UniformsUtils.clone(shader.uniforms);
    if (dt_size === undefined) dt_size = 64;
    this.uniforms["resolution"].value = new Vector2(dt_size, dt_size);
    this.fullscreenMaterial = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
    });
    this.factor = 1.5;
    this.time = 0;
  }

  render(renderer, inputBuffer, outputBuffer, deltaTime) {
    const factor = Math.max(0, this.factor);
    this.uniforms["byp"].value = factor ? 0 : 1;
    this.uniforms["water_texture"].value = inputBuffer.texture;
    this.uniforms["time"].value = this.time;
    this.uniforms["factor"].value = this.factor;
    this.time += 0.05;
    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      renderer.render(this.scene, this.camera);
    } else {
      renderer.setRenderTarget(outputBuffer);
      if (this.clear) renderer.clear();
      renderer.render(this.scene, this.camera);
    }
  }
}
```
