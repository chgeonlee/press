import { Outlet } from "react-router-dom";
import Header from "./Header";
import classNames from "classnames";
import { createUseStyles } from "react-jss";
import Section from "./Section";
import press from "@/lib";

const useStyles = createUseStyles((theme: any) => ({
    container: press.style.relative().back(theme.background).color( theme.text )
}));

export default function Root() {
  const classes = useStyles();

  return (
    <div className={classNames(classes.container, "root")}>
      <Section>
        <Header />
      </Section>
      <Section>
        <Outlet />
      </Section>
    </div>
  );
}
