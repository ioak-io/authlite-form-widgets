import React, { useState, useRef, useEffect } from "react";

import "./style.css";
import DesignOne from "./DesignOne";
import Login, { LoginProps } from ".";
import Logo from "../Logo";
import authliteBlack from "./authlite_black.svg";
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
import ValidateConfirmEmailLinkRequest from "../types/ValidateConfirmEmailLinkRequestType";
import ValidateConfirmEmailLinkMessages from "../types/ValidateConfirmEmailLinkMessagesType";
import ValidateConfirmEmailLinkResponse from "../types/ValidateConfirmEmailLinkResponseType";

export type LoginWrapperProps = {
  children?: any;
  code?: string;
};

/**
 * Component to render Login form element.
 */
const LoginWrapper = (props: LoginProps) => {
  // const [view, setView] = useState<PageView>(PageView.signin);
  const [view, setView] = useState<PageView>(PageView.confirmemail);
  const [successPage, setSuccessPage] = useState<
    | "signin"
    | "signup"
    | "resetpassword"
    | "resendverifylink"
    | "confirmemail"
    | null
  >(null);
  const [signinFormErrorMessages, setSigninFormErrorMessages] =
    useState<SigninFormErrorMessages>({});
  const [signupFormErrorMessages, setSignupFormErrorMessages] =
    useState<SignupFormErrorMessages>({});
  const [forgotPasswordFormErrorMessages, setForgotPasswordFormErrorMessages] =
    useState<ForgotPasswordFormErrorMessages>({});
  const [
    validateConfirmEmailLinkMessages,
    setValidateConfirmEmailLinkMessages,
  ] = useState<ValidateConfirmEmailLinkMessages>({});
  const [
    resendVerifyLinkFormErrorMessages,
    setResendVerifyLinkFormErrorMessages,
  ] = useState<ResendVerifyLinkFormErrorMessages>({});

  const onSignin = (data: SigninRequest) => {
    AuthenticationService.signin("local", 210, data).then(
      (response: SigninResponse) => {
        if (response.outcome === "SUCCESS") {
          setView(PageView.placeholder);
          setSuccessPage("signin");
        }
        setSigninFormErrorMessages(response.errorMessages);
      }
    );
  };

  const onSignup = (data: SignupRequest) => {
    AuthenticationService.signup(
      "local",
      210,
      data,
      "245556b1-0d9e-4e84-a512-d1081dd53cb0"
    ).then((response: SignupResponse) => {
      console.log(response);
      if (response.outcome === "SUCCESS") {
        setView(PageView.placeholder);
        setSuccessPage("signup");
      }
      setSignupFormErrorMessages(response.errorMessages);
    });
  };

  const onForgotPassword = (data: SignupRequest) => {
    AuthenticationService.resetPasswordLink("local", 210, data).then(
      (response: ForgotPasswordResponse) => {
        if (response.outcome === "SUCCESS") {
          setView(PageView.placeholder);
          setSuccessPage("resetpassword");
        }
        setForgotPasswordFormErrorMessages(response.errorMessages);
      }
    );
  };

  const onResendVerifyLink = (data: ResendVerifyLinkRequest) => {
    AuthenticationService.resendVerifyLink("local", 210, data).then(
      (response: ResendVerifyLinkResponse) => {
        if (response.outcome === "SUCCESS") {
          setView(PageView.placeholder);
          setSuccessPage("resendverifylink");
        }
        setResendVerifyLinkFormErrorMessages(response.errorMessages);
      }
    );
  };

  const onValidateConfirmEmailLink = (
    data: ValidateConfirmEmailLinkRequest
  ) => {
    AuthenticationService.confirmEmailLink("local", 210, data).then(
      (response: ValidateConfirmEmailLinkResponse) => {
        console.log(response);
        if (response.outcome === "SUCCESS") {
          setView(PageView.placeholder);
          setSuccessPage("confirmemail");
        }
        setValidateConfirmEmailLinkMessages(response.errorMessages);
      }
    );
  };

  const clearErrorMessages = () => {
    setSigninFormErrorMessages({});
    setSignupFormErrorMessages({});
  };

  return (
    <Login
      onSignin={onSignin}
      onSignup={onSignup}
      onForgotPassword={onForgotPassword}
      onResendVerifyLink={onResendVerifyLink}
      onValidateConfirmEmailLink={onValidateConfirmEmailLink}
      signinFormErrorMessages={signinFormErrorMessages}
      signupFormErrorMessages={signupFormErrorMessages}
      forgotPasswordFormErrorMessages={forgotPasswordFormErrorMessages}
      resendVerifyLinkFormErrorMessages={resendVerifyLinkFormErrorMessages}
      validateConfirmEmailLinkMessages={validateConfirmEmailLinkMessages}
      clearErrorMessages={clearErrorMessages}
      view={view}
      changeView={setView}
      code={props.code}
    >
      <Logo>
        <img src={authliteBlack} alt="Authlite logo" />
      </Logo>
      <Placeholder>
        {successPage === "signin" && (
          <InfoPage heading="Authentication successful!">
            <InfoPageDescription>
              Posuere ipsum tellus ornare rutrumaliquam torquent fermentum
              euismod musvestibulum tincidunt cursus quisque elitsuspendisse
              augue. rutrumaliquam commodo{" "}
              <a onClick={() => setView(PageView.signin)}>login now</a>{" "}
              parturient rutrumaliquam nec varius sociosqu.
            </InfoPageDescription>
            <InfoPageFootnote>
              Commodo nullam et facilisis hendrerit pharetra platea duis commodo
              nascetur libero aptent
            </InfoPageFootnote>
          </InfoPage>
        )}
        {successPage === "signup" && (
          <InfoPage heading="User account created!">
            <InfoPageDescription>
              Gravida dolor suscipit urna sagittis per{" "}
              <a onClick={() => setView(PageView.signin)}>login now</a>{" "}
              parturient eu. laoreet congue fermentum ipsum tincidunt elementum
              auctor aptent aliquam feugiat interdum. porta sem metus convallis
              donec nam sodales.
            </InfoPageDescription>
            <InfoPageFootnote>
              Rutrum elit lacus consequat justo luctus per proin venenatis
              varius quam dui dignissim etiam
            </InfoPageFootnote>
          </InfoPage>
        )}
        {successPage === "resetpassword" && (
          <InfoPage heading="Password reset link sent!">
            <InfoPageDescription>
              Gravida dolor suscipit urna sagittis per{" "}
              <a onClick={() => setView(PageView.signin)}>login now</a>{" "}
              parturient eu. laoreet congue fermentum ipsum tincidunt elementum
              auctor aptent aliquam feugiat interdum. porta sem metus convallis
              donec nam sodales.
            </InfoPageDescription>
            <InfoPageFootnote>
              Rutrum elit lacus consequat justo luctus per proin venenatis
              varius quam dui dignissim etiam
            </InfoPageFootnote>
          </InfoPage>
        )}
        {successPage === "resendverifylink" && (
          <InfoPage heading="Email confirmation link sent!">
            <InfoPageDescription>
              Please check your email for{" "}
              <a onClick={() => setView(PageView.signin)}>login now</a>{" "}
              parturient eu. laoreet congue fermentum ipsum tincidunt elementum
              auctor aptent aliquam feugiat interdum. porta sem metus convallis
              donec nam sodales.
            </InfoPageDescription>
            <InfoPageFootnote>
              Rutrum elit lacus consequat justo luctus per proin venenatis
              varius quam dui dignissim etiam
            </InfoPageFootnote>
          </InfoPage>
        )}
        {successPage === "confirmemail" && (
          <InfoPage heading="Email account verified!">
            <InfoPageDescription>
              Your email is verified and the account setup process is complete.
              You can <a onClick={() => setView(PageView.signin)}>login now</a>{" "}
              to your account.
            </InfoPageDescription>
            <InfoPageFootnote>
              Rutrum elit lacus consequat justo luctus per proin venenatis
              varius quam dui dignissim etiam
            </InfoPageFootnote>
          </InfoPage>
        )}
      </Placeholder>
    </Login>
  );
};

export default LoginWrapper;
