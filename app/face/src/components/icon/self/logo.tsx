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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="75"
        viewBox="0 0 318 75"
        fill="none"
      >
        <path
          d="M0.600006 16.1C0.600006 16.1 0.600006 37.1 0.600006 38.8C0.600006 39 0.599997 39.1 0.699997 39.3C0.999997 39.7 1.49999 39.9 1.89999 39.7C2.09999 39.5 2.3 39.3 2.5 39.2C2.7 39 3 38.8 3.2 38.6C3.7 38.2 4.2 37.9 4.7 37.6C5 37.4 5.30001 37.2 5.60001 37.1C7.30001 36.1 9.09999 35.4 10.9 34.9C11.2 34.8 11.4 34.7 11.7 34.7C11.9 34.7 12 34.6 12.2 34.6C13.8 34.2 15.6 34 17.7 33.9C17.8 33.9 17.6 33.9 17.7 33.9C26.8 33.7 34.2 26.3 34.2 17C34.2 7.7 26.7 0.1 17.4 0.1C8.49999 -0.1 1.00001 7.10001 0.600006 16.1Z"
          fill="#62C2D4"
        />
        <path
          d="M25.3 72.2C25.3 72.2 43.3 61.7 44.8 60.8C44.9 60.7 45.1 60.6 45.2 60.5C45.5 60.1 45.3 59.5 44.9 59.2C44.7 59.1 44.4 59 44.1 58.9C43.8 58.8 43.6 58.7 43.3 58.6C42.7 58.4 42.2 58.1 41.7 57.8C41.4 57.6 41.1 57.5 40.8 57.3C39.1 56.3 37.6 55.1 36.2 53.8C36 53.6 35.8 53.4 35.6 53.2C35.5 53.1 35.4 53 35.3 52.9C34.2 51.7 33.1 50.3 32 48.5C32.1 48.6 31.9 48.4 32 48.5C27.3 40.6 17.2 37.9 9.2 42.5C1.2 47.2 -1.59999 57.5 3.00001 65.6C7.40001 73.4 17.3 76.4 25.3 72.2Z"
          fill="#F8B01C"
        />
        <path
          d="M61.2 22.7C61.2 22.7 43.2 12.2 41.7 11.3C41.6 11.2 41.4 11.2 41.2 11.2C40.7 11.2 40.3 11.6 40.3 12.1C40.3 12.4 40.4 12.6 40.5 12.9C40.5 13.2 40.6 13.5 40.6 13.8C40.7 14.4 40.7 15 40.8 15.6C40.8 15.9 40.8 16.3 40.8 16.6C40.8 18.6 40.5 20.5 40.1 22.4C40 22.7 40 23 39.9 23.2C39.9 23.3 39.8 23.5 39.8 23.7C39.3 25.3 38.6 26.9 37.6 28.8C37.6 28.7 37.5 28.9 37.6 28.8C33.2 36.8 35.9 47 43.9 51.6C51.9 56.3 62.2 53.5 66.9 45.5C71.2 37.6 68.7 27.5 61.2 22.7Z"
          fill="#EB6651"
        />
        <path
          d="M313 19.2C313.5 19.2 313.8 18.9 313.8 18.5C313.8 18 313.5 17.8 313 17.8H312.2V19.2H313ZM314 19.8L314.9 21.2H313.7L313.1 20H313H312.2V21.2H311.2V17H313C314.1 17 314.8 17.5 314.8 18.5C314.8 19.1 314.5 19.6 314 19.8ZM316.3 19.2C316.3 17.3 314.8 15.7 312.9 15.7C311 15.7 309.5 17.3 309.5 19.2C309.5 21.1 311 22.7 312.9 22.7C314.8 22.7 316.3 21.1 316.3 19.2ZM317.4 19.2C317.4 21.7 315.4 23.7 312.9 23.7C310.4 23.7 308.4 21.6 308.4 19.2C308.4 16.7 310.4 14.7 312.9 14.7C315.4 14.7 317.4 16.8 317.4 19.2Z"
          fill="#373D49"
        />
        <path
          d="M114.1 14.9H85.7C85.3 14.9 84.9 15.3 84.9 15.7V58.2C84.9 58.6 85.3 59 85.7 59H93.6C94 59 94.4 58.6 94.4 58.2V41.5H113.1C113.5 41.5 113.9 41.1 113.9 40.7V34C113.9 33.6 113.5 33.2 113.1 33.2H94.4V23.2H114.1C114.5 23.2 114.9 22.8 114.9 22.4V15.7C114.9 15.3 114.5 14.9 114.1 14.9Z"
          fill="#373D49"
        />
        <path
          d="M136.7 24.7C135.1 24.9 133.6 25.4 132.2 26.1C130.4 27.1 128.9 28.2 127.7 29.6L127.4 30V26C127.4 25.6 127 25.2 126.6 25.2H119C118.6 25.2 118.2 25.6 118.2 26V58.3C118.2 58.7 118.6 59.1 119 59.1H126.5C126.9 59.1 127.3 58.7 127.3 58.3V44.5C127.3 41.2 128 38.4 129.4 36.4C130.8 34.3 133 33.3 135.9 33.3H136.7C137.1 33.3 137.5 32.9 137.5 32.5L137.6 25.6C137.6 25.4 137.5 25.1 137.3 25C137.2 24.7 136.9 24.7 136.7 24.7Z"
          fill="#373D49"
        />
        <path
          d="M150.1 35.1C151.7 33.3 153.8 32.4 156.3 32.4C158.8 32.4 160.9 33.3 162.5 35.1C164.1 36.9 164.9 39.3 164.9 42.1C164.9 44.9 164.1 47.3 162.5 49.1C160.9 50.9 158.8 51.8 156.3 51.8C153.8 51.8 151.7 50.9 150.1 49.1C148.5 47.3 147.7 45 147.7 42.1C147.7 39.3 148.5 36.9 150.1 35.1ZM156.3 24.6C151.2 24.6 146.9 26.3 143.6 29.7C140.2 33.1 138.5 37.2 138.5 42.1C138.5 47 140.2 51.2 143.6 54.5C147 57.8 151.3 59.5 156.3 59.5C161.4 59.5 165.7 57.8 169 54.5C172.4 51.2 174.1 47 174.1 42.1C174.1 37.2 172.4 33 169 29.7C165.7 26.3 161.4 24.6 156.3 24.6Z"
          fill="#373D49"
        />
        <path
          d="M196.7 24.6C193.1 24.6 190 26 187.2 28.9L186.9 29.2V26C186.9 25.6 186.5 25.2 186.1 25.2H178.6C178.2 25.2 177.8 25.6 177.8 26V58.3C177.8 58.7 178.2 59.1 178.6 59.1H186.1C186.5 59.1 186.9 58.7 186.9 58.3V40.2C186.9 37.5 187.6 35.4 189.1 34C190.5 32.6 192.3 31.9 194.2 31.9C198.2 31.9 200.2 34.6 200.2 40V58.4C200.2 58.8 200.6 59.2 201 59.2H208.5C208.9 59.2 209.3 58.8 209.3 58.4V38.6C209.3 34.4 208.1 31 205.7 28.5C203.2 25.8 200.3 24.6 196.7 24.6Z"
          fill="#373D49"
        />
        <path
          d="M245.2 25.2H237.7C237.3 25.2 236.9 25.6 236.9 26V58.3C236.9 58.7 237.3 59.1 237.7 59.1H245.2C245.6 59.1 246 58.7 246 58.3V26C246 25.5 245.6 25.2 245.2 25.2Z"
          fill="#373D49"
        />
        <path
          d="M241.4 11.2C239.9 11.2 238.6 11.7 237.6 12.8C236.6 13.8 236 15.1 236 16.6C236 18.1 236.5 19.4 237.6 20.4C238.6 21.4 239.9 22 241.4 22C242.9 22 244.2 21.5 245.2 20.4C246.2 19.4 246.8 18.1 246.8 16.6C246.8 15.1 246.3 13.8 245.2 12.8C244.2 11.7 243 11.2 241.4 11.2Z"
          fill="#373D49"
        />
        <path
          d="M304.8 25.9C304.7 25.7 304.4 25.5 304.1 25.5H296.1C295.8 25.5 295.5 25.7 295.4 26L287.2 47.2L279 26C278.9 25.7 278.6 25.5 278.3 25.5H272.7H270.3H263.8V23C263.8 21.6 264.1 20.5 264.8 19.8C265.5 19 266.3 18.7 267.4 18.7C268.8 18.7 270.1 19.2 271.3 20.3C271.5 20.5 271.7 20.5 272 20.5C272.2 20.5 272.4 20.3 272.6 20.1L275 15.6C275.2 15.3 275.1 14.8 274.8 14.6C272.2 12.4 269.5 11.4 266.4 11.4C263.1 11.4 260.4 12.5 258.1 14.6C255.9 16.8 254.8 19.6 254.8 23.3V25.6H251.6C251.2 25.6 250.8 26 250.8 26.4V31.3C250.8 31.7 251.2 32.1 251.6 32.1H254.8V58.4C254.8 58.8 255.2 59.2 255.6 59.2H263.2C263.6 59.2 264 58.8 264 58.4V32H271.8C278.9 50.1 282.3 59.3 282.3 60.3C282.3 61.3 282 62.3 281.3 63.2C280.6 64.1 279.8 64.6 278.9 64.6C277.5 64.6 276.1 64 274.7 63C274.5 62.9 274.3 62.8 274.1 62.8C273.9 62.8 273.7 63 273.6 63.2L270.4 68.5C270.2 68.8 270.3 69.3 270.6 69.5C273.3 71.8 276.2 73 279.3 73C281.7 73 283.8 72.4 285.7 71.1C287.6 69.8 289 68.1 290 65.7L305.3 26.7C305 26.4 304.9 26.1 304.8 25.9Z"
          fill="#373D49"
        />
        <path
          d="M231.5 25.2H224.1V15.7C224.1 15.3 223.7 14.9 223.3 14.9H215.7C215.3 14.9 214.9 15.3 214.9 15.7V25.2H211.7C211.3 25.2 210.9 25.6 210.9 26V30.9C210.9 31.3 211.3 31.7 211.7 31.7H214.9V47.7C214.9 51.4 216 54.3 218.2 56.4C220.4 58.5 223.1 59.6 226.4 59.6C227.8 59.6 229.2 59.3 230.5 58.8C230.8 58.7 231 58.4 231 58V51.8C231 51.5 230.9 51.3 230.6 51.1C230.4 51 230.1 50.9 229.8 51C229.1 51.3 228.4 51.5 227.6 51.5C226.6 51.5 225.8 51.1 225 50.3C224.3 49.5 223.9 48.4 223.9 47.1V31.5H231.3C231.7 31.5 232.1 31.1 232.1 30.7V26C232.3 25.5 232 25.2 231.5 25.2Z"
          fill="#373D49"
        />
      </svg>
      {/* <svg width={120} height={size}>
        <path {...rect(x, y, u)} />
        <path {...circle(x + w + u / 2, y + u / 2 - g / 2, u / 2)} />
        <path {...triangle(x, y + w, u)} />
        <path {...rect(x + w, y + w, u)} />
     
      </svg> */}
    </div>
  );
};

SelfLogo.defaultProps = {
  size: 30,
};

export default SelfLogo;
