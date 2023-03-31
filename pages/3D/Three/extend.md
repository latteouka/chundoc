# Extend type

```
可以用
Node
Object3DNode
BufferGeometryNode
MaterialNode
LightNode
```

```typescript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: ReactThreeFiber.BufferGeometryNode<
        MeshLineGeometry,
        typeof MeshLineGeometry
      >;
    }
  }
}

// r3f officail site code
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
extend({ MeshLineGeometry, MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: BufferGeometryNode<
      MeshLineGeometry,
      typeof MeshLineGeometry
    >;
    meshLineMaterial: MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>;
  }
}

// Drei: shaderMaterial

// https://stackoverflow.com/questions/62059408/reactjs-and-typescript-refers-to-a-value-but-is-being-used-as-a-type-here-ts
// class MyClass {}
// let abc: MyClass; // ts recognizes as instance type
// abc = new MyClass(); // completely fine, used here as the javascript value

// import {MyClass} from './myclass';
// let abc: MyClass; // TypeScript error TS2749

// import {MyClass} from './myclass';
// let abc: InstanceType<typeof MyClass>; // no error

declare module "@react-three/fiber" {
  interface ThreeElements {
    displaceMaterial: MaterialNode<
      InstanceType<typeof DisplaceMaterial>,
      typeof DisplaceMaterial
    >;
  }
}
```
