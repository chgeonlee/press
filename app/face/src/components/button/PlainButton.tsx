import classNames from "classnames"
import { createUseStyles } from "react-jss";
import Text, { TextSizeEnum } from "../Text";

export interface IPlainButtonProps {
    value: string;
    rounded: Boolean;
    onClick: () => void;
}

const useStyles = createUseStyles((theme: any) => ({
    container: {
        backgroundColor: theme.background,
        color: theme.text,
        border: `1px solid ${theme.border}`,        
    },
}));

export const PlainButton = ({ value, rounded, onClick }: IPlainButtonProps ) => {
    const classes = useStyles();

    return <div 
        className={classNames('button', 'plain', rounded? 'rounded': '', classes.container)}
        onClick={onClick}
    >
        <Text size={TextSizeEnum.SM}>
            {value}
        </Text>
    </div>
}

PlainButton.defaultProps = {
    rounded: true
}
