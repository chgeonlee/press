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
    .color(theme.text)
    .edge(1, theme.border),
}));

export const PlainButton = ({ value, rounded, fnClick }: IPlainButtonProps) => {
  const classes = useStyles();

  return (
    <div
      className={classNames(
        "button",
        "plain",
        rounded ? "rounded" : "",
        classes.container,
      )}
      onClick={fnClick}
    >
      <Text size={TextSizeEnum.SM}>{value}</Text>
    </div>
  );
};

PlainButton.defaultProps = {
  rounded: true,
};
