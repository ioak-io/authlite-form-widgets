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
import MyProfileFormErrorMessages from "../types/MyProfileFormErrorMessagesType";
import ChangePasswordRequest from "../types/ChangePasswordRequestType";
import UpdateProfileRequest from "../types/UpdateProfileRequestType";
import ValidateResetPasswordLinkMessages from "../types/ValidateResetPasswordLinkMessagesType";
import ValidateResetPasswordLinkResponse from "../types/ValidateResetPasswordLinkResponseType";
import ResetPasswordFormErrorMessages from "../types/ResetPasswordFormErrorMessagesType";
import ResetPasswordRequest from "../types/ResetPasswordRequest";
import ResetPasswordResponse from "../types/ResetPasswordResponse";
import UserDetails from "../UserDetails";

export type LoginWrapperProps = {
  children?: any;
  code?: string;
};

/**
 * Component to render Login form element.
 */

const realm = 210;
const apiKey = "245556b1-0d9e-4e84-a512-d1081dd53cb0";
const environment = "local";

const LoginWrapper = (props: LoginProps) => {
  const [view, setView] = useState<PageView>(PageView.signin);
  // const [view, setView] = useState<PageView>(PageView.resetpassword);
  const [successPage, setSuccessPage] = useState<
    | "signin"
    | "signup"
    | "forgotpassword"
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
  const [myProfileFormErrorMessages, setMyProfileFormErrorMessages] =
    useState<MyProfileFormErrorMessages>({});
  const [
    validateResetPasswordLinkMessages,
    setValidateResetPasswordLinkMessages,
  ] = useState<ValidateResetPasswordLinkMessages>({ outcome: "unknown" });
  const [resetPasswordFormErrorMessages, setResetPasswordFormErrorMessages] =
    useState<ResetPasswordFormErrorMessages>({});
  const [user, setUser] = useState({});

  const onSignin = (data: SigninRequest) => {
    AuthenticationService.signin(environment, realm, data).then(
      (response: SigninResponse) => {
        if (response.outcome === "SUCCESS") {
          setView(PageView.placeholder);
          setSuccessPage("signin");
        }
        setSigninFormErrorMessages(response.errorMessages);
      }
    );
  };

  const onGoogleAuth = (code: string) => {
    AuthenticationService.onGoogleAuthSuccess(environment, code).then(
      (response: SigninResponse) => {
        if (response.outcome === "SUCCESS") {
          localStorage.setItem("user", response.data.userDetails);
          setUser(response.data.userDetails);
          localStorage.removeItem("code");
          setView(PageView.placeholder);
          setSuccessPage("signin");
        }
        setSigninFormErrorMessages(response.errorMessages);
      }
    );
  };

  const onSignup = (data: SignupRequest) => {
    AuthenticationService.signup(environment, realm, data, apiKey).then(
      (response: SignupResponse) => {
        console.log(response);
        if (response.outcome === "SUCCESS") {
          setView(PageView.placeholder);
          setSuccessPage("signup");
        }
        setSignupFormErrorMessages(response.errorMessages);
      }
    );
  };

  const onForgotPassword = (data: SignupRequest) => {
    AuthenticationService.resetPasswordLink(environment, realm, data).then(
      (response: ForgotPasswordResponse) => {
        if (response.outcome === "SUCCESS") {
          setView(PageView.placeholder);
          setSuccessPage("forgotpassword");
        }
        setForgotPasswordFormErrorMessages(response.errorMessages);
      }
    );
  };

  const onResendVerifyLink = (data: ResendVerifyLinkRequest) => {
    AuthenticationService.resendVerifyLink(environment, realm, data).then(
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
    AuthenticationService.confirmEmailLink(environment, realm, data).then(
      (response: ValidateConfirmEmailLinkResponse) => {
        if (response.outcome === "SUCCESS") {
          setView(PageView.placeholder);
          setSuccessPage("confirmemail");
        }
        setValidateConfirmEmailLinkMessages(response.errorMessages);
      }
    );
  };

  const onValidateResetPasswordLink = (
    data: ValidateConfirmEmailLinkRequest
  ) => {
    AuthenticationService.onValidateResetPasswordLink(
      environment,
      realm,
      data
    ).then((response: ValidateResetPasswordLinkResponse) => {
      setValidateResetPasswordLinkMessages(response.errorMessages);
    });
  };

  const onResetPassword = (data: ResetPasswordRequest) => {
    AuthenticationService.onResetPassword(environment, realm, data).then(
      (response: ResetPasswordResponse) => {
        if (response.outcome === "SUCCESS") {
          setView(PageView.placeholder);
          setSuccessPage("resetpassword");
        }
        setResetPasswordFormErrorMessages(response.errorMessages);
      }
    );
  };

  const onChangePassword = (data: ChangePasswordRequest) => {};

  const onUpdateProfile = (data: UpdateProfileRequest) => {};

  const clearErrorMessages = () => {
    setSigninFormErrorMessages({});
    setSignupFormErrorMessages({});
  };

  return (
    <Login
      onSignin={onSignin}
      onSignup={onSignup}
      onGoogleAuth={onGoogleAuth}
      onForgotPassword={onForgotPassword}
      onResendVerifyLink={onResendVerifyLink}
      onValidateConfirmEmailLink={onValidateConfirmEmailLink}
      onValidateResetPasswordLink={onValidateResetPasswordLink}
      onResetPassword={onResetPassword}
      onChangePassword={onChangePassword}
      onUpdateProfile={onUpdateProfile}
      myProfileFormErrorMessages={myProfileFormErrorMessages}
      signinFormErrorMessages={signinFormErrorMessages}
      signupFormErrorMessages={signupFormErrorMessages}
      forgotPasswordFormErrorMessages={forgotPasswordFormErrorMessages}
      resendVerifyLinkFormErrorMessages={resendVerifyLinkFormErrorMessages}
      validateConfirmEmailLinkMessages={validateConfirmEmailLinkMessages}
      resetPasswordFormErrorMessages={resetPasswordFormErrorMessages}
      validateResetPasswordLinkMessages={validateResetPasswordLinkMessages}
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
            <UserDetails
              firstName={user?.given_name}
              lastName={user?.family_name}
              imageUrl={user?.picture}
            />
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
        {successPage === "forgotpassword" && (
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
        {successPage === "resetpassword" && (
          <InfoPage heading="Password has been updated!">
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
