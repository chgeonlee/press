import _ from "lodash";

const Device = () => {
  //window.screen
  //@ts-ignore
  const n = window.screen.msOrientation ? "moz..." : "no";
  //@ts-ignore
  const u = window.orientation ? window.orientation.type : "nonono";
  return (
    <div>
      <div> userAgent: {window.navigator.userAgent}</div>
      <div>
        window.screen:{" "}
        {window.screen
          ? window.screen.orientation
            ? window.screen.orientation.type
            : "오리엔테이션이 존재하지 않음"
          : "screen이 존재하지 않음"}
        {n} /// {u}
      </div>
    </div>
  );
};

export default Device;
