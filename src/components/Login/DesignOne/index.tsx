import React, { useEffect, useState } from 'react';
import './style.css';
import Header from '../../Header';
import SigninForm from '../../SigninForm';
import SignupForm from '../../SignupForm';

interface Props {
  logo?: any;
  tagline?: any;
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
      {view === 'signin' && <SigninForm onSignup={() => setView("signup")} />}
      {view === 'signup' && <SignupForm onSignin={() => setView("signin")} />}
    </div>
  </div >;
};

export default DesignOne;
