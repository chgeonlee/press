export enum TopologyEnum {
  ABSOLUTE = 0,
  FIXED,
  RELATIVE,
}

export enum PlaceEnum {
  TOP = 0,
  LEFT,
  BOTTOM,
  RIGHT,
}

const topx = function (x: number | string) {
  const s = x + "";
  if (s.slice(-1) === "%" || s.slice(-2) === "px") {
    return s;
  } else {
    return s + "px";
  }
};

const append = function (src, des) {
  for (const key in src) {
    if (src.hasOwnProperty(key)) {
      des[key] = src[key];
    }
  }
};

const tag = function (n: number) {
  return ["Top", "Left", "Bottom", "Right"][n];
};

const Spec = function () {};

Spec.prototype.add = function (part: any) {
  append(part, this);
  return this;
};

Spec.prototype.place = function (x, y, slide = false) {
  if (slide) {
    return this.add({
      top: topx(y),
      left: "50%",
      marginLeft: topx(x),
    });
  } else {
    return this.add({ top: topx(y), left: topx(x) });
  }
};

Spec.prototype.block = function (w, h) {
  return this.add({ width: topx(w), height: topx(h) });
};

Spec.prototype.corner = function (w, h) {
  return this.place(0, 0).block(w, h);
};

Spec.prototype.whole = function () {
  return this.place(0, 0).block("100%", "120%");
};

Spec.prototype.rank = function (z) {
  return this.add({ zIndex: z });
};

Spec.prototype.color = function (c) {
  return this.add({ color: c });
};

Spec.prototype.edge = function (width, color, place = null) {
  let s = "border";

  if (place !== null) {
    s = "border" + tag(place);
  }

  return this.add({ [s]: `${topx(width)} solid ${color}` });
};

Spec.prototype.fontbase = function (size, color, name) {
  return this.add({
    fontSize: topx(size),
    color: color,
    fontFamily: name,
  });
};

Spec.prototype.tabular = function () {
  return this.add({
    fontVariant: "tabular-nums",
  });
};

Spec.prototype.align = function (pivot, height = null) {
  let h = "100%";
  if (height) {
    h = height;
  }
  return this.add({ textAlign: pivot, lineHeight: topx(h) });
};

Spec.prototype.pack = function (d) {
  return this.add({ display: d });
};

Spec.prototype.back = function (color) {
  return this.add({ backgroundColor: color });
};

Spec.prototype.mist = function (op) {
  return this.add({ opacity: op });
};

Spec.prototype.pad = function (t, l, b, r) {
  return this.add({
    paddingTop: topx(t),
    paddingLeft: topx(l),
    paddingBottom: topx(b),
    paddingRight: topx(r),
  });
};

Spec.prototype.lift = function (h) {
  return this.add({
    transform: "translateY(-" + topx(h) + ")",
  });
};

Spec.prototype.drop = function (h) {
  return this.add({ transform: "translateY(" + topx(h) + ")" });
};

Spec.prototype.noSpill = function () {
  return this.add({ overflow: "hidden" });
};

Spec.prototype.noWrap = function () {
  return this.add({ whiteSpace: "nowrap" });
};

Spec.prototype.set = function (p: TopologyEnum) {
  switch (p) {
    case TopologyEnum.ABSOLUTE:
      return this.add({ position: "absolute" });
    case TopologyEnum.FIXED:
      return this.add({ position: "fixed" });
    case TopologyEnum.RELATIVE:
      return this.add({ position: "relative" });
    default:
      return this;
  }
};

export default class Style {
  private static _instance: Style | null = null;

  public static get instance() {
    return this._instance || (this._instance = new Style());
  }

  spec = () => {
    return new Spec();
  };

  absolute = () => {
    return this.spec().set(TopologyEnum.ABSOLUTE);
  };

  relative = () => {
    return this.spec().set(TopologyEnum.RELATIVE);
  };

  fixed = () => {
    return this.spec().set(TopologyEnum.FIXED);
  };
}
