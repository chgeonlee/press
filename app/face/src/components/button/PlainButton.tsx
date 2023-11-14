import classNames from "classnames";
import { createUseStyles } from "react-jss";
import Text, { TextSizeEnum } from "../Text";
import press from "@/lib";

export interface IPlainButtonProps {
  value: string;
  rounded: Boolean;
  fnClick: () => void;
}
const useStyles = createUseStyles((theme: any) => ({
  container: press.style
    .relative()
    .back(theme.background)
    .pad(10, 24, 10, 24)
    .color(theme.text)
    .edge(1, theme.border)
    .addCircle(24)
    .pack("flex", undefined, "center"),
}));

export const PlainButton = ({ value, fnClick }: IPlainButtonProps) => {
  const classes = useStyles();

  return (
    <div className={classNames("button", classes.container)} onClick={fnClick}>
      <Text size={TextSizeEnum.SM}>{value}</Text>
    </div>
  );
};

PlainButton.defaultProps = {
  rounded: true,
};
