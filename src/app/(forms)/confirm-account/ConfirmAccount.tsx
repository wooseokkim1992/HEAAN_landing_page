'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { handleConfirmAccount, handleResendCode } from '@/api/authAPI';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import {
  BTN_TEXT,
  INPUT_LABELS,
  PATH_LIST,
  PLACEHOLDERS,
  SUCCESSED,
} from '@/constants/commonConstants';
import { INPUT_STATUS_VAR } from '@/constants/styleConstants';
import { InputStatusType } from '@/types/styleTypes';

const ConfirmAccount = () => {
  const [code, setCode] = useState('');
  const [codeStatus, setCodeStatus] = useState<InputStatusType>(INPUT_STATUS_VAR.default);

  const router = useRouter();
  const queryParams = useSearchParams();
  const email = queryParams.get('email') as string;

  const handleClick = async () => {
    const res = await handleConfirmAccount({
      email,
      code,
    });
    return res === SUCCESSED && router.push(PATH_LIST.main);
  };

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <h2>Confirm Your Account</h2>
      <p className="text-blue03 text-center text-base">
        A verification code has been sent to
        <br />
        <strong>{email}</strong>
      </p>
      <div className="flex w-full flex-col gap-2">
        <Input
          id="confirm-account"
          placeholder={PLACEHOLDERS.verificationCode}
          showLabel
          labelText={INPUT_LABELS.verificationCode}
          value={code}
          setValue={setCode}
          inputStatus={codeStatus}
          setInputStatus={setCodeStatus}
        />
        <Button
          btnText={BTN_TEXT.resendCode}
          btnSize="text"
          btnColor="blue03Text"
          handleClick={() => handleResendCode({ email })}
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
          btnText={BTN_TEXT.confirmAccount}
          btnSize="lg"
          btnColor={!!code ? 'blue01Filled' : 'disabled'}
          handleClick={handleClick}
          disabled={!code}
        />
      </div>
    </div>
  );
};

export default ConfirmAccount;
