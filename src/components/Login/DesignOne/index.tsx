import React, { useEffect, useState } from 'react';
import './style.css';
import Header from '../../Header';
import SigninForm from '../../SigninForm';
import SignupForm from '../../SignupForm';
import ForgotPasswordForm from '../../ForgotPasswordForm';
import SigninFormErrorMessages from '../../types/SigninFormErrorMessagesType';
import SignupFormErrorMessages from '../../types/SignupFormErrorMessagesType';
import { TranslationDictionary } from '../../types/TranslationDictionaryType';
import SendVerifyLinkForm from '../../SendVerifyLinkForm';

interface Props {
  logo?: any;
  tagline?: any;
  onSignin: any;
  onSignup: any;
  signinFormErrorMessages: SigninFormErrorMessages;
  signupFormErrorMessages: SignupFormErrorMessages;
  dictionary?: TranslationDictionary;
  clearErrorMessages: any;
}

const DesignOne = (props: Props) => {
  const [view, setView] = useState('signin');

  useEffect(() => {
    if (props.signinFormErrorMessages.unverifiedEmail) {
      setView('verifyemail');
    }
  }, [props.signinFormErrorMessages]);

  const changeView = (_view: string) => {
    setView(_view);
    props.clearErrorMessages();
  }

  return <div className='authlite-d1'>
    <div className="authlite-d1__left" />
    <div className="authlite-d1__right">
      <Header>
        {props.logo}
        {view === 'signin' && props.tagline}
      </Header>
      {view === 'signin' && <SigninForm
        onSignin={props.onSignin}
        onSignup={() => changeView("signup")}
        onForgotPassword={() => changeView("forgotpassword")}
        signinFormErrorMessages={props.signinFormErrorMessages}
        dictionary={props.dictionary}
      />}
      {view === 'signup' && <SignupForm
        onSignup={props.onSignup}
        onSignin={() => changeView("signin")}
        signupFormErrorMessages={props.signupFormErrorMessages}
        dictionary={props.dictionary}
      />}
      {view === 'forgotpassword' && <ForgotPasswordForm onSignin={() => changeView("signin")} />}
      {view === 'verifyemail' && <SendVerifyLinkForm email={props.signinFormErrorMessages.unverifiedEmail || ''} onSignin={() => changeView("signin")} />}
    </div>
  </div >;
};

export default DesignOne;
