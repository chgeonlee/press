import classNames from "classnames";
import { ReactNode } from "react";

export interface IIconButtonProps {
  icon: ReactNode;
  fnClick: () => void;
}

export const IconButton = ({ icon, fnClick }: IIconButtonProps) => {
  return (
    <div className={classNames("button", "icon")} onClick={fnClick}>
      {icon}
    </div>
  );
};
