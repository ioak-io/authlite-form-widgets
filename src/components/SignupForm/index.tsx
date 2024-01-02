import React, { useEffect, useState } from 'react';
import './style.css';
import FormElementMessage from '../shared/FormElementMessage';
import SignupFormErrorMessages from '../types/SignupFormErrorMessagesType';
import { TranslationDictionary, TranslationName, getTranslation } from '../types/TranslationDictionaryType';
import SignupRequest from '../types/SignupRequest';
import Tagline from '../Tagline';

interface Props {
  onSignin: any;
  onSignup: any;
  signupFormErrorMessages: SignupFormErrorMessages;
  dictionary: TranslationDictionary;
}

const SignupForm = (props: Props) => {
  const [state, setState] = useState<SignupRequest>({
    given_name: "",
    family_name: "",
    email: "",
    password: "",
    retype_password: ""
  });

  const onInput = (event: any) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const onSignup = (event: any) => {
    event.preventDefault();
    console.log(state);
    props.onSignup({
      ...state
    })
  }

  return (
    <form onSubmit={onSignup} className="authlite-d1-signup-form">
      <div className='authlite-margin-top'>
        <Tagline title={props.dictionary.SIGNUP_FORM__GREETING_TITLE} subtitle={props.dictionary.SIGNUP_FORM__GREETING_SUBTITLE} />
      </div>
      <div className='authlite-margin-top'>
        <FormElementMessage text={getTranslation(TranslationName.SIGNUP_FORM__LABEL_GIVENNAME, props.dictionary)} type='label' />
        <input className="authlite-input" autoComplete='off' autoFocus name="given_name" value={state.given_name} onInput={onInput} />
        {props.signupFormErrorMessages.given_name && <FormElementMessage text={getTranslation(props.signupFormErrorMessages.given_name, props.dictionary)} type='error' />}
      </div>
      <div className="authlite-margin-top">
        <FormElementMessage text={getTranslation(TranslationName.SIGNUP_FORM__LABEL_FAMILYNAME, props.dictionary)} type='label' />
        <input className="authlite-input" autoComplete='off' name="family_name" value={state.family_name} onInput={onInput} />
        {props.signupFormErrorMessages.family_name && <FormElementMessage text={getTranslation(props.signupFormErrorMessages.family_name, props.dictionary)} type='error' />}
      </div>
      <div className="authlite-margin-top">
        <FormElementMessage text={getTranslation(TranslationName.SIGNUP_FORM__LABEL_EMAIL, props.dictionary)} type='label' />
        <input className="authlite-input" autoComplete='off' name="email" value={state.email} onInput={onInput} />
        {props.signupFormErrorMessages.email && <FormElementMessage text={getTranslation(props.signupFormErrorMessages.email, props.dictionary)} type='error' />}
      </div>
      <div className="authlite-margin-top">
        <FormElementMessage text={getTranslation(TranslationName.SIGNUP_FORM__LABEL_PASSWORD, props.dictionary)} type='label' />
        <input className="authlite-input" name="password" value={state.password} onInput={onInput} type="password" />
        {props.signupFormErrorMessages.password && <FormElementMessage text={getTranslation(props.signupFormErrorMessages.password, props.dictionary)} type='error' />}
      </div>
      <div className="authlite-margin-top">
        <FormElementMessage text={getTranslation(TranslationName.SIGNUP_FORM__LABEL_RETYPEPASSWORD, props.dictionary)} type='label' />
        <input className="authlite-input" name="retype_password" value={state.retype_password} onInput={onInput} type="password" />
        {props.signupFormErrorMessages.retype_password && <FormElementMessage text={getTranslation(props.signupFormErrorMessages.retype_password, props.dictionary)} type='error' />}
      </div>
      <div className="authlite-action-bar authlite-margin-top">
        <button className="authlite-primary-button" type="submit">
          {getTranslation(TranslationName.SIGNUP_FORM__ACTION_CREATEACCOUNT, props.dictionary)}
        </button>
      </div>
      <div className="authlite-action-bar-center authlite-margin-top">
        {getTranslation(TranslationName.SIGNUP_FORM__MESSAGE_EXISTING_ACCOUNT, props.dictionary)}
        <button className="authlite-button-as-link" onClick={props.onSignin}>
          {getTranslation(TranslationName.SIGNUP_FORM__ACTION_SIGNIN, props.dictionary)}
        </button>
      </div>
    </form>
  )
};

export default SignupForm;
