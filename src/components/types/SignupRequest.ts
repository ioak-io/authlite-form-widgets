type SignupRequest = {
  given_name: string;
  family_name: string;
  email: string;
  password: string;
  retype_password: string;
  emailConfirmationPageLink?: string;
};

export default SignupRequest;
