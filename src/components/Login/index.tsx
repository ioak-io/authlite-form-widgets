import React, { useState, useRef, useEffect } from "react";

import "./style.css";
import DesignOne from "./DesignOne";
import SigninFormErrorMessages from "../types/SigninFormErrorMessagesType";
import SignupFormErrorMessages from "../types/SignupFormErrorMessagesType";
import { TranslationDictionary } from "../types/TranslationDictionaryType";

export type LoginProps = {
    onSignin: any;
    onSignup: any;
    signinFormErrorMessages: SigninFormErrorMessages;
    signupFormErrorMessages: SignupFormErrorMessages;
    children?: any;
    dictionary?: TranslationDictionary;
    clearErrorMessages: any;
};

/**
 * Component to render Login form element.
 */
const Login = (props: LoginProps) => {
    const [logo, setLogo] = useState<any>(null);
    const [tagline, setTagline] = useState<any>(null);

    useEffect(() => {
        let _children = props.children;
        if (!props.children?.length) {
            _children = [props.children];
        }
        if (!props.children) {
            _children = [];
        }
        _children?.forEach((item: any) => {
            if (item.type.displayName === "Logo" || item.type.name === "Logo") {
                setLogo(item);
            }
            if (item.type.displayName === "Tagline" || item.type.name === "Tagline") {
                setTagline(item);
            }
        })
    }, [props.children]);

    return (
        <div className="authlite-login">
            <DesignOne
                onSignin={props.onSignin}
                onSignup={props.onSignup}
                signinFormErrorMessages={props.signinFormErrorMessages}
                signupFormErrorMessages={props.signupFormErrorMessages}
                clearErrorMessages={props.clearErrorMessages}
                logo={logo}
                tagline={tagline}
                dictionary={props.dictionary} />
        </div>
    );
};

export default Login;