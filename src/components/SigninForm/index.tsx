import React, { useEffect, useState } from 'react';
import './style.css';
import FormElementMessage from '../shared/FormElementMessage';

interface Props {
  onSignin: any;
  onSignup: any;
  onForgotPassword: any;
}

const SigninForm = (props: Props) => {
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
    props.onSignin({
      ...state
    })
  }

  return (
    <form onSubmit={onSignin} className="authlite-d1-signin-form">
      <div>
        <FormElementMessage text='Username or Email Address' type='label' />
        <input className="authlite-input" autoComplete='off' autoFocus name="email" value={state.email} onInput={onInput} />
      </div>
      <div>
        <FormElementMessage text='Password' type='label' />
        <input className="authlite-input" name="password" value={state.password} onInput={onInput} type="password" />
      </div>
      <div className="authlite-d1-signin-form__forgot">
        <button type="button" onClick={props.onForgotPassword}>
          Forgot Password?
        </button>
      </div>
      <div className="authlite-action-bar">
        <button className="authlite-primary-button" type="submit">Sign in</button>
        <button className="authlite-button" type="button" onClick={props.onSignup}>Create account</button>
      </div>
    </form>
  )
};

export default SigninForm;
