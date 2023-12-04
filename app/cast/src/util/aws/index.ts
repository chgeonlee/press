import Cognito from "./cognito";

export default class AWS {
  private static _instance: AWS;
  public static get instance() {
    return this._instance || (this._instance = new AWS());
  }

  public get cognito() {
    return Cognito.instance;
  }
}
