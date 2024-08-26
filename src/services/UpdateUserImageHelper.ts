import UpdateUserImageErrorMessages from "../components/types/UpdateUserImageErrorMessagesType";
import UpdateUserImageRequest from "../components/types/UpdateUserImageRequestType";
import UpdateUserImageResponse from "../components/types/UpdateUserImageResponseType";
import { TranslationName } from "../components/types/TranslationDictionaryType";
import { isEmailValid, isEmptyOrSpaces } from "../utils/TextUtils";

export const validateUpdateUserImageForm = (
  payload: UpdateUserImageRequest
): UpdateUserImageResponse | null => {
  const errorMessages: UpdateUserImageErrorMessages = {};
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

export const processUpdateUserImageResponse = (
  response: any,
  data: any
): UpdateUserImageResponse => {
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

export const processUpdateUserImageException = (
  error: any
): UpdateUserImageResponse => {
  const errorCode = TranslationName.SIGNUP_ERROR__UNKNOWN_ERROR;
  return {
    outcome: "ERROR",
    errorCode,
    data: error,
    errorMessages: { system: errorCode },
  };
};
