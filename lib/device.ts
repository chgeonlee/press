class Configure {
  _agent = {
    IOS: 0,
    ANDROID: 1,
    OTMOB: 2,
    NOMOB: 3,
  };

  _browser = {
    CHROME: 0,
    SAFARI: 1,
    FIREFOX: 2,
    MSIE: 3,
    OPERA: 4,
    OTHER: 5,
  };
}

var Rectangle = function (width, height) {
  this.lower = function () {
    return Math.min(width, height);
  };
  this.upper = function () {
    return Math.max(width, height);
  };
};

class Stat extends Configure {
  constructor(
    public agent,
    public brouwr,
    public cover,
    public inner
  ) {
    super();
  }

  mobile = function () {
    return this.agent != this._agent.NOMOB;
  };

  ios = function () {
    return this.agent == this._agent.IOS;
  };

  safari = function () {
    return this.browser == this._browser.SAFARI;
  };
}

export default class Device extends Configure {
  private static _instance: Device;
  public static get instance() {
    return this._instance || (this._instance = new Device());
  }

  //prevent using new Constructor();
  private constructor() {
    super();
  }

  private _stat;
  private get stat() {
    if (this._stat) {
      return this._stat;
    }
    var s = window.navigator.userAgent.toLowerCase();

    var a;
    if (s.match(/ipad|iphone|ipod/i)) {
      a = this._agent.IOS;
    } else if (s.match(/android/i)) {
      a = this._agent.ANDROID;
    } else if (s.match(/webos|iemobile|opera mini/i)) {
      a = this._agent.OTMOB;
    } else {
      a = this._agent.NOMOB;
    }
    var b;
    if (s.match(/opera/i)) {
      b = this._browser.OPERA;
    } else if (s.match(/chrome/i)) {
      b = this._browser.CHROME;
    } else if (s.match(/safari/i)) {
      b = this._browser.SAFARI;
    } else if (s.match(/firefox/i)) {
      b = this._browser.FIREFOX;
    } else if (s.match(/msie/i)) {
      b = this._browser.MSIE;
    } else {
      b = this._browser.OTHER;
    }

    return (this._stat = new Stat(
      a,
      b,
      new Rectangle(window.screen.width, window.screen.height),
      new Rectangle(window.innerWidth, window.innerHeight)
    ));
  }

  private portrait = () => {
    const s = this.stat;

    if (s.ios() || s.safari()) {
      return Math.abs(window.orientation) != 90;
    } else {
      return "portrait" == window.screen.orientation.type.substring(0, 8);
    }
  };

  public get properties() {
    let vert = this.portrait();
    const c = this.stat.cover;
    console.log(".1111..", c.upper(), c.lower());

    return {
      portrait: vert,
      outer: (function () {
        if (vert) {
          return {
            width: c.lower(),
            height: c.upper(),
          };
        } else {
          console.log("...", c.upper(), c.lower());
          return { width: c.upper(), height: c.lower() };
        }
      })(),
      inner: (function () {
        var w = window.innerWidth;
        var h = window.innerHeight;
        var z = c.lower() < Math.min(w, h) && c.upper() < Math.max(w, h);
        if (z) {
          var r = 1;
          if (vert) {
            r = c.lower() / w;
          } else {
            r = c.upper() / w;
          }
          return { width: w * r, height: h * r };
        } else {
          return { width: w, height: h };
        }
      })(),
      client: (function () {
        var w = document.body.clientWidth;
        var h = document.body.clientHeight;
        return { width: w, height: h };
      })(),
    };
  }
}
