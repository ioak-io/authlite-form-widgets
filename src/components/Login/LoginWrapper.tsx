import React, { useState, useRef, useEffect } from "react";

import "./style.css";
import Login, { LoginProps } from ".";
import Logo from "../Logo";
import authliteBlack from "./authlite_black.svg";
import PageView from "../types/PageViewType";
import Placeholder from "../Placeholder";
import InfoPage from "../InfoPage";
import InfoPageFootnote from "../InfoPage/InfoPageFootnote";
import InfoPageDescription from "../InfoPage/InfoPageDescription";
import {
  AuthliteAuthenticationService,
  AuthliteComponents,
  AuthliteTypes,
} from "../..";
import { UpdateUserImageErrorMessages, UserClaims } from "../types";
import {
  getSessionValue,
  getSessionValueAsJson,
  setSessionValue,
  setSessionValueAsJson,
} from "./SessionUtils";

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

const emailConfirmationPageLink = undefined;
const resetPasswordPageLink = undefined;

const LoginWrapper = (props: LoginProps) => {
  const [view, setView] = useState<AuthliteTypes.PageView>(
    AuthliteTypes.PageView.myprofile
  );
  const [accessToken, setAccessToken] = useState("");
  const [userClaims, setUserClaims] = useState<UserClaims>();
  const [successPage, setSuccessPage] = useState<
    | "signin"
    | "signup"
    | "forgotpassword"
    | "resetpassword"
    | "resendverifylink"
    | "confirmemail"
    | "myprofile"
    | null
  >(null);
  const [forgotPasswordFormErrorMessages, setForgotPasswordFormErrorMessages] =
    useState<AuthliteTypes.ForgotPasswordFormErrorMessages>({});
  const [
    resendVerifyLinkFormErrorMessages,
    setResendVerifyLinkFormErrorMessages,
  ] = useState<AuthliteTypes.ResendVerifyLinkFormErrorMessages>({});
  const [myProfileFormErrorMessages, setMyProfileFormErrorMessages] =
    useState<AuthliteTypes.MyProfileFormErrorMessages>({});
  const [signinFormErrorMessages, setSigninFormErrorMessages] =
    useState<AuthliteTypes.SigninFormErrorMessages>({});
  const [signupFormErrorMessages, setSignupFormErrorMessages] =
    useState<AuthliteTypes.SignupFormErrorMessages>({});
  const [
    validateConfirmEmailLinkMessages,
    setValidateConfirmEmailLinkMessages,
  ] = useState<AuthliteTypes.ValidateConfirmEmailLinkMessages>({});
  const [
    validateResetPasswordLinkMessages,
    setValidateResetPasswordLinkMessages,
  ] = useState<AuthliteTypes.ValidateResetPasswordLinkMessages>({
    outcome: "unknown",
  });
  const [resetPasswordFormErrorMessages, setResetPasswordFormErrorMessages] =
    useState<AuthliteTypes.ResetPasswordFormErrorMessages>({});
  const [updateUserImageErrorMessages, setUpdateUserImageErrorMessages] =
    useState<AuthliteTypes.UpdateUserImageErrorMessages>({});

  const onSignin = (payload: AuthliteTypes.SigninRequest) => {
    AuthliteAuthenticationService.signin(environment, realm, payload).then(
      (response: AuthliteTypes.SigninResponse) => {
        console.log(response);
        setSigninFormErrorMessages(response.errorMessages);
        if (response.outcome === "SUCCESS") {
          setView(AuthliteTypes.PageView.placeholder);
          setSuccessPage("signin");
          setSessionValueAsJson(`authlitewidget-claims`, response.data.claims);
          setSessionValue(
            `authlitewidget-access_token`,
            response.data.access_token
          );
          setSessionValue(
            `authlitewidget-refresh_token`,
            response.data.refresh_token
          );
        }
      }
    );
  };

  const onSignup = (data: AuthliteTypes.SignupRequest) => {
    AuthliteAuthenticationService.signup(
      environment,
      realm,
      data,
      apiKey,
      emailConfirmationPageLink
    ).then((response: AuthliteTypes.SignupResponse) => {
      if (response.outcome === "SUCCESS") {
        setView(AuthliteTypes.PageView.placeholder);
        setSuccessPage("signup");
      }
      setSignupFormErrorMessages(response.errorMessages);
    });
  };

  const onForgotPassword = (data: AuthliteTypes.ForgotPasswordRequest) => {
    AuthliteAuthenticationService.resetPasswordLink(
      environment,
      realm,
      data,
      resetPasswordPageLink
    ).then((response: AuthliteTypes.ForgotPasswordResponse) => {
      if (response.outcome === "SUCCESS") {
        setView(AuthliteTypes.PageView.placeholder);
        setSuccessPage("forgotpassword");
      }
      setForgotPasswordFormErrorMessages(response.errorMessages);
    });
  };

  const onResendVerifyLink = (data: AuthliteTypes.ResendVerifyLinkRequest) => {
    AuthliteAuthenticationService.resendVerifyLink(
      environment,
      realm,
      data,
      emailConfirmationPageLink
    ).then((response: AuthliteTypes.ResendVerifyLinkResponse) => {
      if (response.outcome === "SUCCESS") {
        setView(AuthliteTypes.PageView.placeholder);
        setSuccessPage("resendverifylink");
      }
      setResendVerifyLinkFormErrorMessages(response.errorMessages);
    });
  };

  const onValidateConfirmEmailLink = (
    data: AuthliteTypes.ValidateConfirmEmailLinkRequest
  ) => {
    AuthliteAuthenticationService.confirmEmailLink(
      environment,
      realm,
      data
    ).then((response: AuthliteTypes.ValidateConfirmEmailLinkResponse) => {
      if (response.outcome === "SUCCESS") {
        setView(AuthliteTypes.PageView.placeholder);
        setSuccessPage("confirmemail");
      }
      setValidateConfirmEmailLinkMessages(response.errorMessages);
    });
  };

  const onValidateResetPasswordLink = (
    data: AuthliteTypes.ValidateConfirmEmailLinkRequest
  ) => {
    AuthliteAuthenticationService.onValidateResetPasswordLink(
      environment,
      realm,
      data
    ).then((response: AuthliteTypes.ValidateResetPasswordLinkResponse) => {
      setValidateResetPasswordLinkMessages(response.errorMessages);
    });
  };

  const onResetPassword = (data: AuthliteTypes.ResetPasswordRequest) => {
    AuthliteAuthenticationService.onResetPassword(
      environment,
      realm,
      data
    ).then((response: AuthliteTypes.ResetPasswordResponse) => {
      if (response.outcome === "SUCCESS") {
        setView(AuthliteTypes.PageView.placeholder);
        setSuccessPage("resetpassword");
      }
      setResetPasswordFormErrorMessages(response.errorMessages);
    });
  };

  const onChangePassword = (data: AuthliteTypes.ChangePasswordRequest) => {};

  const onUpdateProfile = (data: AuthliteTypes.UpdateProfileRequest) => {
    AuthliteAuthenticationService.onUpdateUserProfile(
      environment,
      realm,
      data,
      accessToken
    ).then((response: AuthliteTypes.UpdateUserImageResponse) => {
      if (response.outcome === "SUCCESS") {
        setView(AuthliteTypes.PageView.placeholder);
        setSuccessPage("myprofile");
      }
      setUpdateUserImageErrorMessages(response.errorMessages);
    });
  };

  const onUpdateUserImage = (data: AuthliteTypes.UpdateUserImageRequest) => {
    AuthliteAuthenticationService.onUpdateUserImage(
      environment,
      realm,
      data,
      accessToken
    ).then((response: AuthliteTypes.UpdateUserImageResponse) => {
      if (response.outcome === "SUCCESS") {
        setView(AuthliteTypes.PageView.placeholder);
        setSuccessPage("resetpassword");
      }
      setUpdateUserImageErrorMessages(response.errorMessages);
    });
  };

  const clearErrorMessages = () => {
    setSigninFormErrorMessages({});
    setSignupFormErrorMessages({});
  };

  useEffect(() => {
    setAccessToken(getSessionValue("authlitewidget-access_token") || "");
    setUserClaims(getSessionValueAsJson("authlitewidget-claims") || {});
  }, []);

  return (
    <AuthliteComponents.Login
      onSignin={onSignin}
      onSignup={onSignup}
      onForgotPassword={onForgotPassword}
      onResendVerifyLink={onResendVerifyLink}
      onValidateConfirmEmailLink={onValidateConfirmEmailLink}
      onValidateResetPasswordLink={onValidateResetPasswordLink}
      onResetPassword={onResetPassword}
      onChangePassword={onChangePassword}
      onUpdateProfile={onUpdateProfile}
      onUpdateUserImage={onUpdateUserImage}
      myProfileFormErrorMessages={myProfileFormErrorMessages}
      signinFormErrorMessages={signinFormErrorMessages}
      signupFormErrorMessages={signupFormErrorMessages}
      forgotPasswordFormErrorMessages={forgotPasswordFormErrorMessages}
      resendVerifyLinkFormErrorMessages={resendVerifyLinkFormErrorMessages}
      validateConfirmEmailLinkMessages={validateConfirmEmailLinkMessages}
      resetPasswordFormErrorMessages={resetPasswordFormErrorMessages}
      validateResetPasswordLinkMessages={validateResetPasswordLinkMessages}
      updateUserImageErrorMessages={updateUserImageErrorMessages}
      userClaims={userClaims}
      clearErrorMessages={clearErrorMessages}
      view={view}
      changeView={setView}
    >
      <AuthliteComponents.Logo>
        <img src={authliteBlack} alt="Authlite logo" />
      </AuthliteComponents.Logo>
      <AuthliteComponents.Placeholder>
        {successPage === "signin" && (
          <AuthliteComponents.InfoPage heading="Authentication successful!">
            <AuthliteComponents.InfoPageDescription>
              Posuere ipsum tellus ornare rutrumaliquam torquent fermentum
              euismod musvestibulum tincidunt cursus quisque elitsuspendisse
              augue. rutrumaliquam commodo{" "}
              <a onClick={() => setView(AuthliteTypes.PageView.signin)}>
                login now
              </a>{" "}
              parturient rutrumaliquam nec varius sociosqu.
            </AuthliteComponents.InfoPageDescription>
            <AuthliteComponents.InfoPageFootnote>
              Commodo nullam et facilisis hendrerit pharetra platea duis commodo
              nascetur libero aptent
            </AuthliteComponents.InfoPageFootnote>
          </AuthliteComponents.InfoPage>
        )}
        {successPage === "signup" && (
          <AuthliteComponents.InfoPage heading="User account created!">
            <AuthliteComponents.InfoPageDescription>
              Gravida dolor suscipit urna sagittis per{" "}
              <a onClick={() => setView(AuthliteTypes.PageView.signin)}>
                login now
              </a>{" "}
              parturient eu. laoreet congue fermentum ipsum tincidunt elementum
              auctor aptent aliquam feugiat interdum. porta sem metus convallis
              donec nam sodales.
            </AuthliteComponents.InfoPageDescription>
            <AuthliteComponents.InfoPageFootnote>
              Rutrum elit lacus consequat justo luctus per proin venenatis
              varius quam dui dignissim etiam
            </AuthliteComponents.InfoPageFootnote>
          </AuthliteComponents.InfoPage>
        )}
        {successPage === "forgotpassword" && (
          <AuthliteComponents.InfoPage heading="Password reset link sent!">
            <AuthliteComponents.InfoPageDescription>
              Gravida dolor suscipit urna sagittis per{" "}
              <a onClick={() => setView(AuthliteTypes.PageView.signin)}>
                login now
              </a>{" "}
              parturient eu. laoreet congue fermentum ipsum tincidunt elementum
              auctor aptent aliquam feugiat interdum. porta sem metus convallis
              donec nam sodales.
            </AuthliteComponents.InfoPageDescription>
            <AuthliteComponents.InfoPageFootnote>
              Rutrum elit lacus consequat justo luctus per proin venenatis
              varius quam dui dignissim etiam
            </AuthliteComponents.InfoPageFootnote>
          </AuthliteComponents.InfoPage>
        )}
        {successPage === "resetpassword" && (
          <AuthliteComponents.InfoPage heading="Password has been updated!">
            <AuthliteComponents.InfoPageDescription>
              Gravida dolor suscipit urna sagittis per{" "}
              <a onClick={() => setView(AuthliteTypes.PageView.signin)}>
                login now
              </a>{" "}
              parturient eu. laoreet congue fermentum ipsum tincidunt elementum
              auctor aptent aliquam feugiat interdum. porta sem metus convallis
              donec nam sodales.
            </AuthliteComponents.InfoPageDescription>
            <AuthliteComponents.InfoPageFootnote>
              Rutrum elit lacus consequat justo luctus per proin venenatis
              varius quam dui dignissim etiam
            </AuthliteComponents.InfoPageFootnote>
          </AuthliteComponents.InfoPage>
        )}
        {successPage === "resendverifylink" && (
          <AuthliteComponents.InfoPage heading="Email confirmation link sent!">
            <AuthliteComponents.InfoPageDescription>
              Please check your email for{" "}
              <a onClick={() => setView(AuthliteTypes.PageView.signin)}>
                login now
              </a>{" "}
              parturient eu. laoreet congue fermentum ipsum tincidunt elementum
              auctor aptent aliquam feugiat interdum. porta sem metus convallis
              donec nam sodales.
            </AuthliteComponents.InfoPageDescription>
            <AuthliteComponents.InfoPageFootnote>
              Rutrum elit lacus consequat justo luctus per proin venenatis
              varius quam dui dignissim etiam
            </AuthliteComponents.InfoPageFootnote>
          </AuthliteComponents.InfoPage>
        )}
        {successPage === "confirmemail" && (
          <AuthliteComponents.InfoPage heading="Email account verified!">
            <AuthliteComponents.InfoPageDescription>
              Your email is verified and the account setup process is complete.
              You can{" "}
              <a onClick={() => setView(AuthliteTypes.PageView.signin)}>
                login now
              </a>{" "}
              to your account.
            </AuthliteComponents.InfoPageDescription>
            <AuthliteComponents.InfoPageFootnote>
              Rutrum elit lacus consequat justo luctus per proin venenatis
              varius quam dui dignissim etiam
            </AuthliteComponents.InfoPageFootnote>
          </AuthliteComponents.InfoPage>
        )}
        {successPage === "myprofile" && (
          <AuthliteComponents.InfoPage heading="My profile updated">
            <AuthliteComponents.InfoPageDescription>
              <a onClick={() => setView(AuthliteTypes.PageView.signin)}>
                login now
              </a>
            </AuthliteComponents.InfoPageDescription>
          </AuthliteComponents.InfoPage>
        )}
      </AuthliteComponents.Placeholder>
    </AuthliteComponents.Login>
  );
};

export default LoginWrapper;
