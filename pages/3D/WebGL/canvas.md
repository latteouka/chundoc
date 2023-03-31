# [webgl] Canvas and WebGL

## Canvas API

讓我們可以透過 `Javascript` 在 HTML 中的 `<canvas>` 元素中畫畫。

Canvas API 基本上是讓我們畫 2D 圖，而且性能有限。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Canvas</title>
  </head>
  <body>
    <div id="app"></div>
    // highlight-next-line
    <canvas id="canvas" />
  </body>
</html>
```

## WebGL API

WebGL 就是 Web Graphics Library。

讓我們不用插件透過 Javascript 畫出可互動的 3D 或 2D 畫面，一樣是在 `<canvas>` 中，但 WebGL API 讓我們可以用[硬體加速](https://zh.wikipedia.org/zh-tw/%E7%A1%AC%E4%BB%B6%E5%8A%A0%E9%80%9F)(GPU，也就是處理 shader 的部分)畫 2D 跟 3D。

而 WebGL 底下調用的是 OpenGL ES 2.0 的 interface，可以想成 OpenGL 是實際上請硬體做事畫圖的 API，而 WebGL 是透過 Javascript 去使用 OpenGL，對我們網頁來說為了在 Canvas 上畫 3D 就是使用 WebGL。

## Three.js

three.js 就是再封裝 WebGL API 的框架，讓我們處理 3D 時省下很多工。（像這樣讓我們可以操作 WebGL 的函式庫或框架很多，比如說 babylon.js，可能會看到不同公司主用的函式庫不同）

## 小結

Canvas 如其名就把它當成畫布，可以調用 `Canvas API` 畫 2D 圖，也能用 `WebGL API` 畫 3D 及 2D。

本質上我們在 Canvas 上看到的就是 2D 畫面，只是過程中有了 `Camera` 的概念，從 Model 的位置 -> 世界位置 -> View -> Projection 渲染出來的結果在視覺上讓我們覺得是 3D，以後學了 `Ray Marching` 就會比較懂畫面是怎麼出來的。
