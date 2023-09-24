import { ReactNode } from "react";
import useViewport, { ViewportEnum } from "../hooks/useViewport";
import Text from "./Text";

const IconLabel = ({
  iconElement,
  name,
  fnClick,
}: {
  iconElement: ReactNode;
  name: string;
  fnClick: () => void;
}) => {
  const viewport = useViewport();
  const ismobile = viewport == ViewportEnum.MOBILE;

  return (
    <div className="iconlabel" onClick={fnClick}>
      <div className="icon">{iconElement}</div>
      {ismobile === false && (
        <div className="label">
          <Text>{name}</Text>
        </div>
      )}
    </div>
  );
};

export default IconLabel;
