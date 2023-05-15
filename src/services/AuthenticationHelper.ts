import { isEmailValid, isEmptyOrSpaces } from "../utils/TextUtils";

export const validateSigninForm = (payload: { email: string, password: string }) => {
    const errorMessages: any = {};
    const error = [];
    if (isEmptyOrSpaces(payload.email)) {
        const errorCode = "BLANK";
        error.push({
            "field": "email",
            errorCode
        });
        errorMessages.email = errorCode;
    } else if (!isEmailValid(payload.email)) {
        const errorCode = "INVALID_EMAIL";
        error.push({
            "field": "email",
            errorCode
        });
        errorMessages.email = errorCode;
    }

    if (isEmptyOrSpaces(payload.password)) {
        const errorCode = "BLANK";
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

export const processSigninResponse = (response: any, data: any) => {
    if (response.status === 200) {
        return {
            outcome: "SUCCESS",
            data,
            errorMessages: {}
        };
    } else if (response.status === 400) {
        const errorCode = "BAD_REQUEST";
        return {
            outcome: "ERROR",
            errorCode,
            data,
            errorMessages: { common: errorCode }
        };
    } else if (response.status === 404) {
        const errorCode = "USER_NOT_FOUND";
        return {
            outcome: "ERROR",
            errorCode,
            data,
            errorMessages: { email: errorCode }
        };
    } else if (response.status === 403) {
        const errorCode = "EMAIL_NOT_VERIFIED";
        return {
            outcome: "ERROR",
            errorCode,
            data,
            errorMessages: { email: errorCode }
        };
    } else if (response.status === 401) {
        const errorCode = "INCORRECT_PASSWORD";
        return {
            outcome: "ERROR",
            errorCode,
            data,
            errorMessages: { password: errorCode }
        };
    }
}

export const processSigninException = (error: any) => {
    const errorCode = "UNKNOWN";
    return {
        outcome: "ERROR",
        errorCode,
        data: error,
        errorMessages: { common: errorCode }
    };
}