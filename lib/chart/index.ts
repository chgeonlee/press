import Container from "./container";
import { BarModel } from "./model/bar";
import { LineModel } from "./model/line";

export default class Chart {
  get container() {
    return new Container();
  }

  get model() {
    return {
      line: (args) => new LineModel(args),
      bar: (args) => new BarModel(args),
    };
  }
}
