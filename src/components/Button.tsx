import React, { FC, CSSProperties, ReactNode } from "react";

import * as buttonStyles from "./Button.module.css";

type ButtonProps = {
    isDisabled?: boolean;
    onClick?: () => void;
    style?: CSSProperties;
    children: ReactNode;
};
const Button: FC<ButtonProps> = ({ isDisabled, onClick, style, children }) => {
    return (
        <button
            className={buttonStyles.button}
            disabled={isDisabled}
            onClick={onClick}
            style={style}
        >
            {children}
        </button>
    );
};

export default Button;