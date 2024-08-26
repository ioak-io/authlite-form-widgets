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
import UpdateProfileRequest from "../types/UpdateProfileRequestType";
import { UserClaims } from "../types";

interface Props {
  onUpdateProfile: any;
  onChangePassword: any;
  myProfileFormErrorMessages: MyProfileFormErrorMessages;
  dictionary: TranslationDictionary;
  userClaims?: UserClaims;
}

const UpdateProfile = (props: Props) => {
  const [state, setState] = useState<UpdateProfileRequest>({
    given_name: "",
    family_name: "",
    avatar: null,
  });

  useEffect(() => {
    if (props.userClaims) {
      setState({
        ...props.userClaims,
      });
    }
  }, [props.userClaims]);

  const onInput = (event: any) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const onFileUpload = (event: any) => {
    if (event.currentTarget.files.length > 0) {
      setState({
        ...state,
        [event.currentTarget.name]: event.currentTarget.files[0],
      });
    }
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
            TranslationName.MYPROFILE_FORM__LABEL_AVATAR,
            props.dictionary
          )}
          type="label"
        />
        {props.userClaims?.avatar}
        <input
          className="authlite-input"
          type="file"
          autoComplete="off"
          autoFocus
          name="avatar"
          onInput={onFileUpload}
        />
        {props.myProfileFormErrorMessages.avatar && (
          <FormElementMessage
            text={getTranslation(
              props.myProfileFormErrorMessages.avatar,
              props.dictionary
            )}
            type="error"
          />
        )}
      </div>
      <div className="authlite-margin-top">
        <FormElementMessage
          text={getTranslation(
            TranslationName.SIGNUP_FORM__LABEL_GIVENNAME,
            props.dictionary
          )}
          type="label"
        />
        <input
          className="authlite-input"
          autoComplete="off"
          autoFocus
          name="given_name"
          value={state.given_name}
          onInput={onInput}
        />
        {props.myProfileFormErrorMessages.given_name && (
          <FormElementMessage
            text={getTranslation(
              props.myProfileFormErrorMessages.given_name,
              props.dictionary
            )}
            type="error"
          />
        )}
      </div>
      <div className="authlite-margin-top">
        <FormElementMessage
          text={getTranslation(
            TranslationName.SIGNUP_FORM__LABEL_FAMILYNAME,
            props.dictionary
          )}
          type="label"
        />
        <input
          className="authlite-input"
          autoComplete="off"
          name="family_name"
          value={state.family_name}
          onInput={onInput}
        />
        {props.myProfileFormErrorMessages.family_name && (
          <FormElementMessage
            text={getTranslation(
              props.myProfileFormErrorMessages.family_name,
              props.dictionary
            )}
            type="error"
          />
        )}
      </div>
      <div className="authlite-action-bar authlite-margin-top">
        <button className="authlite-primary-button" type="submit">
          {getTranslation(
            TranslationName.MYPROFILE_FORM__ACTION_UPDATE_PROFILE,
            props.dictionary
          )}
        </button>
      </div>
    </form>
  );
};

export default UpdateProfile;
