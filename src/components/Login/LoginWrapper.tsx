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
import PageView from "../types/PageViewType";
import Placeholder from "../Placeholder";
import InfoPage from "../InfoPage";
import InfoPageFootnote from "../InfoPage/InfoPageFootnote";
import InfoPageDescription from "../InfoPage/InfoPageDescription";
import ForgotPasswordResponse from "../types/ForgotPasswordResponseType";
import ForgotPasswordFormErrorMessages from "../types/ForgotPasswordFormErrorMessagesType";
import ResendVerifyLinkRequest from "../types/ForgotPasswordRequestType";
import ResendVerifyLinkFormErrorMessages from "../types/ResendVerifyLinkFormErrorMessagesType";
import ResendVerifyLinkResponse from "../types/ResendVerifyLinkResponseType";

export type LoginWrapperProps = {
    children?: any;
};

/**
 * Component to render Login form element.
 */
const LoginWrapper = (props: LoginProps) => {

    const [view, setView] = useState<PageView>(PageView.signin);
    const [successPage, setSuccessPage] = useState<'signin' | 'signup' | 'resetpassword' | 'resendverifylink' | null>(null);
    const [signinFormErrorMessages, setSigninFormErrorMessages] = useState<SigninFormErrorMessages>({});
    const [signupFormErrorMessages, setSignupFormErrorMessages] = useState<SignupFormErrorMessages>({});
    const [forgotPasswordFormErrorMessages, setForgotPasswordFormErrorMessages] = useState<ForgotPasswordFormErrorMessages>({});
    const [resendVerifyLinkFormErrorMessages, setResendVerifyLinkFormErrorMessages] = useState<ResendVerifyLinkFormErrorMessages>({});

    const onSignin = (data: SigninRequest) => {
        AuthenticationService.signin("production", 228, data).then((response: SigninResponse) => {
            if (response.outcome === 'SUCCESS') {
                setView(PageView.placeholder);
                setSuccessPage("signin")
            }
            setSigninFormErrorMessages(response.errorMessages);
        })
    }

    const onSignup = (data: SignupRequest) => {
        AuthenticationService.signup("production", 228, data, "1d9524a6-30df-4b3c-9402-503f4011896c").then((response: SignupResponse) => {
            console.log(response);
            if (response.outcome === "SUCCESS") {
                setView(PageView.placeholder);
                setSuccessPage("signup");
            }
            setSignupFormErrorMessages(response.errorMessages);
        })
    }

    const onForgotPassword = (data: SignupRequest) => {
        AuthenticationService.resetPasswordLink("production", 228, data).then((response: ForgotPasswordResponse) => {
            console.log(response);
            if (response.outcome === "SUCCESS") {
                setView(PageView.placeholder);
                setSuccessPage("resetpassword");
            }
            setForgotPasswordFormErrorMessages(response.errorMessages);
        })
    }

    const onResendVerifyLink = (data: ResendVerifyLinkRequest) => {
        AuthenticationService.resendVerifyLink("production", 228, data).then((response: ResendVerifyLinkResponse) => {
            console.log(response);
            if (response.outcome === "SUCCESS") {
                setView(PageView.placeholder);
                setSuccessPage("resendverifylink");
            }
            setResendVerifyLinkFormErrorMessages(response.errorMessages);
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
            onForgotPassword={onForgotPassword}
            onResendVerifyLink={onResendVerifyLink}
            signinFormErrorMessages={signinFormErrorMessages}
            signupFormErrorMessages={signupFormErrorMessages}
            forgotPasswordFormErrorMessages={forgotPasswordFormErrorMessages}
            resendVerifyLinkFormErrorMessages={resendVerifyLinkFormErrorMessages}
            clearErrorMessages={clearErrorMessages}
            view={view}
            changeView={setView}
        >
            <Logo>
                <img src={authliteBlack} alt="Authlite logo" />
            </Logo>
            <Placeholder>
                {successPage === "signin" && <InfoPage heading='Authentication successful!'>
                    <InfoPageDescription>
                        Posuere ipsum tellus ornare rutrumaliquam torquent fermentum euismod musvestibulum tincidunt cursus quisque elitsuspendisse augue. rutrumaliquam commodo <a onClick={() => setView(PageView.signin)}>login now</a> parturient rutrumaliquam nec varius sociosqu.
                    </InfoPageDescription>
                    <InfoPageFootnote>
                        Commodo nullam et facilisis hendrerit pharetra platea duis commodo nascetur libero aptent
                    </InfoPageFootnote>
                </InfoPage>}
                {successPage === "signup" && <InfoPage heading='User account created!'>
                    <InfoPageDescription>
                        Gravida dolor suscipit urna sagittis per  <a onClick={() => setView(PageView.signin)}>login now</a> parturient eu. laoreet congue fermentum ipsum tincidunt elementum auctor aptent aliquam feugiat interdum. porta sem metus convallis donec nam sodales.
                    </InfoPageDescription>
                    <InfoPageFootnote>
                        Rutrum elit lacus consequat justo luctus per proin venenatis varius quam dui dignissim etiam
                    </InfoPageFootnote>
                </InfoPage>}
                {successPage === "resetpassword" && <InfoPage heading='Password reset link sent!'>
                    <InfoPageDescription>
                        Gravida dolor suscipit urna sagittis per  <a onClick={() => setView(PageView.signin)}>login now</a> parturient eu. laoreet congue fermentum ipsum tincidunt elementum auctor aptent aliquam feugiat interdum. porta sem metus convallis donec nam sodales.
                    </InfoPageDescription>
                    <InfoPageFootnote>
                        Rutrum elit lacus consequat justo luctus per proin venenatis varius quam dui dignissim etiam
                    </InfoPageFootnote>
                </InfoPage>}
                {successPage === "resendverifylink" && <InfoPage heading='Email confirmation link sent!'>
                    <InfoPageDescription>
                        Please check your email for  <a onClick={() => setView(PageView.signin)}>login now</a> parturient eu. laoreet congue fermentum ipsum tincidunt elementum auctor aptent aliquam feugiat interdum. porta sem metus convallis donec nam sodales.
                    </InfoPageDescription>
                    <InfoPageFootnote>
                        Rutrum elit lacus consequat justo luctus per proin venenatis varius quam dui dignissim etiam
                    </InfoPageFootnote>
                </InfoPage>}
            </Placeholder>
        </Login>
    );
};

export default LoginWrapper;