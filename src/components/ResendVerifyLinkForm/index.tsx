import React, { useEffect, useState } from 'react';
import './style.css';
import FormElementMessage from '../shared/FormElementMessage';
import { TranslationDictionary, TranslationName, getTranslation } from '../types/TranslationDictionaryType';
import Tagline from '../Tagline';
import ResendVerifyLinkRequest from '../types/ForgotPasswordRequestType';
import { isEmptyOrSpaces } from '../../utils/TextUtils';
import ResendVerifyLinkFormErrorMessages from '../types/ResendVerifyLinkFormErrorMessagesType';

interface Props {
  onSignin: any;
  onResendVerifyLink: any;
  email: string;
  resendVerifyLinkFormErrorMessages: ResendVerifyLinkFormErrorMessages;
  dictionary: TranslationDictionary;
}

const ResendVerifyLinkForm = (props: Props) => {
  const [state, setState] = useState<ResendVerifyLinkRequest>({
    email: "",
  });

  useEffect(() => {
    if (!isEmptyOrSpaces(props.email)) {
      setState({ ...state, email: props.email });
    }
  }, [props.email]);

  const onInput = (event: any) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }


  const onResendVerifyLink = (event: any) => {
    event.preventDefault();
    props.onResendVerifyLink({
      ...state
    })
  }

  return (
    <form onSubmit={onResendVerifyLink} className="authlite-resendverifylink-form">
      <div className='authlite-margin-top'>
        <Tagline title={props.dictionary.RESEND_VERIFY_LINK_FORM__GREETING_TITLE} subtitle={props.dictionary.RESEND_VERIFY_LINK_FORM__GREETING_SUBTITLE} />
      </div>
      <div className="authlite-margin-top">
        <FormElementMessage text={getTranslation(TranslationName.RESEND_VERIFY_LINK_FORM__LABEL_EMAIL, props.dictionary)} type='label' />
        <input autoFocus disabled={!!props.email} className="authlite-input" autoComplete='off' name="email" value={state.email} onInput={onInput} />
        {props.resendVerifyLinkFormErrorMessages.email && <FormElementMessage text={getTranslation(props.resendVerifyLinkFormErrorMessages.email, props.dictionary)} type='error' />}
      </div>
      <div className="authlite-action-bar authlite-margin-top">
        <button className="authlite-primary-button" type="submit">{getTranslation(TranslationName.RESEND_VERIFY_LINK_FORM__ACTION_SEND, props.dictionary)}</button>
      </div>
      <div className="authlite-action-bar-center authlite-margin-top">
        {getTranslation(TranslationName.RESEND_VERIFY_LINK_FORM__MESSAGE_ALREADY_VERIFIED, props.dictionary)}
        <button className="authlite-button-as-link" onClick={props.onSignin}>{getTranslation(TranslationName.RESEND_VERIFY_LINK_FORM__ACTION_SIGNIN, props.dictionary)}</button>
      </div>
    </form>
  )
};

export default ResendVerifyLinkForm;
