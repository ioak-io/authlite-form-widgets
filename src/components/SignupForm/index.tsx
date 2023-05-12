import React, { useEffect, useState } from 'react';
import './style.css';
import FormElementMessage from '../shared/FormElementMessage';

interface Props {
  onSignin: any;
}

const SignupForm = (props: Props) => {
  const [state, setState] = useState({
    givenName: "",
    familyName: "",
    email: "",
    password: "",
    repeatPassword: ""
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
    <form onSubmit={onSignin} className="authlite-d1-signup-form">
      <div>
        <FormElementMessage text='Given name' type='label' />
        <input className="authlite-input" autoComplete='off' autoFocus name="givenName" value={state.email} onInput={onInput} />
      </div>
      <div>
        <FormElementMessage text='Family name' type='label' />
        <input className="authlite-input" autoComplete='off' name="familyName" value={state.email} onInput={onInput} />
      </div>
      <div>
        <FormElementMessage text='Username or Email Address' type='label' />
        <input className="authlite-input" autoComplete='off' name="email" value={state.email} onInput={onInput} />
      </div>
      <div>
        <FormElementMessage text='Password' type='label' />
        <input className="authlite-input" name="password" value={state.password} onInput={onInput} type="password" />
      </div>
      <div>
        <FormElementMessage text='Repeat Password' type='label' />
        <input className="authlite-input" name="repeatPassword" value={state.repeatPassword} onInput={onInput} type="password" />
      </div>
      <div className="authlite-action-bar">
        <button className="authlite-primary-button" type="submit">Create account</button>
        <button className="authlite-button" onClick={props.onSignin}>Sign in now</button>
      </div>
    </form>
  )
};

export default SignupForm;
