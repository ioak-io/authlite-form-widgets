import React, { useEffect, useState } from 'react';
import './style.css';
import FormElementMessage from '../shared/FormElementMessage';
import { TranslationDictionary, TranslationName, getTranslation } from '../types/TranslationDictionaryType';
import ForgotPasswordFormErrorMessages from '../types/ForgotPasswordFormErrorMessagesType';
import Tagline from '../Tagline';

interface Props {
  onSignin: any;
  onForgotPassword: any;
  forgotPasswordFormErrorMessages: ForgotPasswordFormErrorMessages;
  dictionary: TranslationDictionary;
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

  const onForgotPassword = (event: any) => {
    event.preventDefault();
    props.onForgotPassword(state);
  }

  return (
    <form onSubmit={onForgotPassword} className="authlite-d1-forgotpassword-form">
      <div className='authlite-margin-top'>
        <Tagline title={props.dictionary.FORGOT_PASSWORD_FORM__GREETING_TITLE} subtitle={props.dictionary.FORGOT_PASSWORD_FORM__GREETING_SUBTITLE} />
      </div>
      <div className="authlite-margin-top">
        <FormElementMessage text={getTranslation(TranslationName.FORGOT_PASSWORD_FORM__LABEL_EMAIL, props.dictionary)} type='label' />
        <input className="authlite-input" autoComplete='off' autoFocus name="email" value={state.email} onInput={onInput} />
        {props.forgotPasswordFormErrorMessages.email && <FormElementMessage text={getTranslation(props.forgotPasswordFormErrorMessages.email, props.dictionary)} type='error' />}
      </div>
      <div className="authlite-action-bar authlite-margin-top">
        <button className="authlite-primary-button" type="submit">{getTranslation(TranslationName.FORGOT_PASSWORD_FORM__ACTION_SEND, props.dictionary)}</button>
      </div>
      <div className="authlite-action-bar-center authlite-margin-top">
        {getTranslation(TranslationName.FORGOT_PASSWORD_FORM__MESSAGE_REMEMBER_PASSWORD, props.dictionary)}
        <button className="authlite-button-as-link" onClick={props.onSignin}>{getTranslation(TranslationName.FORGOT_PASSWORD_FORM__ACTION_SIGNIN, props.dictionary)}</button>
      </div>
    </form>
  )
};

export default ForgotPasswordForm;
