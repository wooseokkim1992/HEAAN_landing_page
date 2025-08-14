import Link from 'next/link';

import { PATH_LIST } from '@/constants/commonConstants';
import { BTN_COLOR_VAR, BTN_SIZE_VAR } from '@/constants/styleConstants';
import { PathUrlType } from '@/types/commonTypes';
import { BTNColorType, BTNSizeType } from '@/types/styleTypes';

interface ButtonProps {
  btnText: string;
  btnSize: BTNSizeType;
  btnColor: BTNColorType;
  handleClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  isLink?: boolean;
  targetLink?: PathUrlType;
  btnType?: 'button' | 'submit' | 'reset' | undefined;
}

const Button = ({
  btnText = '',
  btnSize,
  btnColor,
  handleClick = () => {},
  disabled = false,
  loading = false,
  isLink = false,
  targetLink = PATH_LIST.main,
  btnType = 'button',
}: ButtonProps) => {
  return (
    <button
      type={btnType}
      className={`flex flex-row items-center justify-center rounded px-2 ${BTN_SIZE_VAR[btnSize]} ${BTN_COLOR_VAR[btnColor]} cursor-pointer disabled:cursor-not-allowed`}
      onClick={loading || disabled ? () => {} : handleClick}
      disabled={loading || disabled}
    >
      {isLink && !disabled ? (
        <Link className="flex h-full w-full items-center justify-center" href={targetLink}>
          {btnText}
        </Link>
      ) : (
        <span className="">{btnText}</span>
      )}
    </button>
  );
};

export default Button;
