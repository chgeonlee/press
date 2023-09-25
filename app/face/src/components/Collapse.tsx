import { ReactNode, useState } from "react";
import Grid from "./Grid";
import { PlainButton } from "./button/PlainButton";
import { createUseStyles } from "react-jss";
import classNames from "classnames";
import press from "@/lib";
import { PlaceEnum } from "../../../../lib/style";

export interface ICollapseProps {
  children: ReactNode[];
  columns: number;
  rows: number;
}

const useStyles = createUseStyles((theme: any) => ({
  container: press.style.spec().edge(1, theme.border, PlaceEnum.BOTTOM),
}));

export const Collapse = ({ children, columns, rows }: ICollapseProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const classes = useStyles();
  const displayedChildren = isExpanded
    ? children
    : children.slice(0, columns * rows);

  return (
    <div className={classNames("collapse", classes.container)}>
      <Grid columns={columns}>{displayedChildren}</Grid>
      <PlainButton
        value={isExpanded ? "닫기" : "열기"}
        fnClick={() => setIsExpanded(!isExpanded)}
      />
    </div>
  );
};
