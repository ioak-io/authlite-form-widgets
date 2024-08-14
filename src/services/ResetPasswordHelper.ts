import ResetPasswordFormErrorMessages from "../components/types/ResetPasswordFormErrorMessagesType";
import ResetPasswordRequest from "../components/types/ResetPasswordRequest";
import ResetPasswordResponse from "../components/types/ResetPasswordResponse";
import { TranslationName } from "../components/types/TranslationDictionaryType";
import { isEmailValid, isEmptyOrSpaces } from "../utils/TextUtils";

export const validateResetPasswordForm = (
  payload: ResetPasswordRequest
): ResetPasswordResponse | null => {
  const errorMessages: ResetPasswordFormErrorMessages = {};
  const error = [];

  if (isEmptyOrSpaces(payload.password)) {
    const errorCode = TranslationName.SIGNUP_ERROR__BLANK_PASSWORD;
    error.push({
      field: "password",
      errorCode,
    });
    errorMessages.password = errorCode;
  }

  if (isEmptyOrSpaces(payload.retype_password)) {
    const errorCode = TranslationName.SIGNUP_ERROR__BLANK_RETYPEPASSWORD;
    error.push({
      field: "retype_password",
      errorCode,
    });
    errorMessages.retype_password = errorCode;
  }

  if (payload.password !== payload.retype_password) {
    const errorCode = TranslationName.SIGNUP_ERROR__PASSWORDS_DO_NOT_MATCH;
    error.push({
      field: "password",
      errorCode,
    });
    error.push({
      field: "retype_password",
      errorCode,
    });
    errorMessages.password = errorCode;
    errorMessages.retype_password = errorCode;
  }

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

export const processResetPasswordResponse = (
  response: any,
  data: any
): ResetPasswordResponse => {
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

export const processResetPasswordException = (
  error: any
): ResetPasswordResponse => {
  const errorCode = TranslationName.SIGNUP_ERROR__UNKNOWN_ERROR;
  return {
    outcome: "ERROR",
    errorCode,
    data: error,
    errorMessages: { system: errorCode },
  };
};
