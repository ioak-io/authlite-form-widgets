import SigninFormErrorMessages from "../components/types/SigninFormErrorMessagesType";
import SigninRequest from "../components/types/SigninRequest";
import SigninResponse from "../components/types/SigninResponse";
import { TranslationName } from "../components/types/TranslationDictionaryType";
import { isEmailValid, isEmptyOrSpaces } from "../utils/TextUtils";

export const validateSigninForm = (payload: { email: string, password: string }): (SigninResponse | null) => {
    const errorMessages: SigninFormErrorMessages = {};
    const error = [];
    if (isEmptyOrSpaces(payload.email)) {
        const errorCode = TranslationName.SIGNIN_ERROR__BLANK_USERNAME;
        error.push({
            "field": "email",
            errorCode
        });
        errorMessages.email = errorCode;
    } else if (!isEmailValid(payload.email)) {
        const errorCode = TranslationName.SIGNIN_ERROR__INVALID_USERNAME;
        error.push({
            "field": "email",
            errorCode
        });
        errorMessages.email = errorCode;
    }

    if (isEmptyOrSpaces(payload.password)) {
        const errorCode = TranslationName.SIGNIN_ERROR__BLANK_PASSWORD;
        error.push({
            "field": "password",
            errorCode
        });
        errorMessages.password = errorCode;
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

export const processSigninResponse = (request: SigninRequest, response: any, data: any): SigninResponse => {
    if (response.status === 400) {
        const errorCode = TranslationName.SIGNIN_ERROR__BAD_REQUEST;
        return {
            outcome: "ERROR",
            errorCode,
            data,
            errorMessages: { system: errorCode }
        };
    } else if (response.status === 404) {
        const errorCode = TranslationName.SIGNIN_ERROR__USER_NOT_FOUND;
        return {
            outcome: "ERROR",
            errorCode,
            data,
            errorMessages: { email: errorCode }
        };
    } else if (response.status === 403) {
        const errorCode = TranslationName.SIGNIN_ERROR__EMAIL_NOT_VERIFIED;
        return {
            outcome: "ERROR",
            errorCode,
            data,
            errorMessages: { email: errorCode, unverifiedEmail: request.email }
        };
    } else if (response.status === 401) {
        const errorCode = TranslationName.SIGNIN_ERROR__INCORRECT_PASSWORD;
        return {
            outcome: "ERROR",
            errorCode,
            data,
            errorMessages: { password: errorCode }
        };
    }
    return {
        outcome: "SUCCESS",
        data,
        errorMessages: {}
    };
}

export const processSigninException = (error: any): SigninResponse => {
    const errorCode = TranslationName.SIGNIN_ERROR__UNKNOWN_ERROR;
    return {
        outcome: "ERROR",
        errorCode,
        data: error,
        errorMessages: { system: errorCode }
    };
}
