import ResendVerifyLinkRequest from "../components/types/ForgotPasswordRequestType";
import ForgotPasswordRequest from "../components/types/ForgotPasswordRequestType";
import ForgotPasswordResponse from "../components/types/ForgotPasswordResponseType";
import ResendVerifyLinkResponse from "../components/types/ResendVerifyLinkResponseType";
import SigninRequest from "../components/types/SigninRequest";
import SigninResponse from "../components/types/SigninResponse";
import SignupRequest from "../components/types/SignupRequest";
import { processResendVerifyLinkFormException, processResendVerifyLinkResponse, validateResendVerifyLinkForm } from "./ResendVerifyLinkHelper";
import { processResetPasswordLinkFormException, processResetPasswordLinkResponse, validateResetPasswordLinkForm } from "./ResetPasswordLinkHelper";
import { processSigninException, processSigninResponse, validateSigninForm } from "./SigninHelper";
import { processSignupException, processSignupResponse, validateSignupForm } from "./SignupHelper";

const BASE_URL_PRODUCTION = "https://api.ioak.io:8010/api";
const BASE_URL_LOCAL = "http://localhost:4010/api";

export const signin = (environment: 'local' | 'production', realm: number | string, payloadRequest: SigninRequest): Promise<SigninResponse> => {
    const payload: SigninRequest = {
        email: payloadRequest.email?.trim(),
        password: payloadRequest.password
    }
    let url = BASE_URL_PRODUCTION;
    if (environment === 'local') {
        url = BASE_URL_LOCAL;
    }
    const validationError = validateSigninForm(payload);
    if (validationError) {
        return new Promise((resolve, reject) => {
            resolve(validationError);
        })
    }
    return fetch(`${url}/${realm}/user/auth/signin`, {
        method: "POST",
        body: JSON.stringify({ response_type: "token", ...payload }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json()
            .then((data) => {
                return processSigninResponse(payload, response, data);
            }))
        .catch((error: any) => {
            return processSigninException(error);
        });
}


export const signup = (environment: 'local' | 'production', realm: number | string, payloadRequest: SignupRequest, apikey: string): Promise<SigninResponse> => {
    const payload: SignupRequest = {
        given_name: payloadRequest.given_name?.trim(),
        family_name: payloadRequest.family_name?.trim(),
        email: payloadRequest.email?.trim(),
        password: payloadRequest.password,
        retype_password: payloadRequest.retype_password
    }
    let url = BASE_URL_PRODUCTION;
    if (environment === 'local') {
        url = BASE_URL_LOCAL;
    }
    const validationError = validateSignupForm(payload);
    if (validationError) {
        return new Promise((resolve, reject) => {
            resolve(validationError);
        })
    }
    return fetch(`${url}/${realm}/admin/auth/signup`, {
        method: "POST",
        body: JSON.stringify({ response_type: "token", ...payload, given_name: null }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            authorization: apikey
        }
    })
        .then((response) => response.json()
            .then((data) => {
                return processSignupResponse(payload, response, data);
            }))
        .catch((error: any) => {
            return processSignupException(error);
        });
}


export const resetPasswordLink = (environment: 'local' | 'production', realm: number | string, payloadRequest: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    const payload: ForgotPasswordRequest = {
        email: payloadRequest.email?.trim(),
    }
    let url = BASE_URL_PRODUCTION;
    if (environment === 'local') {
        url = BASE_URL_LOCAL;
    }
    const validationError = validateResetPasswordLinkForm(payload);
    if (validationError) {
        return new Promise((resolve, reject) => {
            resolve(validationError);
        })
    }
    return fetch(`${url}/${realm}/user/auth/reset-password-link`, {
        method: "POST",
        body: JSON.stringify({ ...payload }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json()
            .then((data) => {
                return processResetPasswordLinkResponse(payload, response, data);
            }))
        .catch((error: any) => {
            return processResetPasswordLinkFormException(error);
        });
}

export const resendVerifyLink = (environment: 'local' | 'production', realm: number | string, payloadRequest: ResendVerifyLinkRequest): Promise<ResendVerifyLinkResponse> => {
    const payload: ResendVerifyLinkRequest = {
        email: payloadRequest.email?.trim(),
    }
    let url = BASE_URL_PRODUCTION;
    if (environment === 'local') {
        url = BASE_URL_LOCAL;
    }
    const validationError = validateResendVerifyLinkForm(payload);
    if (validationError) {
        return new Promise((resolve, reject) => {
            resolve(validationError);
        })
    }
    return fetch(`${url}/${realm}/user/auth/verify-email/resend`, {
        method: "POST",
        body: JSON.stringify({ ...payload }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json()
            .then((data) => {
                return processResendVerifyLinkResponse(payload, response, data);
            }))
        .catch((error: any) => {
            return processResendVerifyLinkFormException(error);
        });
}
