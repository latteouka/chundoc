# Predefined uniform/attribute

```
// https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram

//
// Vertex Shader
//

// = object.matrixWorld
uniform mat4 modelMatrix;

// = camera.matrixWorldInverse * object.matrixWorld
uniform mat4 modelViewMatrix;

// = camera.projectionMatrix
uniform mat4 projectionMatrix;

// = camera.matrixWorldInverse
uniform mat4 viewMatrix;

// = inverse transpose of modelViewMatrix
uniform mat3 normalMatrix;

// = camera position in world space
uniform vec3 cameraPosition;

// default vertex attributes provided by BufferGeometry
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// Model maps from an object's local coordinate space into world space,
// view from world space to camera space, projection from camera to screen.
// https://www.youtube.com/watch?v=-tonZsbHty8#aid=P8Xs_WR4zIw&ab_channel=JamieKing
// M: Model to world
// V: World to view
// P: View to projection

gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 );

```

```
#ifdef USE_INSTANCING
	// Note that modelViewMatrix is not set when rendering an instanced model,
	// but can be calculated from viewMatrix * modelMatrix.
	//
	// Basic Usage:
	//   gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);
	attribute mat4 instanceMatrix;
#endif
```

```
//
// Fragment Shader
//

uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
```
