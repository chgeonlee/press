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

// Class representing a Room.
// It holds the original data and provides methods to check for modifications.
class Room {
  original: IRoomData;
  detail: IRoomDetailData | undefined;

  constructor(private data: IRoomData) {
    this.original = _.cloneDeep(data);
  }

  // Checks if the current room data differs from the original data.
  modified(): boolean {
    return !_.isEqual(this.original, this.data);
  }

  get provisonal(): IRoomData {
    return this.data;
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

  set price(p: number) {
    this.data.price = p;
  }

  // get Detail Room Data
  fetch(refresh: boolean = false) {
    if (refresh == false && this.detail != undefined) {
      return press.wire.fire(
        GlobalEventEnum.FETCHED_ROOM_DETAIL,
        this.original.id,
      );
    } else {
      getRoomDetail(this.original.id)
        .then((data) => {
          this.detail = data;
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
  kmap: Map<string, Set<Room>> = new Map();

  constructor() {

    this.add = this.add.bind(this);
    this.fetch = this.fetch.bind(this);
  }

  private add(category: string, room: IRoomData) {
    let inst: Room;

    if(this.pool.has( room.id ) ) {
      inst = this.pool.get( room.id )
    } else {
      inst = new Room( room );
    }

    if(!this.kmap.has(category )) {
      this.kmap.set(category, new Set() );
    }

    this.kmap.get(category)!.add(inst);

  }

  // Fetches rooms data. If already fetched (and no force refresh), it triggers an event.
  fetch(category: string, refresh: boolean = false) {
    if (refresh === false && this.kmap.has(category) ) {
      return press.wire.fire(GlobalEventEnum.FETCHED_ROOM_RESOURCE, category);
    } else {
      getRooms(category)
        .then((data) => {
          data.rooms.forEach((room) => this.add(category, room));
          press.wire.fire(GlobalEventEnum.FETCHED_ROOM_RESOURCE, category);
        })
        .catch((error) => {
          console.error("Error fetching rooms", error);
        });
    }
  }
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

  public load(category: string) {
    return this.container.kmap.get(category);    
  }

  public fetch(category: string, refresh: boolean = false) {
    return this.container.fetch(category, refresh);
  }

  public getRooms(category: string) {
    return Array.from(this.container.kmap.get(category));    
  }

  public getRoomDetail(roomId: number) {
    return undefined;
  }
}
