import { Outlet } from "react-router-dom";
import Header from "./Header";
import classNames from "classnames";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles((theme: any) => ({
    container: {
        backgroundColor: theme.background,
        color: theme.text,
    },
}));

export default function Root() {
    const classes = useStyles();    

    return <div className={ classNames( classes.container )}>
        <Header />
        <Outlet />
    </div>
}