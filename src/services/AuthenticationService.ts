import { isEmailValid, isEmptyOrSpaces } from "../utils/TextUtils";
import { processSigninResponse, validateSigninForm } from "./AuthenticationHelper";

const BASE_URL_PRODUCTION = "https://api.ioak.io:8010/api";
const BASE_URL_LOCAL = "http://localhost:4010/api";

export const signin = (environment: 'local' | 'production', realm: number, payloadRequest: { email: string, password: string }) => {
    const payload = {
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
                return processSigninResponse(response, data);
            }))
        .catch((error: any) => {
            return {
                outcome: "ERROR",
                errorCode: "UNKNOWN",
                data: error
            };
        });
}
