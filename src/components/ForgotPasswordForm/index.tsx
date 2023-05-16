import React, { useEffect, useState } from 'react';
import './style.css';
import FormElementMessage from '../shared/FormElementMessage';

interface Props {
  onSignin: any;
}

const ForgotPasswordForm = (props: Props) => {
  const [state, setState] = useState({
    email: ""
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

  return (
    <form onSubmit={onSignin} className="authlite-d1-forgotpassword-form">
      <div>
        <FormElementMessage text='Email Address' type='label' />
        <input className="authlite-input" autoComplete='off' autoFocus name="email" value={state.email} onInput={onInput} />
      </div>
      <div className="authlite-action-bar">
        <button className="authlite-primary-button" type="submit">Send password reset link</button>
        <button className="authlite-button" onClick={props.onSignin}>Sign in now</button>
      </div>
    </form>
  )
};

export default ForgotPasswordForm;
