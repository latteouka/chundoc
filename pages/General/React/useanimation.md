## useAnimationFrame hook

```typescript
import { useCallback, useRef, useEffect } from "react";

const useAnimationFrame = (enable: boolean, callback: () => void) => {
  const requestRef = useRef<ReturnType<typeof requestAnimationFrame>>();

  const animate = useCallback(() => {
    callback();
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    if (enable) {
      requestRef.current = requestAnimationFrame(animate);
      return () => {
        if (requestRef.current) {
          return cancelAnimationFrame(requestRef.current);
        }
      };
    }
  }, [enable, animate]);
};

export default useAnimationFrame;
```
