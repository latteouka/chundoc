# gesture + spring

```typescript
import { useDrag } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { atom, useAtom } from "jotai";

export const posAtom = atom([0, 1.5, 0]);
export const pos2Atom = atom([0, 0.05, 0]);

function Obj() {
  const [pos, setPos] = useAtom(posAtom);

  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  let planeIntersectPoint = new THREE.Vector3();

  const [spring, api]: any = useSpring(() => ({
    position: pos,
    scale: 1,
    rotation: [0, 0, 0],
    config: { friction: 10 },
  }));

  const bind = useDrag<THREE.Event>(
    ({ active, movement: [x, y], timeStamp, event }) => {
      if (active) {
        // store intersect result into planeIntersectPoint
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        setPos([
          Math.floor(planeIntersectPoint.x) + 0.5,
          1.5,
          Math.floor(planeIntersectPoint.z) + 0.5,
        ]);
      }

      api.start({
        // back to 0,0,0
        // position: active ? [x / aspect, -y / aspect, 0] : [0, 0, 0],
        position: pos,
        scale: active ? 1.2 : 1,
        rotation: [y / aspect, x / aspect, 0],
      });

      return timeStamp;
    },
    { delay: true }
  );

  return (
    <>
      <animated.mesh {...spring} {...bind()} castShadow>
        <dodecahedronGeometry args={[1.2, 0]} />
        <meshNormalMaterial />
      </animated.mesh>
    </>
  );
}

export default Obj;
```
