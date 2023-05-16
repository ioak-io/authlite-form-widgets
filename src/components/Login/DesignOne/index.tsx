import React, { useEffect, useState } from 'react';
import './style.css';
import Header from '../../Header';
import SigninForm from '../../SigninForm';
import SignupForm from '../../SignupForm';
import ForgotPasswordForm from '../../ForgotPasswordForm';
import SigninFormErrorMessages from '../../types/SigninFormErrorMessagesType';
import SignupFormErrorMessages from '../../types/SignupFormErrorMessagesType';
import { TranslationDictionary, TranslationScope, getTranslation } from '../../types/TranslationDictionaryType';
import SendVerifyLinkForm from '../../SendVerifyLinkForm';
import PageView from '../../types/PageViewType';

interface Props {
  logo?: any;
  tagline?: any;
  placeholder?: any;
  onSignin: any;
  onSignup: any;
  signinFormErrorMessages: SigninFormErrorMessages;
  signupFormErrorMessages: SignupFormErrorMessages;
  clearErrorMessages: any;
  dictionary?: TranslationDictionary;
  view: PageView;
  changeView: any;
}

const DesignOne = (props: Props) => {
  useEffect(() => {
    if (props.signinFormErrorMessages.unverifiedEmail) {
      props.changeView(PageView.resendverifyemail);
    }
  }, [props.signinFormErrorMessages]);

  const changeView = (_view: PageView) => {
    props.changeView(_view);
    props.clearErrorMessages();
  }

  return <div className='authlite-d1'>
    <div className="authlite-d1__left" />
    <div className="authlite-d1__right">
      <Header>
        {props.logo}
        {props.view === PageView.signin && props.tagline}
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
      {props.view === PageView.forgotpassword && <ForgotPasswordForm onSignin={() => changeView(PageView.signin)} />}
      {props.view === PageView.resendverifyemail && <SendVerifyLinkForm email={props.signinFormErrorMessages.unverifiedEmail || ''} onSignin={() => changeView(PageView.signin)} />}
      {props.view === PageView.placeholder && props.placeholder}
    </div>
  </div >;
};

export default DesignOne;
