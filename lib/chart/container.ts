import press from "../";
import { BarModel } from "./model/bar";
import { LineModel } from "./model/line";

export default class Container {
  private _drawX: boolean = false;
  private _drawY: boolean = false;

  private _domainX: [number, number] = [0, 0];
  private _domainY: [number, number] = [0, 0];

  private _rangeX: [number, number] = [0, 0];
  private _rangeY: [number, number] = [0, 0];

  private _models: (BarModel | LineModel)[] = [];

  setModel(model: BarModel | LineModel): this {
    this._models.push(model);
    return this;
  }

  drawX(d: boolean) {
    this._drawX = d;
    return this;
  }

  drawY(d: boolean) {
    this._drawY = d;
    return this;
  }

  rangeX(r: [number, number]) {
    this._rangeX = r;
    return this;
  }

  rangeY(r: [number, number]) {
    this._rangeY = r;
    return this;
  }

  domainX(d: [number, number]) {
    this._domainX = d;
    return this;
  }

  domainY(d: [number, number]) {
    this._domainY = d;
    return this;
  }

  scaleX(value: number): number {
    const domainSize = this._domainX[1] - this._domainX[0];
    const rangeSize = this._rangeX[1] - this._rangeX[0];
    return (
      ((value - this._domainX[0]) / domainSize) * rangeSize + this._rangeX[0]
    );
  }

  scaleY(value: number): number {
    const domainSize = this._domainY[1] - this._domainY[0];
    const rangeSize = this._rangeY[1] - this._rangeY[0];
    return (
      this._rangeY[1] - ((value - this._domainY[0]) / domainSize) * rangeSize
    );
  }

  drawAxis = (svg: SVGElement) => {
    if (this._drawX) {
      const px = press
        .path(this._rangeX[0], this._rangeY[1])
        .lineTo(this._rangeX[1], this._rangeY[1]);
      svg.appendChild(px.createElement());
    }

    if (this._drawY) {
      const py = press.path(0, this._rangeY[0]).lineTo(0, this._rangeY[1]);
      svg.appendChild(py.createElement());
    }
  };

  drawModel = (svg: SVGElement) => {
    this._models.map((model) => {
      const paths = model.draw(this);
      paths.forEach((path) => {
        svg.appendChild(path.createElement(model.attr));
      });
    });
    return this;
  };

  draw = (svg: SVGElement) => {
    this.drawAxis(svg);
    this.drawModel(svg);
  };
}
