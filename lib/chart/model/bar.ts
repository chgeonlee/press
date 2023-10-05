import BaseModel from ".";
import press from "../../";
import Path from "../../path";
import Container from "../container";

export class BarModel extends BaseModel {
  constructor(spec) {
    super(spec);
    this.data = spec.data;
    this.attr = spec.attr;
    this.prop = spec.prop;
  }

  draw(container: Container): Path[] {
    let w = (this.prop.barWidth as number) || 12;
    const g = (this.prop.barGap as number) || 0;
    const ey = container.scaleY(0);

    return this.data.map(([x, y], index) => {
      const bx = container.scaleX(x);
      const ex = container.scaleX(x + w) - g;
      const by = container.scaleY(y);

      const path = press
        .path(bx, by)
        .lineTo(bx, ey)
        .lineTo(ex, ey)
        .lineTo(ex, by)
        .close();
      return path;
    });
  }
}
