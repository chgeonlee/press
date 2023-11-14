import { useEffect, useState } from "react";
import press from "@/lib";

export enum ViewportEnum {
  MOBILE,
  TABLET,
  LAPTOP,
}

/**
 * useViewport
 * 기본적으로 크게 3가지의 레이아웃을 가지고, 웹앱을 설계한다. 따라서 해당 hook은 그 경계점에 대한 설정
 */

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
      alert(w);
      return;
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return viewport;
}
