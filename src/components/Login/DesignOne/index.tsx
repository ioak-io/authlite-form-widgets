import React, { useEffect, useState } from "react";
import "./style.css";
import SigninFormErrorMessages from "../../types/SigninFormErrorMessagesType";
import SignupFormErrorMessages from "../../types/SignupFormErrorMessagesType";
import { TranslationDictionary } from "../../types/TranslationDictionaryType";
import PageView from "../../types/PageViewType";
import ForgotPasswordFormErrorMessages from "../../types/ForgotPasswordFormErrorMessagesType";
import ResendVerifyLinkFormErrorMessages from "../../types/ResendVerifyLinkFormErrorMessagesType";
import MainForm from "../MainForm";
import ValidateConfirmEmailLinkMessages from "../../types/ValidateConfirmEmailLinkMessagesType";
import MyProfileFormErrorMessages from "../../types/MyProfileFormErrorMessagesType";
import ValidateResetPasswordLinkMessages from "../../types/ValidateResetPasswordLinkMessagesType";
import ResetPasswordFormErrorMessages from "../../types/ResetPasswordFormErrorMessagesType";
import UpdateUserImageErrorMessages from "../../types/UpdateUserImageErrorMessagesType";
import { AuthliteTypes } from "../../..";
import { UserClaims } from "../../types";

interface Props {
  logo?: any;
  placeholder?: any;
  onSignin: any;
  onSignup: any;
  onForgotPassword: any;
  onResendVerifyLink: any;
  onValidateConfirmEmailLink: any;
  onUpdateProfile: any;
  onChangePassword: any;
  onValidateResetPasswordLink: any;
  onResetPassword: any;
  onUpdateUserImage: any;
  signinFormErrorMessages: SigninFormErrorMessages;
  signupFormErrorMessages: SignupFormErrorMessages;
  forgotPasswordFormErrorMessages: ForgotPasswordFormErrorMessages;
  resendVerifyLinkFormErrorMessages: ResendVerifyLinkFormErrorMessages;
  myProfileFormErrorMessages: MyProfileFormErrorMessages;
  validateConfirmEmailLinkMessages: ValidateConfirmEmailLinkMessages;
  validateResetPasswordLinkMessages: ValidateResetPasswordLinkMessages;
  resetPasswordFormErrorMessages: ResetPasswordFormErrorMessages;
  updateUserImageErrorMessages: UpdateUserImageErrorMessages;
  clearErrorMessages: any;
  dictionary: TranslationDictionary;
  view: PageView;
  changeView: any;
  userClaims?: UserClaims;
  code?: string;
  accessToken?: string;
}

const DesignOne = (props: Props) => {
  useEffect(() => {
    if (props.signinFormErrorMessages.unverifiedEmail) {
      props.changeView(PageView.resendverifyemail);
    }
  }, [props.signinFormErrorMessages]);

  return (
    <div className="authlite-d1">
      <div className="authlite-d1__left" />
      <div className="authlite-d1__right">
        <MainForm
          onSignin={props.onSignin}
          onSignup={props.onSignup}
          onChangePassword={props.onChangePassword}
          onUpdateProfile={props.onUpdateProfile}
          onResetPassword={props.onResetPassword}
          onValidateResetPasswordLink={props.onValidateResetPasswordLink}
          onUpdateUserImage={props.onUpdateUserImage}
          myProfileFormErrorMessages={props.myProfileFormErrorMessages}
          signinFormErrorMessages={props.signinFormErrorMessages}
          signupFormErrorMessages={props.signupFormErrorMessages}
          forgotPasswordFormErrorMessages={
            props.forgotPasswordFormErrorMessages
          }
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
          updateUserImageErrorMessages={props.updateUserImageErrorMessages}
          clearErrorMessages={props.clearErrorMessages}
          logo={props.logo}
          placeholder={props.placeholder}
          dictionary={props.dictionary}
          view={props.view}
          changeView={props.changeView}
          onForgotPassword={props.onForgotPassword}
          onResendVerifyLink={props.onResendVerifyLink}
          onValidateConfirmEmailLink={props.onValidateConfirmEmailLink}
          userClaims={props.userClaims}
          code={props.code}
        />
      </div>
    </div>
  );
};

export default DesignOne;
