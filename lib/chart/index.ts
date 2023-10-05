import Container from "./container";
import { BarModel } from "./model/bar";
import { LineModel } from "./model/line";

export default class Chart {
  container(canvas: SVGElement) {
    return new Container(canvas);
  }

  get model() {
    return {
      line: (args) => new LineModel(args),
      bar: (args) => new BarModel(args),
    };
  }
}
