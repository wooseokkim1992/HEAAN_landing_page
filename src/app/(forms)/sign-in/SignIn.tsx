'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useContext } from 'react';

import { AuthCTX } from '@/components/AuthProvider';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import {
  BTN_TEXT,
  INPUT_LABELS,
  PATH_LIST,
  PLACEHOLDERS,
  //ALERT_MSG,
} from '@/constants/commonConstants';
import { INPUT_STATUS_VAR } from '@/constants/styleConstants';
import { InputStatusType } from '@/typings/styleTypes';

const SignIn = () => {
  const qs = useSearchParams();
  const [email, setEmail] = useState(qs.get('email') ?? '');
  const [emailStatus, setEmailStatus] = useState<InputStatusType>(INPUT_STATUS_VAR.default);
  const [password, setPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<InputStatusType>(INPUT_STATUS_VAR.default);
  const router = useRouter();
  const { logInAsync } = useContext(AuthCTX);

  const isValid = !!email && !!password;

  return (
    <div className="flex w-full flex-col items-center gap-12">
      <h2>Log In to Your Account</h2>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={async (evt) => {
          evt.preventDefault();
          if (logInAsync) {
            try {
              await logInAsync({ email, password });
              router.push(`/`);
            } catch (err) {
              console.error(err);
              window.alert('로그인 오류');
            }
          }
        }}
        method="POST"
      >
        <Input
          id="username"
          placeholder={PLACEHOLDERS.email}
          showLabel
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
          showLabel
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
            btnColor={isValid ? 'blue01Filled' : 'disabled'}
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
            isLink
            targetLink={PATH_LIST.termsAndConditions}
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-text02">Forgot password?</span>
          <Button
            btnText={BTN_TEXT.resetPassword}
            btnSize="text"
            btnColor="blue03Text"
            isLink
            targetLink={PATH_LIST.resetPassword}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
