export enum TimerKeys {
  TIMER_TOKEN_UPDATE = "castTimerTokenUpdate",
}

class TimerFactory {
  static create(nkey: TimerKeys) {
    switch (nkey) {
      case TimerKeys.TIMER_TOKEN_UPDATE:
        return setTimeout;
    }

    throw new Error("");
  }

  static remove(nkey: TimerKeys) {
    switch (nkey) {
      case TimerKeys.TIMER_TOKEN_UPDATE:
        return clearTimeout;
    }
  }
}

export default class Timer {
  private static _instance: Timer;
  public static get instance() {
    return this._instance || (this._instance = new Timer());
  }

  _map = {};

  constructor() {
    this._map = {};
  }

  enroll = (nkey: TimerKeys, handler: any, timeout: number) => {
    if (this._map[nkey]) this.unroll(nkey);

    this._map[nkey] = TimerFactory.create(nkey)(handler, timeout);
  };

  unroll = (nkey: TimerKeys) => {
    if (this._map[nkey] == null) return;

    TimerFactory.remove(nkey)(this._map[nkey]);
    this._map[nkey] = null;
  };

  destroy = () => {
    Object.keys(this._map).map((nkey: TimerKeys) => {
      this.unroll(nkey);
    });
  };
}
