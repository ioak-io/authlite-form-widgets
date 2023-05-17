import React, { useEffect, useState } from 'react';
import './style.css';
import FormElementMessage from '../shared/FormElementMessage';
import { TranslationDictionary, TranslationScope, getTranslation } from '../types/TranslationDictionaryType';

interface Props {
  onSignin: any;
  email: string;
  dictionary?: TranslationDictionary
}

const ResendVerifyLinkForm = (props: Props) => {

  return (
    <form onSubmit={props.onSignin} className="authlite-resendverifylink-form authlite-margin-top">
      <div>
        {getTranslation(TranslationScope.RESEND_VERIFY_LINK_FORM, "MESSAGE", props.dictionary)}
      </div>
      <div className="authlite-margin-top">
        <FormElementMessage text={getTranslation(TranslationScope.RESEND_VERIFY_LINK_FORM, "LABEL_EMAIL", props.dictionary)} type='label' />
        <input disabled className="authlite-input" autoComplete='off' name="email" value={props.email} />
      </div>
      <div className="authlite-action-bar authlite-margin-top">
        <button className="authlite-primary-button" type="submit">{getTranslation(TranslationScope.RESEND_VERIFY_LINK_FORM, "ACTION_SEND", props.dictionary)}</button>
        <button className="authlite-button" onClick={props.onSignin}>{getTranslation(TranslationScope.RESEND_VERIFY_LINK_FORM, "ACTION_SIGNIN", props.dictionary)}</button>
      </div>
    </form>
  )
};

export default ResendVerifyLinkForm;
