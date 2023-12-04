export enum LocalStorageKeys {
  SERVICE_ID_TOKEN_NAME = "castServiceToken",
  SERVICE_ID_TOKEN_EXP = "castServiceIdTokenExp",
}

class Local {
  _map = {};
  constructor() {
    for (const nkey of Object.values(LocalStorageKeys)) {
      const nval = this.get(nkey);
      if (nval !== null) {
        this._map[nkey] = nval;
      }
    }
  }

  set = (name: LocalStorageKeys, value) => {
    if (Object.keys(this._map).indexOf(name) != -1) {
      this.remove(name);
    }
    this._map[name] = value;
    localStorage.setItem(name, value);
  };

  get = (name: LocalStorageKeys) => {
    return localStorage.getItem(name);
  };

  remove = (name: LocalStorageKeys) => {
    delete this._map[name];
    localStorage.removeItem(name);
  };

  destroy = () => {
    Object.keys(this._map).map((nkey: LocalStorageKeys) => {
      this.remove(nkey);
    });
  };
}

export default class Storage {
  private static _instance: Storage;
  public static get instance() {
    return this._instance || (this._instance = new Storage());
  }

  _local: Local;
  public get local() {
    return this._local || (this._local = new Local());
  }
}
