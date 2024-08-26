import MyProfileFormErrorMessagesType from "../components/types/MyProfileFormErrorMessagesType";
import UpdateUserProfileRequest from "../components/types/UpdateProfileRequestType";
import UpdateUserProfileResponse from "../components/types/UpdateProfileResponseType";
import { TranslationName } from "../components/types/TranslationDictionaryType";
import { isEmailValid, isEmptyOrSpaces } from "../utils/TextUtils";

export const validateUpdateUserProfileForm = (
  payload: UpdateUserProfileRequest
): UpdateUserProfileResponse | null => {
  const errorMessages: MyProfileFormErrorMessagesType = {};
  const error: any[] = [];

  // if (isEmptyOrSpaces(payload.file)) {
  //   const errorCode = TranslationName.SIGNUP_ERROR__BLANK_PASSWORD;
  //   error.push({
  //     field: "file",
  //     errorCode,
  //   });
  //   errorMessages.file = errorCode;
  // }

  if (error.length === 0) {
    return null;
  }
  return {
    outcome: "ERROR",
    errorCode: "FORM_ERROR",
    data: error,
    errorMessages,
  };
};

export const processUpdateUserProfileResponse = (
  response: any,
  data: any
): UpdateUserProfileResponse => {
  if (response.status === 400) {
    const errorCode = TranslationName.SIGNUP_ERROR__BAD_REQUEST;
    return {
      outcome: "ERROR",
      errorCode,
      data,
      errorMessages: { system: errorCode },
    };
  }
  return {
    outcome: "SUCCESS",
    data,
    errorMessages: {},
  };
};

export const processUpdateUserProfileException = (
  error: any
): UpdateUserProfileResponse => {
  const errorCode = TranslationName.SIGNUP_ERROR__UNKNOWN_ERROR;
  return {
    outcome: "ERROR",
    errorCode,
    data: error,
    errorMessages: { system: errorCode },
  };
};
