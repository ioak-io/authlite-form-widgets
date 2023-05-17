import React, { useEffect, useState } from 'react';
import './style.css';
import FormElementMessage from '../shared/FormElementMessage';
import { TranslationDictionary, TranslationScope, getTranslation } from '../types/TranslationDictionaryType';
import ForgotPasswordFormErrorMessages from '../types/ForgotPasswordFormErrorMessagesType';

interface Props {
  onSignin: any;
  onForgotPassword: any;
  forgotPasswordFormErrorMessages: ForgotPasswordFormErrorMessages;
  dictionary?: TranslationDictionary;
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
    <form onSubmit={onForgotPassword} className="authlite-d1-forgotpassword-form authlite-margin-top">
      <div>
        {getTranslation(TranslationScope.FORGOT_PASSWORD_FORM, "MESSAGE", props.dictionary)}
      </div>
      <div className="authlite-margin-top">
        <FormElementMessage text={getTranslation(TranslationScope.FORGOT_PASSWORD_FORM, "LABEL_EMAIL", props.dictionary)} type='label' />
        <input className="authlite-input" autoComplete='off' autoFocus name="email" value={state.email} onInput={onInput} />
        {props.forgotPasswordFormErrorMessages.email && <FormElementMessage text={getTranslation(TranslationScope.FORGOT_PASSWORD_ERROR, props.forgotPasswordFormErrorMessages.email, props.dictionary)} type='error' />}
      </div>
      <div className="authlite-action-bar authlite-margin-top">
        <button className="authlite-primary-button" type="submit">{getTranslation(TranslationScope.FORGOT_PASSWORD_FORM, "ACTION_SEND", props.dictionary)}</button>
        <button className="authlite-button-as-link" onClick={props.onSignin}>{getTranslation(TranslationScope.FORGOT_PASSWORD_FORM, "ACTION_SIGNIN", props.dictionary)}</button>
      </div>
    </form>
  )
};

export default ForgotPasswordForm;
