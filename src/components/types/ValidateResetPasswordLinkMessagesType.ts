import { TranslationName } from "./TranslationDictionaryType";

type ValidateResetPasswordLinkMessages = {
  code?: TranslationName;
  system?: TranslationName;
  outcome: "unknown" | "success" | "failure";
};

export default ValidateResetPasswordLinkMessages;
