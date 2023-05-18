import ResendVerifyLinkRequest from "../components/types/ForgotPasswordRequestType";
import ResendVerifyLinkFormErrorMessages from "../components/types/ResendVerifyLinkFormErrorMessagesType";
import ResendVerifyLinkResponse from "../components/types/ResendVerifyLinkResponseType";
import { TranslationName } from "../components/types/TranslationDictionaryType";
import { isEmailValid, isEmptyOrSpaces } from "../utils/TextUtils";

export const validateResendVerifyLinkForm = (payload: ResendVerifyLinkRequest): (ResendVerifyLinkResponse | null) => {
    const errorMessages: ResendVerifyLinkFormErrorMessages = {};
    const error = [];
    if (isEmptyOrSpaces(payload.email)) {
        const errorCode = TranslationName.RESEND_VERIFY_LINK_ERROR__BLANK_USERNAME;
        error.push({
            "field": "email",
            errorCode
        });
        errorMessages.email = errorCode;
    } else if (!isEmailValid(payload.email)) {
        const errorCode = TranslationName.RESEND_VERIFY_LINK_ERROR__INVALID_USERNAME;
        error.push({
            "field": "email",
            errorCode
        });
        errorMessages.email = errorCode;
    }

    if (error.length === 0) {
        return null;
    }
    return {
        outcome: "ERROR",
        errorCode: "FORM_ERROR",
        data: error,
        errorMessages
    }
}

export const processResendVerifyLinkResponse = (request: ResendVerifyLinkRequest, response: any, data: any): ResendVerifyLinkResponse => {
    if (response.status === 400) {
        const errorCode = TranslationName.RESEND_VERIFY_LINK_ERROR__BAD_REQUEST;
        return {
            outcome: "ERROR",
            errorCode,
            data,
            errorMessages: { system: errorCode }
        };
    } else if (response.status === 404) {
        const errorCode = TranslationName.RESEND_VERIFY_LINK_ERROR__USER_NOT_FOUND;
        return {
            outcome: "ERROR",
            errorCode,
            data,
            errorMessages: { email: errorCode }
        };
    }
    return {
        outcome: "SUCCESS",
        data,
        errorMessages: {}
    };
}

export const processResendVerifyLinkFormException = (error: any): ResendVerifyLinkResponse => {
    const errorCode = TranslationName.RESEND_VERIFY_LINK_ERROR__UNKNOWN_ERROR;
    console.log(error.status)
    return {
        outcome: "ERROR",
        errorCode,
        data: "Exception",
        errorMessages: { system: errorCode }
    };
}