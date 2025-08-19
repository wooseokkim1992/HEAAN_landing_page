'use client';

import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { handleSignUp } from '@/api/authAPI';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import { authInstance } from '@/constants/axiosInstances';
import {
  BTN_TEXT,
  INPUT_LABELS,
  PATH_LIST,
  PLACEHOLDERS,
  REG_EXP,
  SESSION_STORAGE_VAL,
  SUB_TEXT,
  SUCCESSED,
} from '@/constants/commonConstants';
import { INPUT_STATUS_VAR } from '@/constants/styleConstants';
import { InputStatusType } from '@/types/styleTypes';
import { getSessionStorage } from '@/utilities/sessionStorage';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<InputStatusType>(INPUT_STATUS_VAR.default);
  const [password, setPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<InputStatusType>(INPUT_STATUS_VAR.default);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState<InputStatusType>(
    INPUT_STATUS_VAR.default,
  );
  const [name, setName] = useState('');
  const [nameStatus, setNameStatus] = useState<InputStatusType>(INPUT_STATUS_VAR.default);
  const [occupation, setOccupation] = useState('');
  const [occupationStatus, setOccupationStatus] = useState<InputStatusType>(
    INPUT_STATUS_VAR.default,
  );

  const router = useRouter();

  useEffect(() => {
    if (emailStatus === INPUT_STATUS_VAR.default && !!email) {
      setEmailStatus(() =>
        REG_EXP.email.test(email) ? INPUT_STATUS_VAR.default : INPUT_STATUS_VAR.warning,
      );
    }
  }, [email, emailStatus]);

  useEffect(() => {
    if (passwordStatus === INPUT_STATUS_VAR.default && !!password) {
      setPasswordStatus(() =>
        REG_EXP.password.test(password) ? INPUT_STATUS_VAR.default : INPUT_STATUS_VAR.warning,
      );
    }
  }, [password, passwordStatus]);

  useEffect(() => {
    if (!!confirmPassword) {
      setConfirmPasswordStatus(() =>
        password === confirmPassword ? INPUT_STATUS_VAR.default : INPUT_STATUS_VAR.warning,
      );
    }
  }, [password, confirmPassword, confirmPasswordStatus]);

  const handleClick = async () => {
    try {
      const resp = await authInstance.post<
        { message: string },
        AxiosResponse<{ message: string }>,
        { email: string; password: string; name: string; occupation: string }
      >('/signup', {
        email,
        password,
        name,
        occupation,
      });
      console.log({ resp });
      const newQs = new URLSearchParams({ email });
      router.push(`/confirm-account?${newQs.toString()}`);
    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError) {
        window.alert(err.message);
      }
    }

    // const res = await handleSignUp({ email, password, name, occupation });
    // return res === SUCCESSED && router.push(`${PATH_LIST.confirmAccount}?email=${email}`);
  };

  const isValid =
    REG_EXP.email.test(email) &&
    REG_EXP.password.test(password) &&
    password === confirmPassword &&
    getSessionStorage(SESSION_STORAGE_VAL.required) === SESSION_STORAGE_VAL.true &&
    !!name.trim().length &&
    !!occupation.trim().length;

  return (
    <div className="flex w-full flex-col items-center gap-12">
      <h2>Sign Up</h2>
      <div className="flex w-full flex-col gap-8">
        <Input
          id="sign-up-email"
          placeholder={PLACEHOLDERS.email}
          showLabel
          labelText={INPUT_LABELS.email}
          value={email}
          setValue={setEmail}
          inputStatus={emailStatus}
          setInputStatus={setEmailStatus}
          subText={emailStatus === INPUT_STATUS_VAR.warning ? SUB_TEXT.email.invalidInput : ''}
        />
        <Input
          id="sign-up-password"
          type="password"
          placeholder={PLACEHOLDERS.password}
          showLabel
          labelText={INPUT_LABELS.password}
          value={password}
          setValue={setPassword}
          inputStatus={passwordStatus}
          setInputStatus={setPasswordStatus}
          subText={
            passwordStatus === INPUT_STATUS_VAR.warning
              ? SUB_TEXT.password.invalidInput
              : SUB_TEXT.password.default
          }
        />
        <Input
          id="sign-up-confirm-password"
          type="password"
          placeholder={PLACEHOLDERS.confirmPassword}
          showLabel
          labelText={INPUT_LABELS.confirmPassword}
          value={confirmPassword}
          setValue={setConfirmPassword}
          inputStatus={confirmPasswordStatus}
          setInputStatus={setConfirmPasswordStatus}
          subText={
            confirmPasswordStatus === INPUT_STATUS_VAR.warning
              ? SUB_TEXT.confirmPassword.mismatch
              : SUB_TEXT.confirmPassword.default
          }
        />
        <Input
          id="sign-up-name"
          placeholder={PLACEHOLDERS.name}
          showLabel
          labelText={INPUT_LABELS.name}
          value={name}
          setValue={setName}
          inputStatus={nameStatus}
          setInputStatus={setNameStatus}
        />
        <Input
          id="sign-up-occupation"
          placeholder={PLACEHOLDERS.occupation}
          showLabel
          labelText={INPUT_LABELS.occupation}
          value={occupation}
          setValue={setOccupation}
          inputStatus={occupationStatus}
          setInputStatus={setOccupationStatus}
        />
      </div>

      <div className="flex w-full items-center gap-8">
        <Button
          btnText={BTN_TEXT.cancel}
          btnSize="lg"
          btnColor="blue03Outline"
          isLink
          targetLink={PATH_LIST.signIn}
        />
        <Button
          btnText={BTN_TEXT.next}
          btnSize="lg"
          btnColor={isValid ? 'blue01Filled' : 'disabled'}
          disabled={!isValid}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SignUp;
