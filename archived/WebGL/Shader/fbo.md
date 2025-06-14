# FBO(Frame Buffer Object)

## Resources

[FBO particles](https://barradeau.com/blog/?p=621)

[threejs birds example](https://threejs.org/examples/webgl_gpgpu_birds.html)

[epranka/gpucomputationrender-three](https://github.com/epranka/gpucomputationrender-three)

## Basic Usage from yomboprime

[yomboprime/GPGPU-threejs-demos](https://github.com/yomboprime/GPGPU-threejs-demos/blob/gh-pages/js/GPUComputationRenderer.js)

```typescript
// Initialization...

// Create computation renderer
var gpuCompute = new GPUComputationRenderer(1024, 1024, renderer);

// Create initial state float textures
var pos0 = gpuCompute.createTexture();
var vel0 = gpuCompute.createTexture();

// and fill in here the texture data...
// Add texture variables
var velVar = gpuCompute.addVariable("textureVelocity", fragmentShaderVel, pos0);
var posVar = gpuCompute.addVariable("texturePosition", fragmentShaderPos, vel0);

// Add variable dependencies
gpuCompute.setVariableDependencies(velVar, [velVar, posVar]);
gpuCompute.setVariableDependencies(posVar, [velVar, posVar]);

// Add custom uniforms
velVar.material.uniforms.time = { value: 0.0 };

// Check for completeness
var error = gpuCompute.init();

if (error !== null) {
  console.error(error);
}

// In each frame...

// Compute!
gpuCompute.compute();

// Update texture uniforms in your visualization materials with the gpu renderer output
myMaterial.uniforms.myTexture.value =
  gpuCompute.getCurrentRenderTarget(posVar).texture;

// Do your rendering
renderer.render(myScene, myCamera);
```
