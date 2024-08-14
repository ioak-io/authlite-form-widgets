import ResetPasswordFormErrorMessages from "./ResetPasswordFormErrorMessagesType";

type ResetPasswordResponse = {
    outcome: "SUCCESS" | "ERROR",
    errorCode?: string,
    data: any,
    errorMessages: ResetPasswordFormErrorMessages
}

export default ResetPasswordResponse;
