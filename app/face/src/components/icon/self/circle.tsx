import press from "@/lib";

const Circle = ({ size }) => {
  const c = size / 2;
  const path = press
    .path(c, 0)
    .arcTo(c, c, 0, 1, 0, c, size)
    .arcTo(c, c, 0, 1, 0, c, 0)
    .close().trail;

  return (
    <svg width={size} height={size} style={{ pointerEvents: "none" }}>
      <path d={path} stroke="black" fill="white"></path>
    </svg>
  );
};

export default Circle;

