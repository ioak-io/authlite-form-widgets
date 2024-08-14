import MyProfileFormErrorMessages from "./MyProfileFormErrorMessagesType";

type ChangePasswordResponse = {
  outcome: "SUCCESS" | "ERROR";
  errorCode?: string;
  data: any;
  errorMessages: MyProfileFormErrorMessages;
};

export default ChangePasswordResponse;
