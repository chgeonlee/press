export default class Path {
  public trail: string;
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.trail = "M" + x + "," + y;
  }

  closed(): boolean {
    return this.trail[this.trail.length - 1] === "Z";
  }

  moveTo(x: number, y: number): Path {
    if (this.x !== x || this.y !== y) {
      this.trail += "M" + x + "," + y;
      this.x = x;
      this.y = y;
    }
    return this;
  }

  lineTo(x: number, y: number): Path {
    switch (2 * Number(this.x === x) + Number(this.y === y)) {
      case 0:
        this.trail += "L" + x + "," + y;
        break;
      case 1:
        this.trail += "H" + x;
        break;
      case 2:
        this.trail += "V" + y;
        break;
    }
    this.x = x;
    this.y = y;
    return this;
  }

  linkTo(x: number[], y: number[]): Path {
    x.forEach((v, i) => {
      this.lineTo(v, y[i]);
    });
    return this;
  }

  arcTo(
    r1: number,
    r2: number,
    a: number,
    lf: number,
    sf: number,
    x: number,
    y: number,
  ): Path {
    this.trail += "A" + [r1, r2, a, lf, sf, x, y].join(",");
    this.x = x;
    this.y = y;
    return this;
  }

  close(): Path {
    this.trail += "Z";
    return this;
  }
}
