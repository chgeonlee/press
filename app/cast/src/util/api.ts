import axios, { AxiosInstance } from "axios";
import util from ".";
import { LocalStorageKeys } from "./storage";
import { UserDataContainer } from "../contexts/AuthContenxt";

export default class API {
  private static _instance: API;
  public static get instance() {
    return this._instance || (this._instance = new API());
  }

  private get config() {
    return {
      //baseURL: "https://api.enple.co.kr",
      baseURL: "http://localhost:9000",
      //withCredentials: true,
    };
  }

  _normal: AxiosInstance;
  _secret: AxiosInstance;

  public get normal() {
    if (!this._normal) {
      this._normal = axios.create(this.config);
    }

    return this._normal;
  }

  public async secret() {
    const userData = UserDataContainer.instance;
    const token = userData.idToken;
    if (!token) throw new Error("토큰설정이 되어 있지 않습니다.");

    this._secret = axios.create(this.config);
    this._secret.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return this._secret;
  }
}

function convertToReadableTime(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
