# Digital Glitch

```
/**
 * @author alteredq / http://alteredqualia.com/
 */

/**
 * @author felixturner / http://airtight.cc/
 *
 * RGB Shift Shader
 * Shifts red and blue channels from center in opposite directions
 * Ported from http://kriss.cx/tom/2009/05/rgb-shift/
 * by Tom Butterworth / http://kriss.cx/tom/
 *
 * amount: shift distance (1 is width of input)
 * angle: shift angle in radians
 */

```

改為 typescript class，繼承 postprocessing 的 Pass

```typescript
import {
  DataTexture,
  FloatType,
  MathUtils as _Math,
  RGBAFormat,
  IUniform,
  ShaderMaterial,
  UniformsUtils,
} from "three";
import { Pass } from "postprocessing";

const DigitalGlitchShader = {
  uniforms: {
    tDiffuse: { value: null }, //diffuse texture
    tDisp: { value: null }, //displacement texture for digital glitch squares
    byp: { value: 0 }, //apply the glitch ?
    amount: { value: 0.08 },
    angle: { value: 0.02 },
    seed: { value: 0.02 },
    seed_x: { value: 0.02 }, //-1,1
    seed_y: { value: 0.02 }, //-1,1
    distortion_x: { value: 0.5 },
    distortion_y: { value: 0.6 },
    col_s: { value: 0.05 },
  },

  vertexShader: `varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,

  fragmentShader: `uniform int byp; //should we apply the glitch
    uniform sampler2D tDiffuse;
    uniform sampler2D tDisp;
    uniform float amount;
    uniform float angle;
    uniform float seed;
    uniform float seed_x;
    uniform float seed_y;
    uniform float distortion_x;
    uniform float distortion_y;
    uniform float col_s;
    varying vec2 vUv;
    float rand(vec2 co){
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }
    void main() {
      if(byp<1) {
        vec2 p = vUv;
        float xs = floor(gl_FragCoord.x / 0.5);
        float ys = floor(gl_FragCoord.y / 0.5);
        //based on staffantans glitch shader for unity https://github.com/staffantan/unityglitch
        vec4 normal = texture2D (tDisp, p*seed*seed);
        if(p.y<distortion_x+col_s && p.y>distortion_x-col_s*seed) {
          if(seed_x>0.){
            p.y = 1. - (p.y + distortion_y);
          }
          else {
            p.y = distortion_y;
          }
        }
        p.x+=normal.x*seed_x*(seed/5.);
        p.y+=normal.y*seed_y*(seed/5.);
        //base from RGB shift shader
        vec2 offset = amount * vec2( cos(angle), sin(angle));
        vec4 cr = texture2D(tDiffuse, p + offset);
        vec4 cga = texture2D(tDiffuse, p);
        vec4 cb = texture2D(tDiffuse, p - offset);
        gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);
      }
      else {
        gl_FragColor=texture2D (tDiffuse, vUv);
      }
    }`,
};

export default class GlitchPass extends Pass {
  uniforms: { [key: string]: IUniform<any> };
  material: ShaderMaterial;
  quad: THREE.Mesh;
  factor: number;
  time: number;
  clear: boolean;

  constructor(dt_size?: number) {
    super();
    var shader = DigitalGlitchShader;
    this.uniforms = UniformsUtils.clone(shader.uniforms);
    if (dt_size === undefined) dt_size = 64;
    this.uniforms["tDisp"].value = this.generateHeightmap(dt_size);
    this.fullscreenMaterial = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
    });
    this.factor = 0.5;
  }

  render(renderer, inputBuffer, outputBuffer, deltaTime) {
    const factor = Math.max(0, this.factor);
    this.uniforms["tDiffuse"].value = inputBuffer.texture;
    this.uniforms["seed"].value = Math.random() * factor; //default seeding
    this.uniforms["byp"].value = 0;
    if (factor) {
      this.uniforms["amount"].value = (Math.random() / 90) * factor;
      this.uniforms["angle"].value =
        _Math.randFloat(-Math.PI, Math.PI) * factor;
      this.uniforms["distortion_x"].value = _Math.randFloat(0, 1) * factor;
      this.uniforms["distortion_y"].value = _Math.randFloat(0, 1) * factor;
      this.uniforms["seed_x"].value = _Math.randFloat(-0.3, 0.3) * factor;
      this.uniforms["seed_y"].value = _Math.randFloat(-0.3, 0.3) * factor;
    } else this.uniforms["byp"].value = 1;
    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      renderer.render(this.scene, this.camera);
    } else {
      renderer.setRenderTarget(outputBuffer);
      if (this.clear) renderer.clear();
      renderer.render(this.scene, this.camera);
    }
  }

  generateHeightmap(dt_size: number) {
    var data_arr = new Float32Array(dt_size * dt_size * 3);
    var length = dt_size * dt_size;

    for (var i = 0; i < length; i++) {
      var val = _Math.randFloat(0, 1);
      data_arr[i * 3 + 0] = val;
      data_arr[i * 3 + 1] = val;
      data_arr[i * 3 + 2] = val;
    }

    var texture = new DataTexture(
      data_arr,
      dt_size,
      dt_size,
      RGBAFormat,
      FloatType
    );
    texture.needsUpdate = true;
    return texture;
  }
}

export { GlitchPass };
```
