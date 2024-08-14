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
import ValidateResetPasswordLinkMessages from "../types/ValidateResetPasswordLinkMessagesType";
import ResetPasswordRequest from "../types/ResetPasswordRequest";
import ResetPasswordFormErrorMessages from "../types/ResetPasswordFormErrorMessagesType";

interface Props {
  onValidateResetPasswordLink: any;
  onResetPassword: any;
  code: string;
  validateResetPasswordLinkMessages: ValidateResetPasswordLinkMessages;
  resetPasswordFormErrorMessages: ResetPasswordFormErrorMessages;
  dictionary: TranslationDictionary;
}

const ResetPasswordForm = (props: Props) => {
  const [state, setState] = useState<ResetPasswordRequest>({
    password: "",
    retype_password: "",
    code: props.code,
  });

  useEffect(() => {
    if (!isEmptyOrSpaces(props.code)) {
      props.onValidateResetPasswordLink({ code: props.code });
    }
  }, [props.code]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    console.log(state);
    props.onResetPassword({
      ...state,
      code: props.code,
    });
  };

  const onInput = (event: any) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  return (
    <div
      className={`authlite-resetpassword-form ${
        props.validateResetPasswordLinkMessages.code ? "error" : ""
      }`}
    >
      {props.validateResetPasswordLinkMessages.outcome === "unknown" &&
        !props.validateResetPasswordLinkMessages.code && (
          <Tagline
            title={props.dictionary.RESET_PASSWORD_FORM__GREETING_TITLE}
            subtitle={props.dictionary.RESET_PASSWORD_FORM__GREETING_SUBTITLE}
          />
        )}
      {props.validateResetPasswordLinkMessages.outcome === "failure" &&
        props.validateResetPasswordLinkMessages.code && (
          <Tagline
            title={props.dictionary.RESET_PASSWORD_FORM__GREETING_TITLE}
            subtitle={getTranslation(
              props.validateResetPasswordLinkMessages.code,
              props.dictionary
            )}
          />
        )}
      {props.validateResetPasswordLinkMessages.outcome === "success" && (
        <form onSubmit={onSubmit} className="authlite-signin-form">
          <div className="authlite-margin-top">
            <Tagline
              title={props.dictionary.RESET_PASSWORD_FORM__GREETING_TITLE}
              subtitle="Set your new password"
            />
          </div>

          <div className="authlite-margin-top">
            <FormElementMessage
              text={getTranslation(
                TranslationName.RESET_PASSWORD_FORM__LABEL_PASSWORD,
                props.dictionary
              )}
              type="label"
            />
            <input
              className="authlite-input"
              name="password"
              value={state.password}
              onInput={onInput}
              type="password"
            />
            {props.resetPasswordFormErrorMessages.password && (
              <FormElementMessage
                text={getTranslation(
                  props.resetPasswordFormErrorMessages.password,
                  props.dictionary
                )}
                type="error"
              />
            )}
          </div>
          <div className="authlite-margin-top">
            <FormElementMessage
              text={getTranslation(
                TranslationName.RESET_PASSWORD_FORM__LABEL_RETYPEPASSWORD,
                props.dictionary
              )}
              type="label"
            />
            <input
              className="authlite-input"
              name="retype_password"
              value={state.retype_password}
              onInput={onInput}
              type="password"
            />
            {props.resetPasswordFormErrorMessages.retype_password && (
              <FormElementMessage
                text={getTranslation(
                  props.resetPasswordFormErrorMessages.retype_password,
                  props.dictionary
                )}
                type="error"
              />
            )}
          </div>
          <div className="authlite-action-bar authlite-margin-top">
            <button className="authlite-primary-button" type="submit">
              {getTranslation(
                TranslationName.RESET_PASSWORD_FORM__ACTION_CHANGE_PASSWORD,
                props.dictionary
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordForm;
