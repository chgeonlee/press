import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useEffect, useRef, useState } from "react";
import MapFactory from "./factory";
import Text, { TextSizeEnum, TextWeightEnum } from "../Text";
import { PlainButton } from "../button/PlainButton";
import useViewport, { ViewportEnum } from "../../hooks/useViewport";
import { useOutsideClick } from "../../hooks/useOutsideClick";
declare global {
  interface Window {
    initSpotMap: () => void;
  }
}

interface ISpotProps {
  title?: string;
  overview?: string;
  geolocation: { lat: number; lng: number };
  imgSrc: string;
}

interface ISpotMapProps {
  center: {
    lat: number;
    lng: number;
  };
  spots: ISpotProps[];
}

const SpotMap = ({ center, spots }: ISpotMapProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map>(null);
  const markersRef = useRef<any[]>([]);
  const viewport = useViewport();
  const [selectedSpot, setSelectedSpot] = useState<ISpotProps>(null);
  // google map 초기화 콜백함수
  const TEMP = [
    "여기 불났음!!",
    "비상 초비상!!!!",
    "심심하다",
    "집에 보내주겠니",
    "배고픈데 밥먹을곳을 찾습니다.",
    "춘식이춘식이",
    "퇴근하고싶다.",
    "여긴 어디 나는 누구 너는 누구 허허허허허",
    "고구마 팔아요 감자도 팔아요",
    "치킨 팟 구함",
    "테스트케이스인데 너무쓰는거 아닌가",
    "집나간 춘식이 찾아요",
    "돌아와 춘식아",
    "고구마 사줄게 춘식아",
    "여기서 춘식이 봄",
  ];

  window.initSpotMap = async () => {
    // map 의 min, max는 map의 type에 따라 달라질수 있다.
    mapRef.current = new google.maps.Map(componentRef.current, {
      zoom: 15,
      minZoom: 9,
      center: center,
      mapId: "5fb94fb03365ceb1",
      disableDefaultUI: true, // 이 줄을 추가하여 기본 UI를 비활성화합니다.
      gestureHandling:
        viewport == (ViewportEnum.MOBILE || ViewportEnum.TABLET)
          ? "greedy"
          : "cooperative",
    });
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      "marker"
    )) as google.maps.MarkerLibrary;

    new MarkerClusterer({
      markers: spots.map((spot, ndx) => {
        const component = new AdvancedMarkerElement({
          map: mapRef.current,
          position: spot.geolocation,
          content: MapFactory.spotMapMarkerContent(spot.imgSrc, TEMP[ndx % 6]),
        });

        const el = component.element as HTMLElement;
        const handler = (e: MouseEvent) => {
          setSelectedSpot(spot);
          e.stopPropagation();
        };
        ["click", "touchstart"].forEach((e) => {
          el.addEventListener(e, handler);
        });

        markersRef.current.push({ marker: component, listener: handler });

        return component;
      }),
      map: mapRef.current,
    });
  };

  useEffect(() => {
    const resize = () => {
      const ratio = viewport == ViewportEnum.MOBILE ? 1 : 0.5;
      const r = wrapperRef.current.getBoundingClientRect();
      wrapperRef.current.style.setProperty("height", r.width * ratio + "px");
    };

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [viewport]);

  /***
   * comment
   */
  useEffect(() => {
    function handleClickOutside(event) {
      setSelectedSpot(null);
    }

    if (window.google) {
      window.initSpotMap();
    } else {
      const script = document.createElement("script");
      const apiKey = "AIzaSyA7xnRZgDTOCAUgqpgmfGpwq7xTMUFww1I";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initSpotMap&libraries=marker&v=beta`;
      script.defer = true;
      document.body.appendChild(script);

      if (componentRef.current) {
        componentRef.current.addEventListener("click", handleClickOutside);
      }
    }

    return () => {
      //document.body.removeChild(script);
      markersRef.current = [];

      if (componentRef.current) {
        componentRef.current.removeEventListener("click", handleClickOutside);
      }

      if (mapRef.current) {
        google.maps.event.clearInstanceListeners(mapRef.current);
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} className="spot-map-wrapper">
      <div ref={componentRef} className="spot-map-component" />
      {selectedSpot && <SpotMapModal data={selectedSpot} />}
    </div>
  );
};

const SpotMapModal = ({ data }) => {
  const ref = useRef<HTMLDivElement>();
  const imgref = useRef<HTMLImageElement>();

  useEffect(() => {
    const resize = () => {
      if (imgref.current == null) return;

      const r = ref.current.getBoundingClientRect();
      const h = r.height * 0.5;

      imgref.current.style.setProperty("height", h + "px");
    };
    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="spot-map-info" ref={ref}>
      <div ref={imgref} style={{ overflow: "hidden", width: "100%" }}>
        <img
          src={data.imgSrc}
          style={{ width: "100%", objectFit: "cover", height: "100%" }}
        />
      </div>
      <div className="info-head">
        <Text size={TextSizeEnum.LG} weight={TextWeightEnum.BOLD}>
          {data.title}
        </Text>
      </div>
      <div className="info-body">
        <Text>{data.overview}</Text>
      </div>
      <div className="info-foot">
        <PlainButton
          fnClick={() => {}}
          value="자세히"
          rounded={true}
        ></PlainButton>
      </div>
    </div>
  );
};

export default SpotMap;
