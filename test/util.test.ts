import press from "../lib";

describe("press.util", () => {
  test("Converts number to KRW format", () => {
    expect(press.util.convertToKRW(3000)).toBe("₩3,000");
    expect(press.util.convertToKRW(5000000)).toBe("₩5,000,000");
  });

  test("Handles non-number inputs gracefully", () => {
    //@ts-ignore
    expect(() => press.util.convertToKRW(undefined)).toThrow();
    //@ts-ignore
    expect(() => press.util.convertToKRW(null)).toThrow();
    expect(() => press.util.convertToKRW(NaN)).toThrow();
    //@ts-ignore
    expect(() => press.util.convertToKRW("string")).toThrow();
  });

  test("Object property should be made immutable", () => {
    const obj = {};
    press.util.immutable(obj, "key", "value");

    // Checking that the key was added with the correct value
    // @ts-ignore
    expect(obj.key).toBe("value");

    // Checking that the key is immutable
    expect(() => {
      // @ts-ignore
      obj.key = "newValue";
    }).toThrowError();
  });
});
