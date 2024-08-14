import MyProfileFormErrorMessages from "./MyProfileFormErrorMessagesType";

type UpdateProfileResponse = {
  outcome: "SUCCESS" | "ERROR";
  errorCode?: string;
  data: any;
  errorMessages: MyProfileFormErrorMessages;
};

export default UpdateProfileResponse;
