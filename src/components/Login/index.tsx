import React, { useState, useRef, useEffect } from "react";

import "./style.css";
import DesignOne from "./DesignOne";
import SigninFormErrorMessages from "../types/SigninFormErrorMessagesType";
import SignupFormErrorMessages from "../types/SignupFormErrorMessagesType";
import { DEFAULT_TRANSLATION_DICTIONARY, TranslationDictionary } from "../types/TranslationDictionaryType";
import PageView from "../types/PageViewType";
import ForgotPasswordFormErrorMessages from "../types/ForgotPasswordFormErrorMessagesType";
import ResendVerifyLinkFormErrorMessages from "../types/ResendVerifyLinkFormErrorMessagesType";

export type LoginProps = {
    onSignin: any;
    onSignup: any;
    onForgotPassword: any;
    onResendVerifyLink: any;
    children?: any;
    signinFormErrorMessages: SigninFormErrorMessages;
    signupFormErrorMessages: SignupFormErrorMessages;
    forgotPasswordFormErrorMessages: ForgotPasswordFormErrorMessages;
    resendVerifyLinkFormErrorMessages: ResendVerifyLinkFormErrorMessages;
    clearErrorMessages: any;
    dictionary?: TranslationDictionary;
    view: PageView;
    changeView: any;
};

/**
 * Component to render Login form element.
 */
const Login = (props: LoginProps) => {
    const [logo, setLogo] = useState<any>(null);
    const [placeholder, setPlaceholder] = useState<any>(null);

    useEffect(() => {
        let _children = props.children;
        if (!props.children?.length) {
            _children = [props.children];
        }
        if (!props.children) {
            _children = [];
        }
        _children?.forEach((item: any) => {
            console.log(item.type.displayName, item.type.name);
            if (item.type.displayName === "Logo" || item.type.name === "Logo") {
                setLogo(item);
            }
            if (item.type.displayName === "Placeholder" || item.type.name === "Placeholder") {
                setPlaceholder(item);
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
                forgotPasswordFormErrorMessages={props.forgotPasswordFormErrorMessages}
                resendVerifyLinkFormErrorMessages={props.resendVerifyLinkFormErrorMessages}
                clearErrorMessages={props.clearErrorMessages}
                logo={logo}
                placeholder={placeholder}
                dictionary={props.dictionary || DEFAULT_TRANSLATION_DICTIONARY}
                view={props.view}
                changeView={props.changeView}
                onForgotPassword={props.onForgotPassword}
                onResendVerifyLink={props.onResendVerifyLink}
            />
        </div>
    );
};

export default Login;