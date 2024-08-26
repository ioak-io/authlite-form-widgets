import MyProfileFormErrorMessages from "./MyProfileFormErrorMessagesType";

type UpdateUserImageResponse = {
  outcome: "SUCCESS" | "ERROR";
  errorCode?: string;
  data: any;
  errorMessages: MyProfileFormErrorMessages;
};

export default UpdateUserImageResponse;
