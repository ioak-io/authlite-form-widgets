import ValidateConfirmEmailLinkMessages from "./ValidateConfirmEmailLinkMessagesType";

type ValidateConfirmEmailLinkResponse = {
  outcome: "SUCCESS" | "ERROR",
  errorCode?: string,
  data: any,
  errorMessages: ValidateConfirmEmailLinkMessages;
};

export default ValidateConfirmEmailLinkResponse;
