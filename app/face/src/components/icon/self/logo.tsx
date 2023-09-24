import press from "@/lib";

const SelfLogo = ({ size }) => {
  const rect = (x: number, y: number, u: number = 6) => {
    const c = press.palette.fuchsia;
    const d = press
      .path(x, y)
      .lineTo(x + u, y)
      .lineTo(x + u, y + u)
      .lineTo(x, y + u)
      .lineTo(x, y)
      .close().trail;

    return {
      d,
      fill: c,
    };
  };

  const circle = (cx: number, cy: number, r: number) => {
    const c = press.palette.turquoise;
    const d = press
      .path(cx, cy - r)
      .arcTo(r, r, 0, 0, 1, cx, cy + r)
      .arcTo(r, r, 0, 0, 1, cx, cy - r)
      .close().trail;

    return {
      d,
      fill: c,
    };
  };

  const triangle = (x: number, y: number, size: number) => {
    const c = press.palette.mustard;
    const d = press
      .path(x + u / 2, y)
      .lineTo(x, y + u)
      .lineTo(x + u, y + u)
      .lineTo(x + u / 2, y)
      .close().trail;

    return {
      d,
      fill: c,
    };
  };

  const g = size / 8;
  const x = g;
  const y = g;
  const u = (size - 3 * g) / 2;
  const w = u + g;

  return (
    <div>
      <svg width={size} height={size}>
        <path {...rect(x, y, u)} />
        <path {...circle(x + w + u / 2, y + u / 2 - g / 2, u / 2)} />
        <path {...triangle(x, y + w, u)} />
        <path {...rect(x + w, y + w, u)} />
      </svg>
    </div>
  );
};

SelfLogo.defaultProps = {
  size: 30,
};

export default SelfLogo;
