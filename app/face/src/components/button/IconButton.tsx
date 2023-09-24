import classNames from "classnames";
import { ReactNode } from "react";

export interface IIconButtonProps {
  icon: ReactNode;
  onClick: () => void;
}

export const IconButton = ({ icon, onClick }: IIconButtonProps) => {
  return (
    <div className={classNames("button", "icon")} onClick={onClick}>
      {icon}
    </div>
  );
};
