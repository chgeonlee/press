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
});
