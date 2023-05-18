import { TranslationName } from "./TranslationDictionaryType";

type SigninFormErrorMessages = {
    email?: TranslationName;
    password?: TranslationName;
    system?: TranslationName;
    unverifiedEmail?: string;
}

export default SigninFormErrorMessages;
