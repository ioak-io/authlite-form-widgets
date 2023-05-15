import React, { useState, useRef, useEffect } from "react";

import "./style.css";
import DesignOne from "./DesignOne";
import Login, { LoginProps } from ".";
import Logo from "../Logo";
import authliteBlack from './authlite_black.svg';
import Tagline from "../Tagline";
import * as AuthenticationService from "../../services/AuthenticationService";
import SigninFormErrorMessages from "../types/SigninFormErrorMessagesType";
import SignupFormErrorMessage from "../types/SignupFormErrorMessageType";

export type LoginWrapperProps = {
    children?: any;
};

/**
 * Component to render Login form element.
 */
const LoginWrapper = (props: LoginProps) => {

    const [signinFormErrorMessages, setSigninFormErrorMessagess] = useState<SigninFormErrorMessages>({});
    const [signupFormErrorMessages, setSignupFormErrorMessages] = useState<SignupFormErrorMessage>({});

    const onSignin = (data: { email: string, password: string }) => {
        AuthenticationService.signin("local", 212, data).then((response: any) => {
            console.log(response);
            setSigninFormErrorMessagess(response.errorMessages);
        })
    }

    const onSignup = (event: any) => {
        event.preventDefault();
    }

    return (
        <Login
            onSignin={onSignin}
            onSignup={onSignup}
            signinFormErrorMessages={signinFormErrorMessages}
            signupFormErrorMessages={signupFormErrorMessages}>
            <Logo>
                <img src={authliteBlack} alt="Authlite logo" />
            </Logo>
            <Tagline title="Hello Again!" subtitle="metus dui sapien phasellus arcu posuere eu adipiscing proin adipiscing mi luctus dignissim sem. hendrerit dapibus ut scelerisque tellus malesuada scelerisque vel est fermentum nullam sociosqu." />
        </Login>
    );
};

export default LoginWrapper;