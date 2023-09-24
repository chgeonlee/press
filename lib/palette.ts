export default class Palette {
  private static _instance: Palette | null = null;

  public static get instance() {
    return this._instance || (this._instance = new Palette());
  }

  // Using readonly for immutability
  public readonly black = "#121212";
  public readonly white = "#ffffff";
  public readonly burgundy = "#450000";
  public readonly cherry = "#880000";
  public readonly fuchsia = "#df0066";
  public readonly azelia = "#a90066";
  public readonly leaf = "#458b00";
  public readonly orange = "#de6600";
  public readonly pig = "#d8c4c4";
  public readonly red = "#c40000";
  public readonly rose = "#fab49a";
  public readonly ruby = "#660000";
  public readonly blue = "#000096";
  public readonly steel = "#454545";
  public readonly fern = "#002800";
  public readonly turquoise = "#00868b";
  public readonly ocean = "#004258";
  public readonly silveralf = "#c0c0ff";
  public readonly mustard = "#daa520";
  public readonly saphire = "#320096";
  public readonly gold = "#a2790d";
  public readonly olive = "#92630a";
  public readonly navy = "#000028";
  public readonly grey = "#e3e4e1";
}
