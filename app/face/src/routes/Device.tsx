import _ from "lodash";

const Device = () => {
  //window.screen
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
      </div>
    </div>
  );
};

export default Device;
