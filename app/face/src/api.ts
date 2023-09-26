import axios from "axios";
import { IRoomData, IRoomDetailData } from "./resources/room";
import { CreatorRoomsData, PartyRoomsData, PracRoomsData } from "./fixture";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://127.0.0.1:8000/api/v1/"
      : undefined, // server 미구현
  withCredentials: true,
});

export const getRooms = (category: string): Promise<{ rooms: IRoomData[] }> => {
  if (process.env.USE_MOCK_DATA) {
    return new Promise((resolve) => {
      resolve({
        rooms:
          category === "practice"
            ? PracRoomsData
            : category === "party"
            ? PartyRoomsData
            : CreatorRoomsData,
      });
    });
  } else {
    return instance.get("rooms/").then((response) => response.data);
  }
};

export const getRoomDetail = (
  roomId: string,
): Promise<{ room: IRoomData; detail: IRoomDetailData }> => {
  if (process.env.USE_MOCK_DATA) {
    return new Promise((resolve) => {
      const nset = [...PracRoomsData, ...PartyRoomsData, ...CreatorRoomsData];
      const item = nset.find((item) => item.id == roomId);

      resolve({
        room: item,
        detail: {
          reviews: [],
          position: [0, 0],
          capacity: 3,
        },
      });
    });
  } else {
    return instance.get(`rooms/${roomId}`).then((response) => response.data);
  }
};
