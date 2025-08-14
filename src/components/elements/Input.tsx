import React, { Dispatch, SetStateAction, useState } from 'react';

import VisibilityIcon from '@/assets/visibility.svg';
import VisibilityOffIcon from '@/assets/visibility_off.svg';
import { INPUT_COLOR_VAR, INPUT_STATUS_VAR } from '@/constants/styleConstants';
import { InputStatusType } from '@/types/styleTypes';

interface InputProps {
  id: string;
  type?: 'text' | 'password';
  placeholder?: string;
  disabled?: boolean;
  showLabel?: boolean;
  labelText?: string;
  subText?: string;
  value: string;
  setValue: (target: string) => void | Dispatch<SetStateAction<string>>;
  inputStatus: InputStatusType;
  setInputStatus: Dispatch<SetStateAction<InputStatusType>>;
  handleKeyDown?: () => void;
}

const Input = ({
  id,
  type = 'text',
  placeholder,
  disabled = false,
  showLabel = true,
  labelText = '',
  subText = '',
  value,
  setValue,
  inputStatus,
  setInputStatus,
  handleKeyDown = () => {},
}: InputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const visibilityVar = disabled
    ? `fill-bg03 h-6 min-w-6 cursor-not-allowed`
    : `fill-text04 h-6 min-w-6 cursor-pointer`;

  const handleVisible = () => setIsVisible((prev) => !prev);

  return (
    <div className={`flex w-full flex-col justify-center gap-1`}>
      <label htmlFor={id} className={`${showLabel ? 'block' : 'hidden'} text-text03 text-xs`}>
        {labelText}
      </label>
      <div className={`${INPUT_COLOR_VAR[inputStatus]} flex items-center gap-2 border-b pb-1`}>
        <input
          id={id}
          name={id}
          className={`placeholder-text-04 text-text01 h-7 w-full text-sm outline-none sm:text-base`}
          type={type === 'password' ? (isVisible ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onFocus={() => setInputStatus(INPUT_STATUS_VAR.focused)}
          onBlur={() => setInputStatus(INPUT_STATUS_VAR.default)}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.code === 'Enter' ? handleKeyDown() : null
          }
          disabled={disabled}
        />
        {type === 'password' ? (
          isVisible ? (
            <VisibilityIcon className={`${visibilityVar}`} onClick={handleVisible} />
          ) : (
            <VisibilityOffIcon className={`${visibilityVar}`} onClick={handleVisible} />
          )
        ) : (
          <></>
        )}
      </div>
      {!!subText ? (
        <span
          className={`text-xs ${inputStatus === INPUT_STATUS_VAR.warning ? 'text-negative' : 'text-text03'}`}
        >
          {subText}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Input;
