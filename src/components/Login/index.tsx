import React, { useState, useRef, useEffect } from "react";

import "./style.css";
import DesignOne from "./DesignOne";

export type LoginProps = {
};

/**
 * Component to render Login form element.
 */
const Login = (props: LoginProps) => {

    return (
        <div className="authlite-login">
            <DesignOne />
        </div>
    );
};

export default Login;