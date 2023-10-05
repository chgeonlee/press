import Path from "../../path";
import Container from "../container";

abstract class BaseModel {
  prop: { [name: string]: string | number };
  attr: { [name: string]: string | number };
  data: [number, number][];
  constructor(spec: {
    data: [number, number][];
    attr: { [name: string]: string | number };
  }) {
    this.data = spec.data;
    this.attr = spec.attr;
  }

  abstract draw(container: Container): Path[];
}

export default BaseModel;
