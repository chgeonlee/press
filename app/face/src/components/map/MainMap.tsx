import { useCallback, useEffect, useRef, useState } from "react";
import press from "@/lib";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import MapFactory from "./factory";
import { SPOTS } from "../../fixture";
import { GlobalEventEnum } from "../../constants";

const MainMap = ({ spots }) => {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (containerRef.current == null) return;

    const handler = () => {
      containerRef.current.appendChild(press.map.getElement());
      setMounted(true);
    };

    window.addEventListener("re" + GlobalEventEnum.MOUNTED_MAP, handler);

    return () => {
      window.removeEventListener("re" + GlobalEventEnum.MOUNTED_MAP, handler);
    };
  }, [containerRef.current]);

  useEffect(() => {
    if (mounted == false) return;

    press.map.drawMarker(spots);
  }, [mounted, spots]);

  return (
    <div style={{ width: "100%", height: "100%" }} className="spot-map-wrapper">
      <div className="spot-map-component" ref={containerRef}></div>
    </div>
  );
};

export default MainMap;
