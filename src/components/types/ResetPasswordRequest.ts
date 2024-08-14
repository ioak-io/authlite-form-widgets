type ResetPasswordRequest = {
  code: string;
  password: string;
  retype_password: string;
};

export default ResetPasswordRequest;
