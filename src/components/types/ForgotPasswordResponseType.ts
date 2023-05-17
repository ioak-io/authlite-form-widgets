import ForgotPasswordFormErrorMessages from "./ForgotPasswordFormErrorMessagesType";

type ForgotPasswordResponse = {
    outcome: "SUCCESS" | "ERROR",
    errorCode?: string,
    data: any,
    errorMessages: ForgotPasswordFormErrorMessages
}

export default ForgotPasswordResponse;
