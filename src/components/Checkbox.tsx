import React, { FC, ReactNode } from "react";

import * as checkboxStyles from "./Checkbox.module.css";

type CheckboxProps = {
    id: string;
    fields?: any;
    value?: boolean;
    label: ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Checkbox: FC<CheckboxProps> = ({
    id,
    fields,
    value,
    label,
    onChange,
}) => {
    return (
        <label className={checkboxStyles.container}>
            {label}
            <input
                id={id}
                className={checkboxStyles.input}
                type="checkbox"
                checked={value ?? fields?.[id]}
                onChange={onChange}
                style={{
                    position: "absolute",
                    opacity: 0,
                    height: 0,
                    width: 0,
                    cursor: "pointer",
                }}
            />
            <span className={checkboxStyles.checkmark} />
        </label>
    );
};

export default Checkbox;