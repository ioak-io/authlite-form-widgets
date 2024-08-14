import ValidateResetPasswordLinkMessages from "./ValidateResetPasswordLinkMessagesType";

type ValidateResetPasswordLinkResponse = {
  outcome: "SUCCESS" | "ERROR";
  errorCode?: string;
  data: any;
  errorMessages: ValidateResetPasswordLinkMessages;
};

export default ValidateResetPasswordLinkResponse;
