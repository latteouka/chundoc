## Resource

https://learnopengl.com/Lighting/Basic-Lighting

https://www.youtube.com/watch?v=LKXAIuCaKAQ&ab_channel=SuboptimalEngineer

計算光到 position 的向量（要 varying 到 fragment，所以計算到 view）

```glsl filename="vert.glsl"
uniform vec3 u_lightPos;

vec3 mv = vec3(modelViewMatrix * vec4(position, 1.0));
vec3 worldLightPos = vec3(viewMatrix * vec4(u_lightPos, 1.0));

vSurfaceToLight = normalize(worldLightPos - mv);
```

```glsl filename="frag.glsl"
uniform vec3 u_color;
uniform vec3 u_lightColor;
varying vec3 vSurfaceToLight;

// 這是diffuse直接乘上內積
// 也可以分別對ambient跟diffuse做不同強度的調整
vec3 light_reflection(vec3 lightColor) {
  vec3 ambient = lightColor;
  vec3 diffuse = lightColor * dot(vSurfaceToLight, vNormal);

  return (ambient + diffuse);
}

void main(void) {
  vec3 light_value = light_reflection(u_lightColor);

  light_value *= 0.5;

  gl_FragColor = vec4(light_value, 1.0);
}
```
