import React, { useEffect, useState } from "react";
import "./style.css";
import FormElementMessage from "../shared/FormElementMessage";
import {
  TranslationDictionary,
  TranslationName,
  getTranslation,
} from "../types/TranslationDictionaryType";
import Tagline from "../Tagline";
import { isEmptyOrSpaces } from "../../utils/TextUtils";
import ValidateConfirmEmailLinkMessages from "../types/ValidateConfirmEmailLinkMessagesType";

interface Props {
  onValidateConfirmEmailLink: any;
  code: string;
  validateConfirmEmailLinkMessages: ValidateConfirmEmailLinkMessages;
  dictionary: TranslationDictionary;
}

const ConfirmEmailForm = (props: Props) => {
  useEffect(() => {
    if (!isEmptyOrSpaces(props.code)) {
      props.onValidateConfirmEmailLink({ code: props.code });
    }
  }, [props.code]);

  return (
    <div
      className={`authlite-confirmemaillink-form ${
        props.validateConfirmEmailLinkMessages.code ? "error" : ""
      }`}
    >
      {!props.validateConfirmEmailLinkMessages.code && (
        <Tagline
          title={props.dictionary.CONFIRM_EMAIL_LINK__GREETING_TITLE}
          subtitle={props.dictionary.CONFIRM_EMAIL_LINK__GREETING_SUBTITLE}
        />
      )}
      {props.validateConfirmEmailLinkMessages.code && (
        <Tagline
          title={props.dictionary.CONFIRM_EMAIL_LINK__GREETING_TITLE}
          subtitle={getTranslation(
            props.validateConfirmEmailLinkMessages.code,
            props.dictionary
          )}
        />
      )}
    </div>
  );
};

export default ConfirmEmailForm;
