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
import UpdateUserImageRequest from "../types/UpdateUserImageRequestType";
import UpdateUserImageErrorMessages from "../types/UpdateUserImageErrorMessagesType";

interface Props {
  onUpdateUserImage: any;
  updateUserImageErrorMessages: UpdateUserImageErrorMessages;
  dictionary: TranslationDictionary;
}

const UserImage = (props: Props) => {
  const [state, setState] = useState<UpdateUserImageRequest>({ file: null });

  const onInput = (event: any) => {
    console.log(event.currentTarget.files);
    if (event.currentTarget.files.length > 0){
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.files[0],
    });}
  };

  const onUpdateUserImage = (event: any) => {
    event.preventDefault();
    console.log(state);
    props.onUpdateUserImage({
      ...state,
    });
  };

  return (
    <form onSubmit={onUpdateUserImage} className="authlite-d1-signup-form">
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
          type="file"
          autoComplete="off"
          autoFocus
          name="file"
          onInput={onInput}
        />
        {props.updateUserImageErrorMessages.file && (
          <FormElementMessage
            text={getTranslation(
              props.updateUserImageErrorMessages.file,
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

export default UserImage;
