export default class Device {
  private static _instance: Device;
  public static get instance() {
    return this._instance || (this._instance = new Device());
  }

  //prevent using new Constructor();
  private constructor() {}

  public getOS() {
    const agent = window.navigator.userAgent;

    if (/Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh/.test(agent)) {
      return "MacOS";
    } else if (/Windows|Win16|Win32|Win64|WinCE/.test(agent)) {
      return "Windows";
    } else if (/Android/.test(agent)) {
      return "Android";
    } else if (/Linux/.test(agent)) {
      return "Linux";
    } else if (/iPhone|iPad|iPod/.test(agent)) {
      return "iOS";
    } else {
      return "Unknown";
    }
  }

  public get properties() {
    const isClient = typeof window === "object";

    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
      screenWidth: isClient ? window.screen.width : undefined,
      screenHeight: isClient ? window.screen.height : undefined,
      portrait: isClient
        ? window.matchMedia("(orientation: portrait)").matches
        : undefined,
      landscape: isClient
        ? window.matchMedia("(orientation: landscape)").matches
        : undefined,
    };
  }
}
