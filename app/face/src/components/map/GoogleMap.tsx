import React, { useEffect, useRef } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

declare global {
  interface Window {
    initMap: () => void;
    mapInstance: any;
  }
}
const GoogleMapComponent = () => {
  const ref = useRef();
  // Map 초기화 함수
  window.initMap = async function () {
    // mapOptions은 지도를 어떻게 초기화할지에 대한 설정을 포함합니다.
    const mapOptions = {
      zoom: 12,
      center: { lat: 37.5665, lng: 126.978 },
      // 다른 옵션들을 여기에 추가할 수 있습니다.
      mapId: "dc9433c0a29ac92",
    };

    // 지도를 생성하고 지정된 DOM 요소에 지도를 바인딩합니다.
    const map =
      window.mapInstance || new google.maps.Map(ref.current, mapOptions);

    const priceTag = document.createElement("div");
    priceTag.className = "price-tag";
    priceTag.textContent = "$2.5M";
    priceTag.innerHTML = "<div>example</div>";

    const priceTag2 = document.createElement("div");
    priceTag2.className = "price-tag";
    priceTag2.textContent = "$2.6M";

    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      "marker"
    )) as google.maps.MarkerLibrary;

    const n1 = new AdvancedMarkerElement({
      map: map,
      position: { lat: 37.5665, lng: 126.978 },
      content: priceTag,
    });

    const n2 = new AdvancedMarkerElement({
      map: map,
      position: { lat: 37.4665, lng: 126.976 },
      content: priceTag2,
    });

    //@ts-ignore
    new MarkerClusterer({ markers: [n1, n2], map });

    // 마커와 기타 지도 기능들을 여기에 추가할 수 있습니다.
  };

  useEffect(() => {
    // 스크립트 태그 생성

    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA7xnRZgDTOCAUgqpgmfGpwq7xTMUFww1I&callback=initMap&libraries=marker,places&v=beta";
    //script.defer = true;
    document.body.appendChild(script);

    // 스크립트가 로드되고 나면 initMap 함수가 자동으로 호출됩니다.

    return () => {
      // 컴포넌트가 언마운트될 때 스크립트 제거
      document.body.removeChild(script);
    };
  }, []);

  return <div id={"map"} ref={ref} style={{ height: "100%", width: "100%" }} />;
};

export default GoogleMapComponent;
