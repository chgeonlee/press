import { useEffect, useState } from "react";
import press from "@/lib";

export enum ViewportEnum {
  MOBILE,
  TABLET,
  LAPTOP,
}

export default function useViewport() {
  const [viewport, setViewport] = useState(ViewportEnum.MOBILE);

  useEffect(() => {
    if (typeof window !== "object") {
      return;
    }

    function handleResize() {
      const { width: w } = press.device.properties;

      if (w <= 612) {
        setViewport(ViewportEnum.MOBILE);
      } else if (w <= 1024) {
        setViewport(ViewportEnum.TABLET);
      } else {
        setViewport(ViewportEnum.LAPTOP);
      }

      return;
    }
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewport;
}
