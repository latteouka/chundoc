# Ray Marching

## Resources

[https://iquilezles.org](https://iquilezles.org/articles)

Inigo Quilez 的 Live Coding 影片解釋很多數學，跟著看可以學到很多
[LIVE Coding "Happy Jumping"](https://www.youtube.com/watch?v=Cfe5UQ-1L9Q&t=1784s&ab_channel=InigoQuilez)

[smin](https://iquilezles.org/articles/smin/) function 可以讓 ray marching 兩物體產生融合的效果
為什麼距離帶來變化 live coding 裡面有解釋

[Ray Marching and Signed Distance Functions](https://jamie-wong.com/2016/07/15/ray-marching-signed-distance-functions/)

## SDF

```glsl
// sphere
float sdSphere(vec3 p, float r) {
  return length(p)-r;
}

// box
float sdBox( vec3 p, vec3 b ) {
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}

// mapping
float sdf(vec3 p) {
  return sdSphere(p, 0.4);
}

// need to combine with the mapping function above
// normal
vec3 calcNormal( vec3 p ) // for function f(p) {
    float eps = 0.0001; // or some other value
    vec2 h = vec2(eps,0);
    return normalize( vec3(sdf(p+h.xyy) - sdf(p-h.xyy),
                           sdf(p+h.yxy) - sdf(p-h.yxy),
                           sdf(p+h.yyx) - sdf(p-h.yyx) ) );
}
```

```
// calculate matcap
// https://github.com/hughsk/matcap
// https://github.com/hughsk/matcap/blob/master/matcap.glsl

vec2 matcap(vec3 eye, vec3 normal) {
  vec3 reflected = reflect(eye, normal);
  float m = 2.8284271247461903 * sqrt( reflected.z+1.0 );
  return reflected.xy / m + 0.5;
}
```

```
// rotation 3d
// https://gist.github.com/yiwenl/3f804e80d0930e34a0b33359259b556c

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;

    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
	mat4 m = rotationMatrix(axis, angle);
	return (m * vec4(v, 1.0)).xyz;
}
```
