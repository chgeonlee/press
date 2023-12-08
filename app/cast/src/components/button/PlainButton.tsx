import classNames from "classnames";
import { createUseStyles } from "react-jss";
import Text, { TextSizeEnum } from "../Text";
import press from "@/lib";

export interface IPlainButtonProps {
  value: string | React.ReactNode;
  rounded: Boolean;
  fnClick: (e) => void;
}
const useStyles = createUseStyles((theme: any) => ({
  container: press.style
    .relative()
    .back(theme.background)
    .pad(12, 12, 12, 12)
    .color(theme.text)
    .addCircle(24)
    .pack("flex", undefined, "center")
    .add({ border: "1px solid #e9e9e9" }),
}));

export const PlainButton = ({ value, fnClick }: IPlainButtonProps) => {
  const classes = useStyles();

  return (
    <div className={classNames("button", classes.container)} onClick={fnClick}>
      {value}
    </div>
  );
};

PlainButton.defaultProps = {
  rounded: true,
};
