import ForgotPasswordRequest from "../components/types/ForgotPasswordRequestType";
import ForgotPasswordResponse from "../components/types/ForgotPasswordResponseType";
import SignupRequest from "../components/types/SignupRequest";
import SignupResponse from "../components/types/SignupResponse";
import { isEmailValid, isEmptyOrSpaces } from "../utils/TextUtils";

export const validateResetPasswordLinkForm = (payload: ForgotPasswordRequest): (ForgotPasswordResponse | null) => {
    const errorMessages: any = {};
    const error = [];
    if (isEmptyOrSpaces(payload.email)) {
        const errorCode = "BLANK_USERNAME";
        error.push({
            "field": "email",
            errorCode
        });
        errorMessages.email = errorCode;
    } else if (!isEmailValid(payload.email)) {
        const errorCode = "INVALID_USERNAME";
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

export const processResetPasswordLinkResponse = (request: ForgotPasswordRequest, response: any, data: any): SignupResponse => {
    if (response.status === 400) {
        const errorCode = "BAD_REQUEST";
        return {
            outcome: "ERROR",
            errorCode,
            data,
            errorMessages: { system: errorCode }
        };
    } else if (response.status === 404) {
        const errorCode = "USER_NOT_FOUND";
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

export const processResetPasswordLinkFormException = (error: any): ForgotPasswordResponse => {
    const errorCode = "UNKNOWN_ERROR";
    console.log(error.status)
    return {
        outcome: "ERROR",
        errorCode,
        data: "Exception",
        errorMessages: { system: errorCode }
    };
}