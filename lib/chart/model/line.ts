import BaseModel from ".";
import Path from "../../path";
import press from "../../";
import Container from "../container";

export class LineModel extends BaseModel {
  constructor(spec) {
    super(spec);
    this.data = spec.data;
    this.attr = spec.attr;
  }

  draw(container: Container): Path[] {
    if (this.data.length === 0) return [];

    const path = press.path(
      container.scaleX(this.data[0][0]),
      container.scaleY(this.data[0][1]),
    );

    this.data.forEach(([x, y]) => {
      path.lineTo(container.scaleX(x), container.scaleY(y));
    });

    return [path];
  }
}
