import { GlobalEventEnum } from "./constants";
import Wire from "./wire";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

declare global {
  interface Window {
    mapInit: () => void;
  }
}

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

class MapFactory {
  static spotMapMarkerContent = (imgSrc: string, message: string) => {
    const el = document.createElement("div");
    el.className = "spot-map-marker-wrapper";
    el.innerHTML = `
      <div class='bubble-wrapper'>
        <div class='bubble'>
          ${message}
        </div>
      </div>
      <div class='spot-map-marker'>
        <img src="${imgSrc}" alt="map picture" />
      </div>
    `;
    return el;
  };
}

class MapContainer {
  private _mapInstance;
  private _mapElement;
  private _markerElement;
  private _markerList = [];
  private _script = null;
  private _mounted = false;
  private _loading = false;

  constructor() {}

  create = () => {
    if (this._loading) return;
    this._loading = true;
    if (this._mounted == false) {
      this._script = document.createElement("script");
      const apiKey = "AIzaSyA7xnRZgDTOCAUgqpgmfGpwq7xTMUFww1I";
      this._script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=mapInit&libraries=marker&v=beta`;
      this._script.defer = true;
      document.body.appendChild(this._script);
      console.log("created");
      this._loading = false;
    } else {
      this.init();
    }
  };

  markers = async (data) => {
    if (this._mapInstance == null) return;

    if (this._markerList.length) {
      this._markerList.map((item) => {
        // clean
      });
    }

    if (this._markerElement == null) {
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;
      this._markerElement = AdvancedMarkerElement;
    }

    const nset = [];

    for (const [ndx, item] of data.entries()) {
      const component = new this._markerElement({
        map: this._mapInstance,
        position: item.geolocation,
        content: MapFactory.spotMapMarkerContent(
          item.imgSrc,
          TEMP[ndx % TEMP.length]
        ),
      });

      const el = component.element as HTMLElement;
      const handler = (e: MouseEvent) => {
        //setSelectedSpot(spot);
        e.stopPropagation();
      };
      ["gmp-click", "touchstart"].forEach((e) => {
        el.addEventListener(e, handler);
      });

      this._markerList.push({
        marker: component,
        listener: handler,
      });

      nset.push(component);
    }

    new MarkerClusterer({
      markers: nset,
      map: this._mapInstance,
    });
  };

  init = async () => {
    if (this._mapInstance) {
      return Wire.instance.fire(GlobalEventEnum.MOUNTED_MAP, undefined);
    }

    const isMobile = (() => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    })();

    this._mapElement = document.createElement("div");
    this._mapElement.style.width = "100%";
    this._mapElement.style.height = "100%";

    this._mapInstance = new google.maps.Map(this._mapElement, {
      zoom: 4,
      center: {
        lat: 37.498095,
        lng: 127.02761,
      },
      mapId: "5fb94fb03365ceb1",
      disableDefaultUI: true,
      gestureHandling: isMobile ? "greedy" : "cooperative",
    });

    if (isMobile) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (p) => {
            this._mapInstance.setCenter({
              lat: p.coords.latitude,
              lng: p.coords.longitude,
            });
          },
          () => {}
        );
      }
    }

    Wire.instance.fire(GlobalEventEnum.MOUNTED_MAP, undefined);
    this._mounted = true;
  };

  getElement() {
    return this._mapElement;
  }

  getInstance() {
    return this._mapInstance;
  }
}

class MapComponent {
  private static _instance: MapComponent;
  public static get instance() {
    return this._instance || (this._instance = new MapComponent());
  }

  public container;
  private constructor() {
    this.container = new MapContainer();
  }

  public getElement() {
    return this.container.getElement();
  }

  public getInstance() {
    return this.container.getInstance();
  }

  public drawMarker(data) {
    return this.container.markers(data);
  }

  public create() {
    this.container.create();
  }
}

window.mapInit = MapComponent.instance.container.init;

export default MapComponent.instance;
