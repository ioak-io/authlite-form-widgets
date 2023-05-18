import React, { useEffect, useState } from 'react';
import './style.css';
import Header from '../../Header';
import SigninForm from '../../SigninForm';
import SignupForm from '../../SignupForm';
import ForgotPasswordForm from '../../ForgotPasswordForm';
import SigninFormErrorMessages from '../../types/SigninFormErrorMessagesType';
import SignupFormErrorMessages from '../../types/SignupFormErrorMessagesType';
import { TranslationDictionary } from '../../types/TranslationDictionaryType';
import PageView from '../../types/PageViewType';
import ResendVerifyLinkForm from '../../ResendVerifyLinkForm';
import ForgotPasswordFormErrorMessages from '../../types/ForgotPasswordFormErrorMessagesType';
import ResendVerifyLinkFormErrorMessages from '../../types/ResendVerifyLinkFormErrorMessagesType';

interface Props {
  logo?: any;
  placeholder?: any;
  onSignin: any;
  onSignup: any;
  onForgotPassword: any;
  onResendVerifyLink: any;
  signinFormErrorMessages: SigninFormErrorMessages;
  signupFormErrorMessages: SignupFormErrorMessages;
  forgotPasswordFormErrorMessages: ForgotPasswordFormErrorMessages;
  resendVerifyLinkFormErrorMessages: ResendVerifyLinkFormErrorMessages;
  clearErrorMessages: any;
  dictionary: TranslationDictionary;
  view: PageView;
  changeView: any;
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
  }

  return <div className='authlite-mainform'>
    <Header>
      {props.logo}
    </Header>
    {props.view === PageView.signin && <SigninForm
      onSignin={props.onSignin}
      onSignup={() => changeView(PageView.signup)}
      onForgotPassword={() => changeView(PageView.forgotpassword)}
      signinFormErrorMessages={props.signinFormErrorMessages}
      dictionary={props.dictionary}
    />}
    {props.view === PageView.signup && <SignupForm
      onSignup={props.onSignup}
      onSignin={() => changeView(PageView.signin)}
      signupFormErrorMessages={props.signupFormErrorMessages}
      dictionary={props.dictionary}
    />}
    {props.view === PageView.forgotpassword && <ForgotPasswordForm
      onForgotPassword={props.onForgotPassword}
      onSignin={() => changeView(PageView.signin)}
      forgotPasswordFormErrorMessages={props.forgotPasswordFormErrorMessages}
      dictionary={props.dictionary}
    />}
    {props.view === PageView.resendverifyemail && <ResendVerifyLinkForm
      email={props.signinFormErrorMessages.unverifiedEmail || ''}
      onSignin={() => changeView(PageView.signin)}
      onResendVerifyLink={props.onResendVerifyLink}
      resendVerifyLinkFormErrorMessages={props.resendVerifyLinkFormErrorMessages}
      dictionary={props.dictionary}
    />}
    {props.view === PageView.placeholder && props.placeholder}
  </div>;
};

export default MainForm;
