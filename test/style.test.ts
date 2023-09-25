import press from "../lib";
import Style, { PlaceEnum } from "../lib/style";

describe("Style and Spec functionality", () => {
  test("style instance creation", () => {
    expect(press.style).toBeInstanceOf(Style);
  });

  test("spec method", () => {
    const instance = press.style.spec();
    expect(instance).toBeInstanceOf(Object); // Ensure Spec object is returned
  });

  test("absolute method", () => {
    const instance = press.style.absolute();
    expect(instance.position).toBe("absolute");
  });

  test("relative method", () => {
    const instance = press.style.relative();
    expect(instance.position).toBe("relative");
  });

  test("fixed method", () => {
    const instance = press.style.fixed();
    expect(instance.position).toBe("fixed");
  });

  test("edge method with only width and color", () => {
    const instance = press.style.absolute().edge(10, "red");
    expect(instance.border).toBe("10px solid red");    
  });

  test("edge method with specific place (LEFT)", () => {
    const instance = press.style.absolute().edge(10, "blue", PlaceEnum.LEFT);
    expect(instance.borderLeft).toBe("10px solid blue");
  });

  test("pack method", () => {
    const instance = press.style.spec().pack("flex");
    expect(instance.display).toBe("flex");
  });

  test("back method", () => {
    const instance = press.style.spec().back("red");
    expect(instance.backgroundColor).toBe("red");
  });

  test("mist method", () => {
    const instance = press.style.spec().mist(0.5);
    expect(instance.opacity).toBe(0.5);
  });

  test("pad method", () => {
    const instance = press.style.spec().pad(10, 20, 30, 40);
    expect(instance.paddingTop).toBe("10px");
    expect(instance.paddingLeft).toBe("20px");
    expect(instance.paddingBottom).toBe("30px");
    expect(instance.paddingRight).toBe("40px");
  });

  test("lift method", () => {
    const instance = press.style.spec().lift(100);
    expect(instance.transform).toBe("translateY(-100px)");
  });
});
