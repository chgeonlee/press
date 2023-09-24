import RoomResource from "./room";
import UserResource from "./user";

class Resource {
  private static _instance: Resource;
  public static get instance() {
    return this._instance || (this._instance = new Resource());
  }

  public get room() {
    return RoomResource.instance;
  }

  public get user() {
    return UserResource.instance;
  }
}

export default Resource.instance;
