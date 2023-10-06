import press from "@/lib";
import { GlobalEventEnum } from "../constants";
import { getRoomDetail, getRooms } from "../api";
import _ from "lodash";

// Interface defining the structure of Room data.
export interface IRoomData {
  id: string;
  title: string;
  rating: number;
  description: string;
  price: number;
  pricePerUnit: string;
  imgset: string[];
  categories: string[];
}

export interface IReviewData {
  author: string;
  createdAt: string;
  content: string;
}

export interface IRoomDetailData {
  reviews: IReviewData[];
  position: [number, number];
  capacity: number;
}
interface ICategoryInfo {
  rooms: Set<Room>;
  partial: boolean;
  stat: { price: Map<number, number>; rating: Map<number, number> };
}

// Class representing a Room.
// It holds the original data and provides methods to check for modifications.
class Room {
  original: IRoomData;
  _detail: IRoomDetailData | undefined;

  constructor(private data: IRoomData) {
    this.original = _.cloneDeep(data);
  }

  // Checks if the current room data differs from the original data.
  modified(): boolean {
    return !_.isEqual(this.original, this.data);
  }

  get provisonal(): { meta: IRoomData; detail: IRoomDetailData } {
    return { meta: this.data, detail: this.detail };
  }

  set title(t: string) {
    this.data.title = t;
  }

  set rating(r: number) {
    this.data.rating = r;
  }

  set description(d: string) {
    this.data.description = d;
  }

  get price() {
    return this.data.price;
  }

  get rating() {
    return this.data.rating;
  }

  set price(p: number) {
    this.data.price = p;
  }

  get detail() {
    return this._detail;
  }

  set detail(d: IRoomDetailData) {
    this._detail = d;
  }

  // get Detail Room Data
  fetchDetail(refresh: boolean = false) {
    if (refresh == false && this.detail != undefined) {
      return press.wire.fire(
        GlobalEventEnum.FETCHED_ROOM_DETAIL,
        this.original.id,
      );
    } else {
      getRoomDetail(this.original.id)
        .then((data) => {
          this.detail = data.detail;
          press.wire.fire(
            GlobalEventEnum.FETCHED_ROOM_DETAIL,
            this.original.id,
          );
        })
        .catch((error) => {
          console.error("Error fetching rooms", error);
        });
    }
  }
}

// Container class for managing a collection of Room instances.
class Container {
  pool: Map<string, Room> = new Map();
  kmap: Map<string, ICategoryInfo> = new Map();

  filter: {
    price: { beg: number | null; end: number | null };
    rating: { beg: number | null; end: number | null };
  } = {
    price: { beg: null, end: null },
    rating: { beg: null, end: null },
  };

  updateFilter(beg, end, nkey) {
    let trigger = false;

    if (beg !== null && this.filter[nkey].beg != beg) {
      this.filter[nkey].beg = beg;
      trigger = true;
    }

    if (end !== null && this.filter[nkey].end != end) {
      this.filter[nkey].end = end;
      trigger = true;
    }

    if (trigger) {
      press.wire.fire(GlobalEventEnum.UPDATED_ROOM_PRICE_FILTER);
    }
  }

  private add = (
    category: string,
    room: IRoomData,
    partial: boolean = false,
  ): Room => {
    let inst: Room;

    if (this.pool.has(room.id)) {
      inst = this.pool.get(room.id);
    } else {
      inst = new Room(room);
      this.pool.set(room.id, inst);
    }

    const categoryInfo = this.kmap.get(category) || {
      rooms: new Set<Room>(),
      partial: partial,
      stat: { price: new Map(), rating: new Map() },
    };

    if (categoryInfo.partial != partial) {
      categoryInfo.partial = partial;
    }

    const setStat = (nkey, unit) => {
      const p = parseInt(room[nkey] / unit + "") * unit;
      const r = categoryInfo.stat[nkey].get(p);

      if (r) {
        categoryInfo.stat[nkey].set(p, r + 1);
      } else {
        categoryInfo.stat[nkey].set(p, 1);
      }
    };

    setStat("price", 1000);
    setStat("rating", 1);

    categoryInfo.rooms.add(inst);
    this.kmap.set(category, categoryInfo);

    return inst;
  };

  private cutting(room: Room) {
    let result = true;

    Object.keys(this.filter).forEach((nkey) => {
      if (
        this.filter[nkey].beg !== null &&
        this.filter[nkey].beg > room[nkey]
      ) {
        result = false;
      }
      if (
        this.filter[nkey].end !== null &&
        this.filter[nkey].end <= room[nkey]
      ) {
        result = false;
      }
    });

    return result;
  }

  getRangedRoomsByCategory(category: string) {
    return [...this.kmap.get(category).rooms].filter((room) =>
      this.cutting(room),
    );
  }

  // Fetches rooms data. If already fetched (and no force refresh), it triggers an event.
  fetchRoomsByCategory = (category: string, refresh: boolean = false) => {
    if (
      refresh === false &&
      this.kmap.has(category) &&
      this.kmap.get(category).partial === false
    ) {
      return press.wire.fire(GlobalEventEnum.FETCHED_ROOMS_CATEGORY, category);
    } else {
      getRooms(category)
        .then((data) => {
          data.rooms.forEach((room) => this.add(category, room));
          press.wire.fire(GlobalEventEnum.FETCHED_ROOMS_CATEGORY, category);
        })
        .catch((error) => {
          console.error("Error fetching rooms", error);
        });
    }
  };

  fetchRoomByRoomId = (roomId: string, refresh: boolean = false) => {
    if (refresh == false && this.pool.has(roomId)) {
      return press.wire.fire(GlobalEventEnum.FETCHED_ROOM_BY_ID, roomId);
    } else {
      getRoomDetail(roomId).then((data) => {
        data.room.categories.forEach((category) => {
          const room = this.add(category, data.room, true);
          room.detail = data.detail;
          return press.wire.fire(GlobalEventEnum.FETCHED_ROOM_BY_ID, roomId);
        });
      });
    }
  };
}

export default class RoomResource {
  private static _instance: RoomResource;
  public static get instance() {
    return this._instance || (this._instance = new RoomResource());
  }

  _container: Container;
  public get container() {
    return this._container || (this._container = new Container());
  }

  public loaded(category: string) {
    return this.container.kmap.has(category);
  }

  public loadedDetail(roomId: string) {
    return this.container.pool.has(roomId);
  }

  public load(category: string) {
    return this.container.kmap.get(category).rooms;
  }

  public stat(category: string) {
    return this.container.kmap.get(category)?.stat;
  }

  public filter(beg, end, nkey) {
    return this.container.updateFilter(beg, end, nkey);
  }

  public loadFiltered(category: string) {
    return this.container.getRangedRoomsByCategory(category);
  }

  public fetchRoomsByCategory(category: string, refresh: boolean = false) {
    return this.container.fetchRoomsByCategory(category, refresh);
  }

  public fetchRoom(roomId: string, refresh: boolean = false) {
    return this.container.fetchRoomByRoomId(roomId, refresh);
  }

  public getRooms(category: string) {
    return Array.from(this.container.kmap.get(category).rooms);
  }

  public getRoomDetail(roomId: string) {
    return this.container.pool.get(roomId).provisonal;
  }
}
