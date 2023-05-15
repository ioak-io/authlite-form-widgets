import SigninFormErrorMessages from "./SigninFormErrorMessagesType";

type SigninResponse = {
    outcome: "SUCCESS" | "ERROR",
    errorCode?: string,
    data: any,
    errorMessages: SigninFormErrorMessages
}

export default SigninResponse;
