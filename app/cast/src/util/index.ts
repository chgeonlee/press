import API from "./api";
import AWS from "./aws";
import Storage from "./storage";
import Timer from "./timer";
import Tool from "./tool";
//import User from "./user";

class Util {
  private static _instance: Util;
  public static get instance() {
    return this._instance || (this._instance = new Util());
  }

  public get aws() {
    return AWS.instance;
  }

  public get storage() {
    return Storage.instance;
  }

  public get api() {
    return API.instance;
  }

  public get tool() {
    return Tool.instance;
  }

  public get timer() {
    return Timer.instance;
  }
}

const util = Util.instance;

export default util;
