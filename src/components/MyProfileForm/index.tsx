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

interface Props {
  onUpdateProfile: any;
  onChangePassword: any;
  myProfileFormErrorMessages: MyProfileFormErrorMessages;
  dictionary: TranslationDictionary;
}

const MyProfileForm = (props: Props) => {
  const [view, setView] = useState<
    "changepassword" | "updateprofile" | "changeemail"
  >("updateprofile");

  return (
    <div className="authlite-d1-myprofile-form">
      <div className="authlite-d1-myprofile-form__switch">
        <button className="authlite-primary-button">Change Password</button>
        <button className="authlite-primary-button">Edit Profile</button>
        {/* <button className="authlite-primary-button">Change Email</button> */}
      </div>
      <div>
        <h2>Update profile</h2>
        <UpdateProfile {...props} />
        <h2>Change password</h2>
        <ChangePassword {...props} />
      </div>
    </div>
  );
};

export default MyProfileForm;
