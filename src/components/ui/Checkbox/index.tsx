import React, { useState, useRef, useEffect } from "react";

import "./style.css";

export interface CheckboxProps {
    id?: string;
    label?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    [key: string]: any;
};

/**
 * Component to render checkbox form element. For using it with standard html input, add css class authlite-input
 */
const Checkbox = ({
    id,
    label,
    theme,
    checked,
    ...restProps
}: CheckboxProps) => {
    return (
        <label className={`authlite-checkbox ${checked ? "authlite-checkbox--checked" : ""} authlite-checkbox--theme-default`} htmlFor={id}>
            <input className="authlite-checkbox__input" id={id} checked={checked} type="checkbox" {...restProps} />
            {label && <span className="authlite-checkbox__span">{label}</span>}
        </label>
    );
};

export default Checkbox;