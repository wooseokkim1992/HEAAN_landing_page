'use client';
import { FC, useContext } from 'react';

import { type BTNColorType, type BTNSizeType } from '@/typings/styleTypes';

import { NextAuthCTX } from '../NextAuthProvider';

import Button from './Button';

interface ButtonProps {
  btnText?: string;
  btnSize: BTNSizeType;
  btnColor: BTNColorType;
  disabled?: boolean;
  loading?: boolean;
  btnType?: 'button' | 'submit' | 'reset' | undefined;
}

const SignOutButton: FC<ButtonProps> = ({
  btnText = '',
  btnSize,
  btnColor,
  disabled = false,
  loading = false,
  btnType = 'button',
}) => {
  // const { logOutAsync } = useContext(AuthCTX);
  const { signOut } = useContext(NextAuthCTX);
  const handleClick = async () => {
    try {
      if (signOut) {
        await signOut();
      }
    } catch (err) {
      window.alert(err);
    }
  };
  return (
    <Button
      btnText={btnText}
      btnSize={btnSize}
      btnColor={btnColor}
      isLink={false}
      btnType={btnType}
      disabled={loading || disabled}
      handleClick={handleClick}
    />
  );
};

export default SignOutButton;
