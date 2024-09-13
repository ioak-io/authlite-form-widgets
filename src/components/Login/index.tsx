import React, { useState, useRef, useEffect } from "react";

import "./style.css";
import DesignOne from "./DesignOne";
import SigninFormErrorMessages from "../types/SigninFormErrorMessagesType";
import SignupFormErrorMessages from "../types/SignupFormErrorMessagesType";
import {
  DEFAULT_TRANSLATION_DICTIONARY,
  TranslationDictionary,
} from "../types/TranslationDictionaryType";
import PageView from "../types/PageViewType";
import ForgotPasswordFormErrorMessages from "../types/ForgotPasswordFormErrorMessagesType";
import ResendVerifyLinkFormErrorMessages from "../types/ResendVerifyLinkFormErrorMessagesType";
import ValidateConfirmEmailLinkMessages from "../types/ValidateConfirmEmailLinkMessagesType";
import MyProfileFormErrorMessages from "../types/MyProfileFormErrorMessagesType";
import ValidateResetPasswordLinkMessages from "../types/ValidateResetPasswordLinkMessagesType";
import ResetPasswordFormErrorMessages from "../types/ResetPasswordFormErrorMessagesType";

export type LoginProps = {
  onSignin: any;
  onSignup: any;
  onGoogleAuth: any;
  onForgotPassword: any;
  onResendVerifyLink: any;
  onValidateConfirmEmailLink: any;
  onUpdateProfile: any;
  onChangePassword: any;
  onValidateResetPasswordLink: any;
  onResetPassword: any;
  children?: any;
  signinFormErrorMessages: SigninFormErrorMessages;
  signupFormErrorMessages: SignupFormErrorMessages;
  forgotPasswordFormErrorMessages: ForgotPasswordFormErrorMessages;
  resendVerifyLinkFormErrorMessages: ResendVerifyLinkFormErrorMessages;
  myProfileFormErrorMessages: MyProfileFormErrorMessages;
  validateConfirmEmailLinkMessages: ValidateConfirmEmailLinkMessages;
  validateResetPasswordLinkMessages: ValidateResetPasswordLinkMessages;
  resetPasswordFormErrorMessages: ResetPasswordFormErrorMessages;
  clearErrorMessages: any;
  dictionary?: TranslationDictionary;
  view: PageView;
  changeView: any;
  code?: string;
};

/**
 * Component to render Login form element.
 */
const Login = (props: LoginProps) => {
  const [logo, setLogo] = useState<any>(null);
  const [placeholder, setPlaceholder] = useState<any>(null);

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (code) {
    // Send the authorization code to the parent window
    // window.opener.postMessage({ code }, window.location.origin);
    localStorage.setItem("code", code);
    // Close the popup window

    event?.preventDefault();
    event?.stopPropagation();
    setTimeout(() => {
      top.window.close();
    }, 0);
  }

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
      if (
        item.type.displayName === "Placeholder" ||
        item.type.name === "Placeholder"
      ) {
        setPlaceholder(item);
      }
    });
  }, [props.children]);

  return (
    <div className="authlite-login">
      <DesignOne
        onSignin={props.onSignin}
        onGoogleAuth={props.onGoogleAuth}
        onSignup={props.onSignup}
        onChangePassword={props.onChangePassword}
        onUpdateProfile={props.onUpdateProfile}
        onResetPassword={props.onResetPassword}
        onValidateResetPasswordLink={props.onValidateResetPasswordLink}
        myProfileFormErrorMessages={props.myProfileFormErrorMessages}
        signinFormErrorMessages={props.signinFormErrorMessages}
        signupFormErrorMessages={props.signupFormErrorMessages}
        forgotPasswordFormErrorMessages={props.forgotPasswordFormErrorMessages}
        resendVerifyLinkFormErrorMessages={
          props.resendVerifyLinkFormErrorMessages
        }
        validateConfirmEmailLinkMessages={
          props.validateConfirmEmailLinkMessages
        }
        resetPasswordFormErrorMessages={props.resetPasswordFormErrorMessages}
        validateResetPasswordLinkMessages={
          props.validateResetPasswordLinkMessages
        }
        clearErrorMessages={props.clearErrorMessages}
        logo={logo}
        placeholder={placeholder}
        dictionary={props.dictionary || DEFAULT_TRANSLATION_DICTIONARY}
        view={props.view}
        changeView={props.changeView}
        onForgotPassword={props.onForgotPassword}
        onResendVerifyLink={props.onResendVerifyLink}
        onValidateConfirmEmailLink={props.onValidateConfirmEmailLink}
        code={props.code}
      />
    </div>
  );
};

export default Login;
