import {
  ValidateConfirmEmailLinkMessages,
  ValidateConfirmEmailLinkRequest,
  ValidateConfirmEmailLinkResponse,
} from "../components/types";
import { TranslationName } from "../components/types/TranslationDictionaryType";
import { isEmailValid, isEmptyOrSpaces } from "../utils/TextUtils";

export const validateConfirmEmailLink = (
  payload: ValidateConfirmEmailLinkRequest
): ValidateConfirmEmailLinkResponse | null => {
  const errorMessages: ValidateConfirmEmailLinkMessages = {};
  const error = [];
  if (isEmptyOrSpaces(payload.code)) {
    const errorCode = TranslationName.CONFIRM_EMAIL_LINK_ERROR__INVALID_CODE;
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

export const processValidateConfirmEmailLinkResponse = (
  request: ValidateConfirmEmailLinkRequest,
  response: any,
  data: any
): ValidateConfirmEmailLinkResponse => {
  if (response.status === 400) {
    const errorCode = TranslationName.CONFIRM_EMAIL_LINK_ERROR__BAD_REQUEST;
    return {
      outcome: "ERROR",
      errorCode,
      data,
      errorMessages: { system: errorCode },
    };
  } else if (response.status === 404) {
    const errorCode = TranslationName.CONFIRM_EMAIL_LINK_ERROR__INVALID_CODE;
    return {
      outcome: "ERROR",
      errorCode,
      data,
      errorMessages: { code: errorCode },
    };
  }
  return {
    outcome: "SUCCESS",
    data,
    errorMessages: {},
  };
};

export const processValidateConfirmEmailLinkException = (
  error: any
): ValidateConfirmEmailLinkResponse => {
  const errorCode = TranslationName.CONFIRM_EMAIL_LINK_ERROR__BAD_REQUEST;
  return {
    outcome: "ERROR",
    errorCode,
    data: "Exception",
    errorMessages: { system: errorCode },
  };
};
