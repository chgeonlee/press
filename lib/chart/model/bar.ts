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
    const w = (this.prop.barWidth as number) || 1;
    const g = (this.prop.barGap as number) || 0;

    return this.data.map(([x, y], index) => {
      const path = press
        .path(container.scaleX(x), container.scaleY(y))
        .lineTo(container.scaleX(x), container.scaleY(0))
        .lineTo(container.scaleX(x + w) - g, container.scaleY(0))
        .lineTo(container.scaleX(x + w) - g, container.scaleY(y))
        .close();
      return path;
    });
  }
}
