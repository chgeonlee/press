export default class MapFactory {
  static spotMapMarkerContent = (imgSrc: string) => {
    const el = document.createElement("div");
    el.className = "spot-map-marker";
    el.innerHTML = `<img src="${imgSrc}" alt="map picture" />`;
    return el;
  };
}
