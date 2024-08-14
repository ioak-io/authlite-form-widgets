import { TranslationName } from "../components/types/TranslationDictionaryType";
import ValidateResetPasswordLinkMessages from "../components/types/ValidateResetPasswordLinkMessagesType";
import ValidateResetPasswordLinkRequest from "../components/types/ValidateResetPasswordLinkRequestType";
import ValidateResetPasswordLinkResponse from "../components/types/ValidateResetPasswordLinkResponseType";
import { isEmailValid, isEmptyOrSpaces } from "../utils/TextUtils";

export const validateResetPasswordLink = (
  payload: ValidateResetPasswordLinkRequest
): ValidateResetPasswordLinkResponse | null => {
  const errorMessages: ValidateResetPasswordLinkMessages = {
    outcome: "unknown",
  };
  const error = [];
  if (isEmptyOrSpaces(payload.code)) {
    const errorCode = TranslationName.RESET_PASSWORD_FORM_ERROR__INVALID_CODE;
    error.push({
      field: "code",
      errorCode,
    });
    errorMessages.code = errorCode;
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

export const processValidateResetPasswordLinkResponse = (
  request: ValidateResetPasswordLinkRequest,
  response: any,
  data: any
): ValidateResetPasswordLinkResponse => {
  if (response.status === 400) {
    const errorCode = TranslationName.RESET_PASSWORD_FORM_ERROR__BAD_REQUEST;
    return {
      outcome: "ERROR",
      errorCode,
      data,
      errorMessages: { system: errorCode, outcome: "failure" },
    };
  } else if (response.status === 404) {
    const errorCode = TranslationName.RESET_PASSWORD_FORM_ERROR__INVALID_CODE;
    return {
      outcome: "ERROR",
      errorCode,
      data,
      errorMessages: { code: errorCode, outcome: "failure" },
    };
  }
  return {
    outcome: "SUCCESS",
    data,
    errorMessages: { outcome: "success" },
  };
};

export const processValidateResetPasswordLinkException = (
  error: any
): ValidateResetPasswordLinkResponse => {
  const errorCode = TranslationName.RESET_PASSWORD_FORM_ERROR__BAD_REQUEST;
  return {
    outcome: "ERROR",
    errorCode,
    data: "Exception",
    errorMessages: { system: errorCode, outcome: "failure" },
  };
};
