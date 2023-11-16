import _ from "lodash";
import { useEffect, useState } from "react";
import press from "@/lib";

const Device = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handler = () => {
      const { width: w, height: h } = press.device.properties;
      setWidth(w);
      setHeight(h);
    };
    let c = "orientationchange" in window;
    let t = c ? "orientationchange" : "resize";
    window.addEventListener(t, handler);
    handler();

    return () => {
      window.removeEventListener(t, handler);
    };
  }, []);

  return (
    <div>
      <div> width: {width}</div>
      <div> height: {height}</div>
    </div>
  );
};

export default Device;
