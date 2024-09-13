import ResendVerifyLinkRequest from "../components/types/ResendVerifyLinkRequestType";
import ForgotPasswordRequest from "../components/types/ForgotPasswordRequestType";
import ForgotPasswordResponse from "../components/types/ForgotPasswordResponseType";
import ResendVerifyLinkResponse from "../components/types/ResendVerifyLinkResponseType";
import SigninRequest from "../components/types/SigninRequest";
import SigninResponse from "../components/types/SigninResponse";
import SignupRequest from "../components/types/SignupRequest";
import ValidateConfirmEmailLinkRequest from "../components/types/ValidateConfirmEmailLinkRequestType";
import ValidateConfirmEmailLinkResponse from "../components/types/ValidateConfirmEmailLinkResponseType";
import {
  processResendVerifyLinkFormException,
  processResendVerifyLinkResponse,
  validateResendVerifyLinkForm,
} from "./ResendVerifyLinkHelper";
import {
  processResetPasswordLinkFormException,
  processResetPasswordLinkResponse,
  validateResetPasswordLinkForm,
} from "./ResetPasswordLinkHelper";
import {
  processGoogleAuthResponse,
  processSigninException,
  processSigninResponse,
  validateSigninForm,
} from "./SigninHelper";
import {
  processSignupException,
  processSignupResponse,
  validateSignupForm,
} from "./SignupHelper";
import {
  validateConfirmEmailLink,
  processValidateConfirmEmailLinkException,
  processValidateConfirmEmailLinkResponse,
} from "./ValidateConfirmEmailLinkHelper";
import ValidateResetPasswordLinkResponse from "../components/types/ValidateResetPasswordLinkResponseType";
import ValidateResetPasswordLinkRequest from "../components/types/ValidateResetPasswordLinkRequestType";
import {
  processValidateResetPasswordLinkException,
  processValidateResetPasswordLinkResponse,
  validateResetPasswordLink,
} from "./ValidateResetPasswordLinkHelper";
import ResetPasswordRequest from "../components/types/ResetPasswordRequest";
import {
  processResetPasswordException,
  processResetPasswordResponse,
  validateResetPasswordForm,
} from "./ResetPasswordHelper";
import ResetPasswordResponse from "../components/types/ResetPasswordResponse";
import {
  UpdateProfileRequest,
  UpdateProfileResponse,
  UpdateUserImageRequest,
  UpdateUserImageResponse,
} from "../components/types";
import { validateUpdateUserImageForm } from "./UpdateUserImageHelper";
import {
  processUpdateUserProfileException,
  processUpdateUserProfileResponse,
  validateUpdateUserProfileForm,
} from "./UpdateUserProfileHelper";

const BASE_URL_PRODUCTION = "https://api.ioak.io:8010/api";
const BASE_URL_LOCAL = "http://localhost:4000/api";

