import Link from 'next/link';

import { BTN_TEXT, PATH_LIST } from '@/constants/commonConstants';

const StartButton = () => {
  return (
    <Link
      className={`flex h-10 w-full max-w-[300px] items-center justify-center self-center rounded-[40px] bg-[#0972d3] px-2 text-center hover:bg-[#002a5f] sm:self-auto`}
      href={PATH_LIST.signIn}
    >
      <span className="text-base font-medium text-white">{BTN_TEXT.startForFree}</span>
    </Link>
  );
};

export default StartButton;
