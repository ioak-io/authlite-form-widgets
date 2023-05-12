import React, { useEffect, useState } from 'react';
import './style.css';
import Header from '../../Header';
import SigninForm from '../../SigninForm';
import SignupForm from '../../SignupForm';
import ForgotPasswordForm from '../../ForgotPasswordForm';

interface Props {
  logo?: any;
  tagline?: any;
  onSignin: any;
  onSignup: any;
}

const DesignOne = (props: Props) => {
  const [view, setView] = useState('signin');

  return <div className='authlite-d1'>
    <div className="authlite-d1__left" />
    <div className="authlite-d1__right">
      <Header>
        {props.logo}
        {props.tagline}
      </Header>
      {view === 'signin' && <SigninForm onSignin={props.onSignin} onSignup={() => setView("signup")} onForgotPassword={() => setView("forgotpassword")} />}
      {view === 'signup' && <SignupForm onSignup={props.onSignup} onSignin={() => setView("signin")} />}
      {view === 'forgotpassword' && <ForgotPasswordForm onSignin={() => setView("signin")} />}
    </div>
  </div >;
};

export default DesignOne;
