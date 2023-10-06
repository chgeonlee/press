import { useState, useRef, useEffect } from "react";

type RectResult = {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
};

const useElementRect = <T extends HTMLElement | SVGSVGElement>(): [
  RectResult | null,
  React.RefObject<T>,
] => {
  const ref = useRef<T | null>(null);
  const [rect, setRect] = useState<RectResult | null>(null);

  useEffect(() => {
    const resize = () => {
      if (ref.current) {
        const currentRect = ref.current.getBoundingClientRect();
        setRect({
          width: currentRect.width,
          height: currentRect.height,
          top: currentRect.top,
          left: currentRect.left,
          right: currentRect.right,
          bottom: currentRect.bottom,
        });
      }
    };

    resize();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return [rect, ref];
};

export default useElementRect;
