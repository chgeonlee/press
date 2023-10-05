import press from "../lib";

describe("BarModel", () => {
  it("should create paths correctly based on data", () => {
    const container = press
      .chart()
      .container.rangeX([0, 100])
      .rangeY([0, 100])
      .domainX([0, 10])
      .domainY([0, 50]);

    const model = press.chart().model.bar({
      data: [
        [1, 10],
        [2, 20],
      ],
      attr: {},
      prop: {
        barWidth: 1,
      },
    });

    const paths = model.draw(container);
    expect(paths.length).toBe(2);
  });

  it("should apply container scaling correctly #1", () => {
    const container = press
      .chart()
      .container.rangeX([0, 100])
      .rangeY([0, 100])
      .domainX([0, 10])
      .domainY([0, 100]);

    const model = press.chart().model.bar({
      data: [
        [0, 10],
        [1, 20],
      ],
      attr: {},
      prop: {
        barWidth: 1,
        barGap: 0,
      },
    });

    const paths = model.draw(container);
    expect(paths[1].x - paths[0].x).toBe(10);
  });

  it("should apply container scaling correctly #2", () => {
    const rx = 100;
    const ry = 100;
    const dx = 5;
    const dy = 50;

    const data1 = [0, 10];
    const data2 = [1, 20];

    const container = press
      .chart()
      .container.rangeX([0, rx])
      .rangeY([0, ry])
      .domainX([0, dx])
      .domainY([0, dy]);

    const model = press.chart().model.bar({
      data: [data1, data2],
      attr: {},
      prop: {
        barWidth: 1,
        barGap: 0,
      },
    });

    const paths = model.draw(container);
    expect(paths[1].x - paths[0].x).toBe((rx / dx) * (data2[0] - data1[0]));
    expect(paths[0].y - paths[1].y).toBe((ry / dy) * (data2[1] - data1[1]));
  });
});
