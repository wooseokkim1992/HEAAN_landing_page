"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import {
  BTN_TEXT,
  INPUT_LABELS,
  PATH_LIST,
  PLACEHOLDERS,
  ALERT_MSG,
} from "@/constants/commonConstants";
import { INPUT_STATUS_VAR } from "@/constants/styleConstants";
import { InputStatusType } from "@/types/styleTypes";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<InputStatusType>(
    INPUT_STATUS_VAR.default,
  );
  const [password, setPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<InputStatusType>(
    INPUT_STATUS_VAR.default,
  );

  const router = useRouter();
  const queryParams = useSearchParams();
  const uid = queryParams.get("uid");

  if (uid === null) {
    window.alert(ALERT_MSG.signIn.invalidAccess);
    router.push(PATH_LIST.main);
  }

  const isValid = !!email && !!password;

  // FIXME: This feature will be removed.
  const errorText = queryParams.get("error");

  if (errorText !== null) {
    window.alert(errorText);
    router.push(PATH_LIST.signIn);
  }

  return (
    <div className="flex w-full flex-col items-center gap-12">
      <h2>Log In to Your Account</h2>
      <form
        className="flex w-full flex-col gap-4"
        action={`${process.env.NEXT_PUBLIC_OIDC_DOMAIN}/interaction/${uid}/login`}
        method="POST"
      >
        <Input
          id="username"
          placeholder={PLACEHOLDERS.email}
          showLabel={true}
          labelText={INPUT_LABELS.email}
          value={email}
          setValue={setEmail}
          inputStatus={emailStatus}
          setInputStatus={setEmailStatus}
        />
        <Input
          id="password"
          type="password"
          placeholder={PLACEHOLDERS.password}
          showLabel={true}
          labelText={INPUT_LABELS.password}
          value={password}
          setValue={setPassword}
          inputStatus={passwordStatus}
          setInputStatus={setPasswordStatus}
        />
        <div className="flex w-full flex-col items-center gap-2 pt-4">
          <Button
            btnType="submit"
            btnText={BTN_TEXT.signIn}
            btnSize="lg"
            btnColor={isValid ? "blue01Filled" : "disabled"}
            disabled={!isValid}
          />
        </div>
      </form>

      <div className="flex w-full flex-col items-center gap-1">
        <div className="flex items-center gap-4">
          <span className="text-text02">Don’t have an account?</span>
          <Button
            btnText={BTN_TEXT.createAccount}
            btnSize="text"
            btnColor="blue03Text"
            isLink={true}
            targetLink={PATH_LIST.termsAndConditions}
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-text02">Forgot password?</span>
          <Button
            btnText={BTN_TEXT.resetPassword}
            btnSize="text"
            btnColor="blue03Text"
            isLink={true}
            targetLink={PATH_LIST.resetPassword}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
