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
import UpdateProfile from "./UpdateProfile";
import ChangePassword from "./ChangePassword";
import UserImage from "./UserImage";
import UpdateUserImageErrorMessages from "../types/UpdateUserImageErrorMessagesType";
import { UserClaims } from "../types";

interface Props {
  onUpdateProfile: any;
  onChangePassword: any;
  onUpdateUserImage: any;
  myProfileFormErrorMessages: MyProfileFormErrorMessages;
  updateUserImageErrorMessages: UpdateUserImageErrorMessages;
  dictionary: TranslationDictionary;
  userClaims?: UserClaims;
}

const MyProfileForm = (props: Props) => {
  const [view, setView] = useState<
    "changepassword" | "updateprofile" | "changeemail"
  >("updateprofile");

  return (
    <div className="authlite-d1-myprofile-form">
      <div className="authlite-d1-myprofile-form__switch">
        <button
          className="authlite-primary-button"
          onClick={() => setView("updateprofile")}
        >
          Edit profile
        </button>
        <button
          className="authlite-primary-button"
          onClick={() => setView("changepassword")}
        >
          Change password
        </button>
        <button
          className="authlite-primary-button"
          onClick={() => setView("changeemail")}
        >
          Change email
        </button>
      </div>
      {view === "updateprofile" && (
        <div>
          <UpdateProfile {...props} />
        </div>
      )}
      {view === "changepassword" && (
        <div>
          <ChangePassword {...props} />
        </div>
      )}
      {view === "changeemail" && (
        <div>
          <h4>Change email</h4>
          {/* <ChangePassword {...props} /> */}
        </div>
      )}
    </div>
  );
};

export default MyProfileForm;
