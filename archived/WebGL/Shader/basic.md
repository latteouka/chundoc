# Basic Template

```
void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
```

```
void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
```

```glsl
#pragma glslify: curlNoise = require(./curlNoise.glsl)

precision mediump float;

varying vec2 vUv;
uniform sampler2D t;
uniform float time;
uniform float distortFactor;

// DEFAULT
// attribute vec3 position;
// attribute vec2 uv;
// uniform mat4 projectionMatrix;
// uniform mat4 modelViewMatrix;

void main() {
	vUv = uv;

  vec3 distortion = vec3(position.x * 2.0, position.y, 1.0)
    * curlNoise(vec3(
          position.x * 0.02 + time * 0.1,
          position.y * 0.008 + time * 0.1,
          (position.x + position.y) * 0.02
          )) * distortFactor;

  vec3 finalPosition = position + distortion;

  vec4 mvPosition = modelViewMatrix * vec4(finalPosition, 1.0);
  gl_PointSize = 1.0;
	gl_Position = projectionMatrix * mvPosition;
}
```

```glsl
precision mediump float;

uniform float time;
varying vec2 vUv;
uniform sampler2D t;
uniform sampler2D t2;
uniform float progress;

void main() {
  vec4 tt = texture2D(t, vUv);
  vec4 tt2 = texture2D(t2, vUv);
  vec4 finalTexture = mix(tt, tt2, progress);
	//gl_FragColor = vec4(vUv, 0.0, 1.0);
	gl_FragColor = normalize(finalTexture);

  if(gl_FragColor.r < 0.1 && gl_FragColor.g < 0.1 && gl_FragColor.b < 0.1) discard;
	//gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}

```
