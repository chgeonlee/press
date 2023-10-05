import press from "@/lib";

const Circle = ({ size }) => {
  const c = size / 2;
  const path = press
    .path(c, 0)
    .arcTo(c, c, 0, 1, 0, c, size) // 하단 중심으로 반원 그리기
    .arcTo(c, c, 0, 1, 0, c, 0) // 원래 위치로 돌아와서 원을 완성
    .close().trail;

  return (
    <svg width={size} height={size} style={{ pointerEvents: "none" }}>
      <path d={path} stroke="black" fill="white"></path>
    </svg>
  );
};

export default Circle;
