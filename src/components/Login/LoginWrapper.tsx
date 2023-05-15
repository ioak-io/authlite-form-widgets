import React, { useState, useRef, useEffect } from "react";

import "./style.css";
import DesignOne from "./DesignOne";
import Login, { LoginProps } from ".";
import Logo from "../Logo";
import authliteBlack from './authlite_black.svg';
import Tagline from "../Tagline";
import * as AuthenticationService from "../../services/AuthenticationService";
import SigninFormErrorMessages from "../types/SigninFormErrorMessagesType";
import SignupFormErrorMessages from "../types/SignupFormErrorMessagesType";
import SigninResponse from "../types/SigninResponse";
import SigninRequest from "../types/SigninRequest";
import SignupRequest from "../types/SignupRequest";
import SignupResponse from "../types/SignupResponse";

export type LoginWrapperProps = {
    children?: any;
};

/**
 * Component to render Login form element.
 */
const LoginWrapper = (props: LoginProps) => {

    const [signinFormErrorMessages, setSigninFormErrorMessages] = useState<SigninFormErrorMessages>({});
    const [signupFormErrorMessages, setSignupFormErrorMessages] = useState<SignupFormErrorMessages>({});

    const onSignin = (data: SigninRequest) => {
        AuthenticationService.signin("local", 212, data).then((response: SigninResponse) => {
            console.log(response);
            setSigninFormErrorMessages(response.errorMessages);
        })
    }

    const onSignup = (data: SignupRequest) => {
        AuthenticationService.signup("local", 212, data, "1d9524a6-30df-4b3c-9402-503f4011896c").then((response: SignupResponse) => {
            console.log(response);
            setSignupFormErrorMessages(response.errorMessages);
        })
    }

    const clearErrorMessages = () => {
        setSigninFormErrorMessages({});
        setSignupFormErrorMessages({});
    }

    return (
        <Login
            onSignin={onSignin}
            onSignup={onSignup}
            signinFormErrorMessages={signinFormErrorMessages}
            signupFormErrorMessages={signupFormErrorMessages}
            clearErrorMessages={clearErrorMessages}
        >
            <Logo>
                <img src={authliteBlack} alt="Authlite logo" />
            </Logo>
            <Tagline title="Hello Again!" subtitle="metus dui sapien phasellus arcu posuere eu adipiscing proin adipiscing mi luctus dignissim sem. hendrerit dapibus ut scelerisque tellus malesuada scelerisque vel est fermentum nullam sociosqu." />
        </Login>
    );
};

export default LoginWrapper;