export const signin = (
  environment: "local" | "production",
  realm: number | string,
  payloadRequest: SigninRequest
): Promise<SigninResponse> => {
  const payload: SigninRequest = {
    email: payloadRequest.email?.trim(),
    password: payloadRequest.password,
  };
  let url = BASE_URL_PRODUCTION;
  if (environment === "local") {
    url = BASE_URL_LOCAL;
  }
  const validationError = validateSigninForm(payload);
  if (validationError) {
    return new Promise((resolve, reject) => {
      resolve(validationError);
    });
  }
  return fetch(`${url}/${realm}/user/auth/signin`, {
    method: "POST",
    body: JSON.stringify({ response_type: "token", ...payload }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) =>
      response.json().then((data) => {
        return processSigninResponse(payload, response, data);
      })
    )
    .catch((error: any) => {
      return processSigninException(error);
    });
};

export const signup = (
  environment: "local" | "production",
  realm: number | string,
  payloadRequest: SignupRequest,
  apikey: string,
  emailConfirmationPageLink?: string
): Promise<SigninResponse> => {
  const payload: SignupRequest = {
    given_name: payloadRequest.given_name?.trim(),
    family_name: payloadRequest.family_name?.trim(),
    email: payloadRequest.email?.trim(),
    password: payloadRequest.password,
    retype_password: payloadRequest.retype_password,
  };
  let url = BASE_URL_PRODUCTION;
  if (environment === "local") {
    url = BASE_URL_LOCAL;
  }
  const validationError = validateSignupForm(payload);
  if (validationError) {
    return new Promise((resolve, reject) => {
      resolve(validationError);
    });
  }
  return fetch(`${url}/${realm}/admin/auth/signup`, {
    method: "POST",
    body: JSON.stringify({
      response_type: "token",
      ...payload,
      emailConfirmationPageLink,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: apikey,
    },
  })
    .then((response) =>
      response.json().then((data) => {
        return processSignupResponse(payload, response, data);
      })
    )
    .catch((error: any) => {
      return processSignupException(error);
    });
};

export const confirmEmailLink = (
  environment: "local" | "production",
  realm: number | string,
  payloadRequest: ValidateConfirmEmailLinkRequest
): Promise<ValidateConfirmEmailLinkResponse> => {
  let url = BASE_URL_PRODUCTION;
  if (environment === "local") {
    url = BASE_URL_LOCAL;
  }
  const payload = {
    code: payloadRequest.code,
  };
  const validationError = validateConfirmEmailLink(payload);
  if (validationError) {
    return new Promise((resolve, reject) => {
      resolve(validationError);
    });
  }
  return fetch(`${url}/${realm}/user/auth/verify-email/${payload.code}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) =>
      response.json().then((data) => {
        return processValidateConfirmEmailLinkResponse(payload, response, data);
      })
    )
    .catch((error: any) => {
      return processValidateConfirmEmailLinkException(error);
    });
};

export const resetPasswordLink = (
  environment: "local" | "production",
  realm: number | string,
  payloadRequest: ForgotPasswordRequest,
  resetPasswordPageLink?: string
): Promise<ForgotPasswordResponse> => {
  const payload: ForgotPasswordRequest = {
    email: payloadRequest.email?.trim(),
  };
  let url = BASE_URL_PRODUCTION;
  if (environment === "local") {
    url = BASE_URL_LOCAL;
  }
  const validationError = validateResetPasswordLinkForm(payload);
  if (validationError) {
    return new Promise((resolve, reject) => {
      resolve(validationError);
    });
  }
  return fetch(`${url}/${realm}/user/auth/reset-password-link`, {
    method: "POST",
    body: JSON.stringify({ ...payload, resetPasswordPageLink }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) =>
      response.json().then((data) => {
        return processResetPasswordLinkResponse(payload, response, data);
      })
    )
    .catch((error: any) => {
      return processResetPasswordLinkFormException(error);
    });
};

export const onValidateResetPasswordLink = (
  environment: "local" | "production",
  realm: number | string,
  payloadRequest: ValidateResetPasswordLinkRequest
): Promise<ValidateResetPasswordLinkResponse> => {
  let url = BASE_URL_PRODUCTION;
  if (environment === "local") {
    url = BASE_URL_LOCAL;
  }
  const payload = {
    code: payloadRequest.code,
  };
  const validationError = validateResetPasswordLink(payload);
  if (validationError) {
    return new Promise((resolve, reject) => {
      resolve(validationError);
    });
  }
  return fetch(
    `${url}/${realm}/user/auth/validate-reset-password-link/${payload.code}`,
    {
      method: "POST",
      body: JSON.stringify({ ...payload }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((response) =>
      response.json().then((data) => {
        return processValidateResetPasswordLinkResponse(
          payload,
          response,
          data
        );
      })
    )
    .catch((error: any) => {
      return processValidateResetPasswordLinkException(error);
    });
};

export const resendVerifyLink = (
  environment: "local" | "production",
  realm: number | string,
  payloadRequest: ResendVerifyLinkRequest,
  emailConfirmationPageLink?: string
): Promise<ResendVerifyLinkResponse> => {
  const payload: ResendVerifyLinkRequest = {
    email: payloadRequest.email?.trim(),
  };
  let url = BASE_URL_PRODUCTION;
  if (environment === "local") {
    url = BASE_URL_LOCAL;
  }
  const validationError = validateResendVerifyLinkForm(payload);
  if (validationError) {
    return new Promise((resolve, reject) => {
      resolve(validationError);
    });
  }
  return fetch(`${url}/${realm}/user/auth/verify-email/resend`, {
    method: "POST",
    body: JSON.stringify({
      ...payload,
      emailConfirmationPageLink,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) =>
      response.json().then((data) => {
        return processResendVerifyLinkResponse(payload, response, data);
      })
    )
    .catch((error: any) => {
      return processResendVerifyLinkFormException(error);
    });
};

export const onResetPassword = (
  environment: "local" | "production",
  realm: number | string,
  payloadRequest: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  let url = BASE_URL_PRODUCTION;
  if (environment === "local") {
    url = BASE_URL_LOCAL;
  }
  const validationError = validateResetPasswordForm(payloadRequest);
  if (validationError) {
    return new Promise((resolve, reject) => {
      resolve(validationError);
    });
  }
  return fetch(
    `${url}/${realm}/user/auth/reset-password/${payloadRequest.code}`,
    {
      method: "POST",
      body: JSON.stringify({
        password: payloadRequest.password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        // authorization: apikey,
      },
    }
  )
    .then((response) =>
      response.json().then((data) => {
        return processGoogleAuthResponse(response, data);
      })
    )
    .catch((error: any) => {
      return processResetPasswordException(error);
    });
};

export const onGoogleAuthSuccess = (
  environment: "local" | "production",
  code: string
): Promise<ResetPasswordResponse> => {
  let url = BASE_URL_PRODUCTION;
  if (environment === "local") {
    url = BASE_URL_LOCAL;
  }
  return fetch(`${url}/auth?code=${code}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      // authorization: accessToken,
    },
  })
    .then((response) =>
      response.json().then((data) => {
        return processResetPasswordResponse(response, data);
      })
    )
    .catch((error: any) => {
      return processResetPasswordException(error);
    });
};

export const onUpdateUserProfile = (
  environment: "local" | "production",
  realm: number | string,
  payloadRequest: UpdateProfileRequest,
  accessToken: string
): Promise<UpdateProfileResponse> => {
  let url = BASE_URL_PRODUCTION;
  if (environment === "local") {
    url = BASE_URL_LOCAL;
  }
  const validationError = validateUpdateUserProfileForm(payloadRequest);
  if (validationError) {
    return new Promise((resolve, reject) => {
      resolve(validationError);
    });
  }

  const formData = new FormData();
  formData.append("avatar", payloadRequest.avatar);
  if (payloadRequest.given_name) {
    formData.append("given_name", payloadRequest.given_name);
  }
  if (payloadRequest.family_name) {
    formData.append("family_name", payloadRequest.family_name);
  }
  return fetch(`${url}/${realm}/user/auth/update-profile`, {
    method: "POST",
    body: formData,
    headers: {
      // "Content-type": "application/json; charset=UTF-8",
      authorization: accessToken,
    },
  })
    .then((response) =>
      response.json().then((data) => {
        return processUpdateUserProfileResponse(response, data);
      })
    )
    .catch((error: any) => {
      return processUpdateUserProfileException(error);
    });
};
