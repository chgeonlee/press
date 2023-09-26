import { ReactNode } from "react";
import useViewport, { ViewportEnum } from "../hooks/useViewport";
import classNames from "classnames";

export interface ISectionProps {
  children: ReactNode | ReactNode[];
  floating: boolean;
}

const Section = ({ children, floating }: ISectionProps) => {
  const viewport = useViewport();
  const port = viewport === ViewportEnum.MOBILE ? "mobile" : "tablet";
  const float = floating ? "float" : "";

  return <div className={classNames("section", port, float)}>{children}</div>;
};

export default Section;

Section.defaultProps = {
  floating: false,
};
