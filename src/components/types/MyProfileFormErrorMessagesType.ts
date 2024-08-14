import { TranslationName } from "./TranslationDictionaryType";

type MyProfileFormErrorMessages = {
  given_name?: TranslationName;
  family_name?: TranslationName;
  email?: TranslationName;
  password?: TranslationName;
  retype_password?: TranslationName;
  system?: TranslationName;
};

export default MyProfileFormErrorMessages;
