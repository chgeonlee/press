import { useEffect, useState } from "react";
import press from "@/lib";
import _ from "lodash";

export enum ViewportEnum {
  MOBILE,
  TABLET,
  LAPTOP,
  WIDE,
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

    function handleViewport() {
      const { width: w } = press.device.properties;
      if (w <= 612) {
        setViewport(ViewportEnum.MOBILE);
      } else if (w <= 1080) {
        setViewport(ViewportEnum.TABLET);
      } else if (w <= 1800) {
        setViewport(ViewportEnum.LAPTOP);
      } else {
        setViewport(ViewportEnum.WIDE);
      }

      return;
    }

    let c = "orientationchange" in window;
    let t = c ? "orientationchange" : "resize";
    window.addEventListener(t, handleViewport);

    handleViewport();

    return () => {
      window.removeEventListener(t, handleViewport);
    };
  }, []);

  return viewport;
}
