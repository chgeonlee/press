import press from "../lib";

describe("press.device", () => {
  test("Singleton instance creation", () => {
    const dev1 = press.device;
    const dev2 = press.device;

    expect(dev1).toBe(dev2);
  });

  test("Detect MacOS", () => {
    Object.defineProperty(window.navigator, "userAgent", {
      value: "Mac OS X",
      writable: true,
    });
    expect(press.device.getOS()).toBe("MacOS");
  });

  test("Detect Android", () => {
    Object.defineProperty(window.navigator, "userAgent", {
      value: "Android",
      writable: true,
    });
    expect(press.device.getOS()).toBe("Android");
  });
});
