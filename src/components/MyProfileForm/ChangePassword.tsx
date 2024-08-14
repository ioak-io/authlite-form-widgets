import React, { useEffect, useState } from "react";
import "./style.css";
import FormElementMessage from "../shared/FormElementMessage";
import {
  TranslationDictionary,
  TranslationName,
  getTranslation,
} from "../types/TranslationDictionaryType";
import SignupRequest from "../types/SignupRequest";
import Tagline from "../Tagline";
import MyProfileFormErrorMessages from "../types/MyProfileFormErrorMessagesType";
import ChangePasswordRequest from "../types/ChangePasswordRequestType";

interface Props {
  onUpdateProfile: any;
  onChangePassword: any;
  myProfileFormErrorMessages: MyProfileFormErrorMessages;
  dictionary: TranslationDictionary;
}

const ChangePassword = (props: Props) => {
  const [state, setState] = useState<ChangePasswordRequest>({
    password: "",
    retype_password: "",
  });

  const onInput = (event: any) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const onUpdateProfile = (event: any) => {
    event.preventDefault();
    console.log(state);
    props.onUpdateProfile({
      ...state,
    });
  };

  return (
    <form onSubmit={onUpdateProfile} className="authlite-d1-signup-form">
      <div className="authlite-margin-top">
        <FormElementMessage
          text={getTranslation(
            TranslationName.SIGNUP_FORM__LABEL_PASSWORD,
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
        {props.myProfileFormErrorMessages.password && (
          <FormElementMessage
            text={getTranslation(
              props.myProfileFormErrorMessages.password,
              props.dictionary
            )}
            type="error"
          />
        )}
      </div>
      <div className="authlite-margin-top">
        <FormElementMessage
          text={getTranslation(
            TranslationName.SIGNUP_FORM__LABEL_RETYPEPASSWORD,
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
        {props.myProfileFormErrorMessages.retype_password && (
          <FormElementMessage
            text={getTranslation(
              props.myProfileFormErrorMessages.retype_password,
              props.dictionary
            )}
            type="error"
          />
        )}
      </div>
      <div className="authlite-action-bar authlite-margin-top">
        <button className="authlite-primary-button" type="submit">
          {getTranslation(
            TranslationName.SIGNUP_FORM__ACTION_CREATEACCOUNT,
            props.dictionary
          )}
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
