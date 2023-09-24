import press from "../lib";

describe("press.path", () => {
  let path;

  beforeEach(() => {
    path = press.path(0, 0);
  });

  test("constructor initializes correctly", () => {
    expect(path.trail).toBe("M0,0");
    expect(path.x).toBe(0);
    expect(path.y).toBe(0);
  });

  test("closed() returns correct boolean", () => {
    expect(path.closed()).toBe(false);
    path.close();
    expect(path.closed()).toBe(true);
  });

  test("moveTo() changes the trail and coordinates correctly", () => {
    path.moveTo(5, 5);
    expect(path.trail).toBe("M0,0M5,5");
    expect(path.x).toBe(5);
    expect(path.y).toBe(5);
  });

  test("lineTo() changes the trail for various scenarios", () => {
    path.lineTo(5, 5);
    expect(path.trail).toBe("M0,0L5,5");

    path.lineTo(5, 10);
    expect(path.trail).toBe("M0,0L5,5V10");

    path.lineTo(10, 10);
    expect(path.trail).toBe("M0,0L5,5V10H10");
  });

  test("linkTo() chains lineTo() correctly", () => {
    path.linkTo([5, 10], [5, 10]);
    expect(path.trail).toBe("M0,0L5,5L10,10");
  });

  test("arcTo() appends correct arc path", () => {
    path.arcTo(5, 5, 45, 1, 0, 10, 10);
    expect(path.trail).toBe("M0,0A5,5,45,1,0,10,10");
  });

  test("close() closes the path correctly", () => {
    path.close();
    expect(path.trail).toBe("M0,0Z");
  });
});
