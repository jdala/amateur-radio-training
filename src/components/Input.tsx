import React, { FC, CSSProperties } from "react";

import * as inputStyles from "./Input.module.css";

type InputProps = {
    id: string;
    fields: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    containerStyle?: CSSProperties;
};
const Input: FC<InputProps> = ({
    id,
    fields,
    onChange,
    onBlur,
    label,
    containerStyle,
}) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", ...containerStyle }}>
            <label htmlFor={id} style={{ marginBottom: 4 }}>{label}</label>
            <input
                id={id}
                className={inputStyles.input}
                type="text"
                value={fields?.[id]}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    );
};

export default Input;