import press from "@/lib";
import useDarkMode from "../../../hooks/useDarkMode";

const SelfMenu = ({ size }) => {
  const { darkModeStatus } = useDarkMode();

  const x = 2;
  const y = 4;
  const b = 1;
  const w = size;
  const g = (size - y * 2) / 2;

  const d = press
    .path(x, y)
    .lineTo(w - x, y)
    .moveTo(x, g + y)
    .lineTo(w - x, g + y)
    .moveTo(x, g * 2 + y)
    .lineTo(w - x, g * 2 + y)
    .close().trail;

  return (
    <svg width={size} height={size}>
      <path
        d={d}
        stroke={darkModeStatus ? press.palette.white : press.palette.black}
        strokeWidth={b}
      />
    </svg>
  );
};

SelfMenu.defaultProps = {
  size: 32,
};

export default SelfMenu;
