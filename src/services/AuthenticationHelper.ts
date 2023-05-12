import { isEmailValid, isEmptyOrSpaces } from "../utils/TextUtils";

export const validateSigninForm = (payload: { email: string, password: string }) => {
    const error = [];
    if (isEmptyOrSpaces(payload.email)) {
        error.push({
            "field": "email",
            "errorCode": "BLANK"
        })
    } else if (!isEmailValid(payload.email)) {
        error.push({
            "field": "email",
            "errorCode": "INVALID_EMAIL"
        })
    }

    if (isEmptyOrSpaces(payload.password)) {
        error.push({
            "field": "password",
            "errorCode": "BLANK"
        })
    }

    if (error.length === 0) {
        return null;
    }
    return {
        outcome: "ERROR",
        errorCode: "FORM_ERROR",
        data: error
    }
}

export const processSigninResponse = (response: any, data: any) => {
    if (response.status === 200) {
        return {
            outcome: "SUCCESS",
            data
        };
    } else if (response.status === 400) {
        const errorCode = "BAD_REQUEST";
        return {
            outcome: "ERROR",
            errorCode,
            data
        };
    } else if (response.status === 404) {
        const errorCode = "USER_NOT_FOUND";
        return {
            outcome: "ERROR",
            errorCode,
            data
        };
    } else if (response.status === 403) {
        const errorCode = "EMAIL_NOT_VERIFIED";
        return {
            outcome: "ERROR",
            errorCode,
            data
        };
    } else if (response.status === 401) {
        const errorCode = "INCORRECT_PASSWORD";
        return {
            outcome: "ERROR",
            errorCode,
            data
        };
    }
}