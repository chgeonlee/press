import { ReactNode } from "react";
import useViewport, { ViewportEnum } from "../hooks/useViewport";
import classNames from "classnames";

const Section = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const viewport = useViewport();
  const port = viewport === ViewportEnum.MOBILE ? "mobile" : "tablet";

  return <div className={classNames("section", port)}>{children}</div>;
};

export default Section;
