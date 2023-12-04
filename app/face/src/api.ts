import axios, { AxiosInstance } from "axios";
import { IRoomData, IRoomDetailData } from "./resources/room";
import { CreatorRoomsData, PartyRoomsData, PracRoomsData } from "./fixture";

class API {
  private static _object: API;
  public static get object() {
    return this._object || (this._object = new API());
  }
  private _instance: AxiosInstance;
  private _instanceWithSecret: AxiosInstance;

  constructor() {
    const spec = {
      baseURL:
        process.env.NODE_ENV === "development"
          ? "http://127.0.0.1:8000/api/v1/"
          : undefined,
      withCredentials: true,
    };
    this._instance = axios.create(spec);
    this._instanceWithSecret = axios.create(spec);
    this._instanceWithSecret.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("your_token_key");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public get instance() {
    return this._instance;
  }

  public get instanceWithSecret() {
    return this._instanceWithSecret;
  }
}

const api = API.object;

// export const getRooms = (category: string): Promise<{ rooms: IRoomData[] }> => {
//   if (process.env.USE_MOCK_DATA) {
//     return new Promise((resolve) => {
//       resolve({
//         rooms:
//           category === "practice"
//             ? PracRoomsData
//             : category === "party"
//             ? PartyRoomsData
//             : CreatorRoomsData,
//       });
//     });
//   } else {
//     return api.instance.get("rooms/").then((response) => response.data);
//   }
// };

// export const getRoomDetail = (
//   roomId: string
// ): Promise<{ room: IRoomData; detail: IRoomDetailData }> => {
//   if (process.env.USE_MOCK_DATA) {
//     return new Promise((resolve) => {
//       const nset = [...PracRoomsData, ...PartyRoomsData, ...CreatorRoomsData];
//       const item = nset.find((item) => item.id == roomId);

//       resolve({
//         room: item,
//         detail: {
//           reviews: [],
//           position: [0, 0],
//           capacity: 3,
//         },
//       });
//     });
//   } else {
//     return API.instance
//       .get(`rooms/${roomId}`)
//       .then((response) => response.data);
//   }
// };
