export default class Util {
  private static _instance: Util;
  public static get instance() {
    return this._instance || (this._instance = new Util());
  }

  //prevent using new Constructor();
  private constructor() {}

  convertToKRW(n: number) {
    if (typeof n !== "number" || isNaN(n)) {
      throw new Error("Invalid input");
    }
    return n.toLocaleString("ko-KR", { style: "currency", currency: "KRW" });
  }
}
