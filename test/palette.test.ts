import press from "../lib";

describe("press.palette", () => {
  test('The palette object should be a singleton."', () => {
    const instance1 = press.palette;
    const instance2 = press.palette;

    expect(instance1).toBe(instance2);
  });

  test("usecase", () => {
    expect(press.palette.black).toBe("#121212");
    expect(press.palette.red).toBe("#c40000");
  });
});
