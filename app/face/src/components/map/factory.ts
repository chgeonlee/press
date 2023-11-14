export default class MapFactory {
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
