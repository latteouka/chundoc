import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

const useLenis = () => {
  const lenis = useRef<Lenis | null>(null);
  const animateId = useRef(0);

  useEffect(() => {
    lenis.current = new Lenis({
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      smoothTouch: true,
    });

    function raf(time: number) {
      lenis.current?.raf(time);
      animateId.current = requestAnimationFrame(raf);
    }
    animateId.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animateId.current);
      lenis.current?.destroy();
      lenis.current = null;
    };
  }, []);

  return lenis.current;
};
export default useLenis;
