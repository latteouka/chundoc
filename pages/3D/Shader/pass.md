# postprocessing

這不是用 three.js 的 pass(three/examples/jsm/postprocessing/底下的)

而是 [pmndrs/postprocessing](https://github.com/pmndrs/postprocessing)

這是加入 Custom pass 的方式，如果只會用到預設的可以直接用 [pmndrs/react-postprocessing](https://github.com/pmndrs/react-postprocessing) 裡面的就好

另可參照 Performance 一節了解為什麼他比 threejs 原本的更好(triangle)

```typescript
import { useThree } from "@react-three/fiber";
import WaterPass from "./post/Waterpass";
import GlitchPass from "./post/Glitchpass";

import {
  BlendFunction,
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
} from "postprocessing";
import { useEffect, useRef } from "react";

export default function Effects({ down }) {
  console.log("effects");
  const { gl, scene, camera } = useThree();

  // because I want to change factor when mouse down
  // this one needs to be in useRef
  // props "down" will trigger rerender
  const glithPass = useRef<GlitchPass>(new GlitchPass());
  glithPass.current.factor = down ? 1 : 0;

  useEffect(() => {
    console.log("effects useEffect should only do once");
    const composer = new EffectComposer(gl);

    // passes
    const waterPass = new WaterPass();
    // effects to passes
    const effectPass = new EffectPass(
      camera,
      new BloomEffect({
        blendFunction: BlendFunction.SCREEN,
        intensity: 3,
        luminanceSmoothing: 0.12,
        luminanceThreshold: 0.03,
      })
    );

    // add renderPass first
    composer.addPass(new RenderPass(scene, camera));
    // add passes
    composer.addPass(waterPass);
    composer.addPass(effectPass);
    composer.addPass(glithPass.current);

    requestAnimationFrame(function render() {
      requestAnimationFrame(render);
      composer.render();
    });

    // clean it!
    return () => {
      composer.dispose();
    };
  }, []);

  return null;
}
```
