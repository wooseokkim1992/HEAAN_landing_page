'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { handleResetPassword, handleSendCode } from '@/api/authAPI';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import {
  BTN_TEXT,
  INPUT_LABELS,
  PATH_LIST,
  PLACEHOLDERS,
  REG_EXP,
  SUB_TEXT,
  SUCCESSED,
} from '@/constants/commonConstants';
import { INPUT_STATUS_VAR } from '@/constants/styleConstants';
import { InputStatusType } from '@/types/styleTypes';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<InputStatusType>(INPUT_STATUS_VAR.default);
  const [code, setCode] = useState('');
  const [codeStatus, setCodeStatus] = useState<InputStatusType>(INPUT_STATUS_VAR.default);
  const [password, setPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<InputStatusType>(INPUT_STATUS_VAR.default);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState<InputStatusType>(
    INPUT_STATUS_VAR.default,
  );

  const router = useRouter();

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
    const res = await handleResetPassword({
      email,
      password,
      code,
    });
    return res === SUCCESSED && router.push(PATH_LIST.main);
  };

  const sendCodeAvailable = REG_EXP.email.test(email);
  const isValid = !!code && REG_EXP.password.test(password) && password === confirmPassword;

  return (
    <div className="flex w-full flex-col items-center gap-12">
      <h2>Reset Password</h2>
      <div className="flex w-full flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              id="reset-password-email"
              placeholder={PLACEHOLDERS.email}
              showLabel
              labelText={INPUT_LABELS.email}
              value={email}
              setValue={setEmail}
              inputStatus={emailStatus}
              setInputStatus={setEmailStatus}
            />
          </div>
          <div className="w-fit">
            <Button
              btnText={BTN_TEXT.getVerificationCode}
              btnSize="md"
              btnColor={sendCodeAvailable ? 'blue01Filled' : 'disabled'}
              handleClick={() => handleSendCode({ email })}
              disabled={!sendCodeAvailable}
            />
          </div>
        </div>
        <Input
          id="reset-password-confirm"
          placeholder={PLACEHOLDERS.verificationCode}
          showLabel
          labelText={INPUT_LABELS.verificationCode}
          value={code}
          setValue={setCode}
          inputStatus={codeStatus}
          setInputStatus={setCodeStatus}
        />
        <Input
          id="reset-password-password"
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
          id="reset-password-confirm-password"
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
          btnText={BTN_TEXT.resetPassword}
          btnSize="lg"
          btnColor={isValid ? 'blue01Filled' : 'disabled'}
          disabled={!isValid}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
