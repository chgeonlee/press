// import press from "@/lib";
// import { GlobalEventEnum } from "../../../../lib/constants";
// import util from ".";
// import { LocalStorageKeys } from "./storage";

// export default class User {
//   private static _instance: User;
//   public static get instance() {
//     return this._instance || (this._instance = new User());
//   }

//   private _config = null;
//   private set config(obj) {
//     this._config = obj;
//     press.wire.fire(GlobalEventEnum.CHANGED_USER_CONFIG);
//   }
//   public login(userName, token, thumbnail = null) {
//     util.storage.local.set(LocalStorageKeys.API_SERVICE_TOKEN_NAME, token);
//     this.config = {
//       userName,
//       token,
//       thumbnail,
//     };
//   }

//   public isLoggedIn() {
//     return this.config !== null && this.config.token !== null;
//   }

//   public logout() {
//     util.storage.local.remove(LocalStorageKeys.API_SERVICE_TOKEN_NAME);
//     this.config = null;
//   }

//   public get config() {
//     return this._config;
//   }
// }
