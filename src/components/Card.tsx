import React from "react";

import * as cardStyles from "./Card.module.css";

type CardProps = React.PropsWithChildren<{
    className?: string;
    style?: React.CSSProperties;
}>;
const Card: React.FC<CardProps> = ({ className, style, children }) => {
    return (
        <article className={`${cardStyles.card}${className ? ` ${className}` : ""}`} style={style}>
            {children}
        </article>
    );
};

export default Card;