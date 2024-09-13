import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../Header";
import SigninForm from "../../SigninForm";
import SignupForm from "../../SignupForm";
import ForgotPasswordForm from "../../ForgotPasswordForm";
import SigninFormErrorMessages from "../../types/SigninFormErrorMessagesType";
import SignupFormErrorMessages from "../../types/SignupFormErrorMessagesType";
import { TranslationDictionary } from "../../types/TranslationDictionaryType";
import PageView from "../../types/PageViewType";
import ResendVerifyLinkForm from "../../ResendVerifyLinkForm";
import ForgotPasswordFormErrorMessages from "../../types/ForgotPasswordFormErrorMessagesType";
import ResendVerifyLinkFormErrorMessages from "../../types/ResendVerifyLinkFormErrorMessagesType";
import ConfirmEmailForm from "../../ConfirmEmailForm";
import ValidateConfirmEmailLinkMessages from "../../types/ValidateConfirmEmailLinkMessagesType";
import MyProfileForm from "../../MyProfileForm";
import MyProfileFormErrorMessages from "../../types/MyProfileFormErrorMessagesType";
import ResetPasswordForm from "../../ResetPasswordForm";
import ValidateResetPasswordLinkMessages from "../../types/ValidateResetPasswordLinkMessagesType";
import ResetPasswordFormErrorMessages from "../../types/ResetPasswordFormErrorMessagesType";

interface Props {
  logo?: any;
  placeholder?: any;
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
  signinFormErrorMessages: SigninFormErrorMessages;
  signupFormErrorMessages: SignupFormErrorMessages;
  forgotPasswordFormErrorMessages: ForgotPasswordFormErrorMessages;
  resendVerifyLinkFormErrorMessages: ResendVerifyLinkFormErrorMessages;
  myProfileFormErrorMessages: MyProfileFormErrorMessages;
  validateConfirmEmailLinkMessages: ValidateConfirmEmailLinkMessages;
  validateResetPasswordLinkMessages: ValidateResetPasswordLinkMessages;
  resetPasswordFormErrorMessages: ResetPasswordFormErrorMessages;
  clearErrorMessages: any;
  dictionary: TranslationDictionary;
  view: PageView;
  changeView: any;
  code?: string;
}

const MainForm = (props: Props) => {
  useEffect(() => {
    if (props.signinFormErrorMessages.unverifiedEmail) {
      props.changeView(PageView.resendverifyemail);
    }
  }, [props.signinFormErrorMessages]);

  const changeView = (_view: PageView) => {
    props.changeView(_view);
    props.clearErrorMessages();
  };

  return (
    <div className="authlite-mainform">
      <Header>{props.logo}</Header>
      {props.view === PageView.signin && (
        <SigninForm
          onSignin={props.onSignin}
          onGoogleAuth={props.onGoogleAuth}
          onSignup={() => changeView(PageView.signup)}
          onForgotPassword={() => changeView(PageView.forgotpassword)}
          signinFormErrorMessages={props.signinFormErrorMessages}
          dictionary={props.dictionary}
        />
      )}
      {props.view === PageView.signup && (
        <SignupForm
          onSignup={props.onSignup}
          onSignin={() => changeView(PageView.signin)}
          signupFormErrorMessages={props.signupFormErrorMessages}
          dictionary={props.dictionary}
        />
      )}
      {props.view === PageView.forgotpassword && (
        <ForgotPasswordForm
          onForgotPassword={props.onForgotPassword}
          onSignin={() => changeView(PageView.signin)}
          forgotPasswordFormErrorMessages={
            props.forgotPasswordFormErrorMessages
          }
          dictionary={props.dictionary}
        />
      )}
      {props.view === PageView.resetpassword && (
        <ResetPasswordForm
          onResetPassword={props.onResetPassword}
          onValidateResetPasswordLink={props.onValidateResetPasswordLink}
          resetPasswordFormErrorMessages={props.resetPasswordFormErrorMessages}
          validateResetPasswordLinkMessages={
            props.validateResetPasswordLinkMessages
          }
          code={props.code || ""}
          dictionary={props.dictionary}
        />
      )}
      {props.view === PageView.resendverifyemail && (
        <ResendVerifyLinkForm
          email={props.signinFormErrorMessages.unverifiedEmail || ""}
          onSignin={() => changeView(PageView.signin)}
          onResendVerifyLink={props.onResendVerifyLink}
          resendVerifyLinkFormErrorMessages={
            props.resendVerifyLinkFormErrorMessages
          }
          dictionary={props.dictionary}
        />
      )}
      {props.view === PageView.confirmemail && (
        <ConfirmEmailForm
          onValidateConfirmEmailLink={props.onValidateConfirmEmailLink}
          dictionary={props.dictionary}
          code={props.code || ""}
          validateConfirmEmailLinkMessages={
            props.validateConfirmEmailLinkMessages
          }
        />
      )}
      {props.view === PageView.myprofile && (
        <MyProfileForm
          onUpdateProfile={props.onUpdateProfile}
          onChangePassword={props.onChangePassword}
          myProfileFormErrorMessages={props.myProfileFormErrorMessages}
          dictionary={props.dictionary}
        />
      )}
      {props.view === PageView.placeholder && props.placeholder}
    </div>
  );
};

export default MainForm;
