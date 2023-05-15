import SignupFormErrorMessages from "./SignupFormErrorMessagesType";

type SignupResponse = {
    outcome: "SUCCESS" | "ERROR",
    errorCode?: string,
    data: any,
    errorMessages: SignupFormErrorMessages
}

export default SignupResponse;
