import {
  confirmResetPassword,
  confirmSignUp,
  resendSignUpCode,
  resetPassword,
  signUp,
} from "aws-amplify/auth";

import { clearSessionStorage } from "@/utilities/sessionStorage";
import { ALERT_MSG, PATH_LIST, SUCCESSED } from "@/constants/commonConstants";

type EmailType = { email: string };
type CodeType = { code: string };
type PasswordType = { password: string };
type UserInfoType = { name: string; occupation: string };
type SignUpType = EmailType & PasswordType & UserInfoType;
type ConfirmAccountType = EmailType & CodeType;
type ResetPasswordType = ConfirmAccountType & PasswordType;

export const handleSignUp = async ({
  email,
  password,
  name,
  occupation,
}: SignUpType) => {
  try {
    const { nextStep } = await signUp({
      username: email,
      password: password,
      options: {
        userAttributes: {
          email,
          name,
          "custom:occupation": occupation,
        },
      },
    });

    if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
      return SUCCESSED;
    }
  } catch (err) {
    window.alert(err);
  }
};

export const handleResendCode = async ({ email }: EmailType) => {
  try {
    await resendSignUpCode({
      username: email,
    });
    window.alert(ALERT_MSG.sendCode.success);
  } catch (err) {
    window.alert(err);
  }
};

export const handleConfirmAccount = async ({
  email,
  code,
}: ConfirmAccountType) => {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: email,
      confirmationCode: code,
    });

    if (isSignUpComplete && nextStep.signUpStep === "DONE") {
      clearSessionStorage();
      // FIXME: This window.alert will be removed.
      window.alert(
        "Please try signing in again after your approval has been completed. We will notify you by email once your account has been approved.",
      );
      return SUCCESSED;
    }
  } catch (err) {
    window.alert(err);
  }
};

export const handleSendCode = async ({ email }: EmailType) => {
  try {
    await resetPassword({
      username: email,
    });
    window.alert(ALERT_MSG.sendCode.success);
  } catch (err) {
    window.alert(err);
  }
};

export const handleResetPassword = async ({
  email,
  code,
  password,
}: ResetPasswordType) => {
  try {
    await confirmResetPassword({
      username: email,
      confirmationCode: code,
      newPassword: password,
    });

    if (window.confirm(ALERT_MSG.resetPassword.success)) return SUCCESSED;
  } catch (err) {
    window.alert(err);
  }
};

export const handleSignOut = () => (window.location.href = PATH_LIST.signOut);
