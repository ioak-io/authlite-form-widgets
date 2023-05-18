import ResendVerifyLinkFormErrorMessages from "./ResendVerifyLinkFormErrorMessagesType";

type ResendVerifyLinkResponse = {
    outcome: "SUCCESS" | "ERROR",
    errorCode?: string,
    data: any,
    errorMessages: ResendVerifyLinkFormErrorMessages
}

export default ResendVerifyLinkResponse;
