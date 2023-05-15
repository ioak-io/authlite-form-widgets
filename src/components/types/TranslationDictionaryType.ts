export type TranslationDictionary = {
    SIGNIN_FORM__LABEL_USERNAME: string,
    SIGNIN_FORM__LABEL_PASSWORD: string,
    SIGNIN_FORM__ACTION_SIGNIN: string,
    SIGNIN_FORM__ACTION_CREATEACCOUNT: string,
    SIGNIN_FORM__ACTION_FORGOTPASSWORD: string,

    SIGNIN_ERROR__BLANK_USERNAME: string,
    SIGNIN_ERROR__INVALID_USERNAME: string,
    SIGNIN_ERROR__USER_NOT_FOUND: string,
    SIGNIN_ERROR__EMAIL_NOT_VERIFIED: string,
    SIGNIN_ERROR__BLANK_PASSWORD: string,
    SIGNIN_ERROR__INCORRECT_PASSWORD: string,
    SIGNIN_ERROR__BAD_REQUEST: string,
    SIGNIN_ERROR__UNKNOWN_ERROR: string,

    SIGNUP_FORM__LABEL_GIVENNAME: string,
    SIGNUP_FORM__LABEL_FAMILYNAME: string,
    SIGNUP_FORM__LABEL_EMAIL: string,
    SIGNUP_FORM__LABEL_PASSWORD: string,
    SIGNUP_FORM__LABEL_RETYPEPASSWORD: string,
    SIGNUP_FORM__ACTION_SIGNIN: string,
    SIGNUP_FORM__ACTION_CREATEACCOUNT: string,

    SIGNUP_ERROR__BLANK_PASSWORD: string,
    SIGNUP_ERROR__BLANK_RETYPEPASSWORD: string,
    SIGNUP_ERROR__BLANK_GIVENNAME: string,
    SIGNUP_ERROR__BLANK_FAMILYNAME: string,
    SIGNUP_ERROR__BLANK_USERNAME: string,
    SIGNUP_ERROR__INVALID_USERNAME: string,
    SIGNUP_ERROR__PASSWORDS_DO_NOT_MATCH: string;

    [key: string]: string,
}

export enum TranslationScope {
    "SIGNIN_FORM" = "SIGNIN_FORM",
    "SIGNIN_ERROR" = "SIGNIN_ERROR",
    "SIGNUP_FORM" = "SIGNUP_FORM",
    "SIGNUP_ERROR" = "SIGNUP_ERROR"
}

export const DEFAULT_TRANSLATION_DICTIONARY: TranslationDictionary = {
    SIGNIN_FORM__LABEL_USERNAME: "Username Or Email Address",
    SIGNIN_FORM__LABEL_PASSWORD: "Password",
    SIGNIN_FORM__ACTION_SIGNIN: "Sign in",
    SIGNIN_FORM__ACTION_CREATEACCOUNT: "Create account",
    SIGNIN_FORM__ACTION_FORGOTPASSWORD: "Forgot Password?",

    SIGNIN_ERROR__BAD_REQUEST: "Bad request",
    SIGNIN_ERROR__BLANK_PASSWORD: "Password is empty",
    SIGNIN_ERROR__BLANK_USERNAME: "Username is empty",
    SIGNIN_ERROR__INVALID_USERNAME: "Email is not valid",
    SIGNIN_ERROR__EMAIL_NOT_VERIFIED: "Email verification pending",
    SIGNIN_ERROR__INCORRECT_PASSWORD: "Password is incorrect",
    SIGNIN_ERROR__UNKNOWN_ERROR: "Unknown error",
    SIGNIN_ERROR__USER_NOT_FOUND: "Username does not exist",

    SIGNUP_FORM__LABEL_GIVENNAME: "Given name",
    SIGNUP_FORM__LABEL_FAMILYNAME: "Family name",
    SIGNUP_FORM__LABEL_EMAIL: "Username Or Email Address",
    SIGNUP_FORM__LABEL_PASSWORD: "Password",
    SIGNUP_FORM__LABEL_RETYPEPASSWORD: "Retype Password",
    SIGNUP_FORM__ACTION_CREATEACCOUNT: "Create account",
    SIGNUP_FORM__ACTION_SIGNIN: "Sign in now",

    SIGNUP_ERROR__BLANK_PASSWORD: "Password is empty",
    SIGNUP_ERROR__BLANK_USERNAME: "Username is empty",
    SIGNUP_ERROR__INVALID_USERNAME: "Email is not valid",
    SIGNUP_ERROR__BLANK_FAMILYNAME: "Family name is empty",
    SIGNUP_ERROR__BLANK_GIVENNAME: "Given name is empty",
    SIGNUP_ERROR__BLANK_RETYPEPASSWORD: "Retype password is empty",
    SIGNUP_ERROR__PASSWORDS_DO_NOT_MATCH: "Passwords do not match",

}

export const getTranslation = (
    scope: TranslationScope,
    name: string,
    dictionary?: TranslationDictionary
) => {
    return (dictionary || DEFAULT_TRANSLATION_DICTIONARY)[`${scope}__${name}`]
}