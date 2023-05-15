import SignupRequest from "../components/types/SignupRequest";
import SignupResponse from "../components/types/SignupResponse";
import { isEmailValid, isEmptyOrSpaces } from "../utils/TextUtils";

export const validateSignupForm = (payload: SignupRequest): (SignupResponse | null) => {
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

    if (isEmptyOrSpaces(payload.password)) {
        const errorCode = "BLANK_PASSWORD";
        error.push({
            "field": "password",
            errorCode
        });
        errorMessages.password = errorCode;
    }

    if (isEmptyOrSpaces(payload.retype_password)) {
        const errorCode = "BLANK_RETYPEPASSWORD";
        error.push({
            "field": "retype_password",
            errorCode
        });
        errorMessages.retype_password = errorCode;
    }

    if (payload.password !== payload.retype_password) {
        const errorCode = "PASSWORDS_DO_NOT_MATCH";
        error.push({
            "field": "password",
            errorCode
        });
        error.push({
            "field": "retype_password",
            errorCode
        });
        errorMessages.password = errorCode;
        errorMessages.retype_password = errorCode;
    }

    if (isEmptyOrSpaces(payload.given_name)) {
        const errorCode = "BLANK_GIVENNAME";
        error.push({
            "field": "given_name",
            errorCode
        });
        errorMessages.given_name = errorCode;
    }

    if (isEmptyOrSpaces(payload.family_name)) {
        const errorCode = "BLANK_FAMILYNAME";
        error.push({
            "field": "family_name",
            errorCode
        });
        errorMessages.family_name = errorCode;
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

export const processSignupResponse = (request: SignupRequest, response: any, data: any): SignupResponse => {
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
    } else if (response.status === 401) {
        const errorCode = "INCORRECT_PASSWORD";
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

export const processSignupException = (error: any): SignupResponse => {
    const errorCode = "UNKNOWN_ERROR";
    return {
        outcome: "ERROR",
        errorCode,
        data: error,
        errorMessages: { system: errorCode }
    };
}