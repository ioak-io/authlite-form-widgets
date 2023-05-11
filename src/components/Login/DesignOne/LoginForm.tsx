import React, { useEffect, useState } from 'react';
import './style.css';

interface Props {
}

const LoginForm = (props: Props) => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const onInput = (event: any) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const onSignin = (event: any) => {
    event.preventDefault();

  }

  return <div className='authlite-d1-login-form'>
    <div>
      Logo
    </div>
    <form onSubmit={onSignin} className="login-page__right__overlay__content__form">
      <input autoFocus name="email" value={state.email} onInput={onInput} />
      <input name="password" value={state.password} onInput={onInput} type="password" />
      <button type="submit">Sign in</button>
    </form>
  </div >;
};

export default LoginForm;
