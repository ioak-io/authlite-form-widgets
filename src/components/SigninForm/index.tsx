import React, { useEffect, useState } from 'react';
import './style.css';
import FormElementMessage from '../shared/FormElementMessage';
import SigninFormErrorMessages from '../types/SigninFormErrorMessagesType';
import SigninRequest from '../types/SigninRequest';
import { TranslationDictionary, TranslationScope, getTranslation } from '../types/TranslationDictionaryType';
import Checkbox from '../ui/Checkbox';

interface Props {
  onSignin: any;
  onSignup: any;
  onForgotPassword: any;
  signinFormErrorMessages: SigninFormErrorMessages;
  dictionary?: TranslationDictionary;
}

const SigninForm = (props: Props) => {
  const [state, setState] = useState<SigninRequest>({
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
    <form onSubmit={onSignin} className="authlite-signin-form authlite-margin-top">
      <div>
        <FormElementMessage text={getTranslation(TranslationScope.SIGNIN_FORM, "LABEL_USERNAME", props.dictionary)} type='label' />
        <input className="authlite-input" autoComplete='off' autoFocus name="email" value={state.email} onInput={onInput} />
        {props.signinFormErrorMessages.email && <FormElementMessage text={getTranslation(TranslationScope.SIGNIN_ERROR, props.signinFormErrorMessages.email, props.dictionary)} type='error' />}
      </div>
      <div className='authlite-margin-top'>
        <FormElementMessage text={getTranslation(TranslationScope.SIGNIN_FORM, "LABEL_PASSWORD", props.dictionary)} type='label' />
        <input className="authlite-input" name="password" value={state.password} onInput={onInput} type="password" />
        {props.signinFormErrorMessages.password && <FormElementMessage text={getTranslation(TranslationScope.SIGNIN_ERROR, props.signinFormErrorMessages.password, props.dictionary)} type='error' />}
      </div>
      <div className="authlite-signin-form__forgot authlite-margin-top-small">
        <Checkbox label='Remember me' />
        <button className="authlite-button-as-link" type="button" onClick={props.onForgotPassword}>
          {getTranslation(TranslationScope.SIGNIN_FORM, "ACTION_FORGOTPASSWORD", props.dictionary)}
        </button>
      </div>
      <div className="authlite-action-bar authlite-margin-top">
        <button className="authlite-primary-button" type="submit">{getTranslation(TranslationScope.SIGNIN_FORM, "ACTION_SIGNIN", props.dictionary)}</button>
        <button className="authlite-button-as-link" type="button" onClick={props.onSignup}>{getTranslation(TranslationScope.SIGNIN_FORM, "ACTION_CREATEACCOUNT", props.dictionary)}</button>
      </div>
    </form>
  )
};

export default SigninForm;
