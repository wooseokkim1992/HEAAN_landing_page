import Image from 'next/image';
import Link from 'next/link';

import LogoCodeHeaanDark from '@/assets/code_heaan_logo_dark.png';
import LogoCodeHeaanLight from '@/assets/code_heaan_logo_light.png';
import { FOOTER_CONTENTS, FOOTER_NAV_LIST, PATH_LIST } from '@/constants/commonConstants';

const Footer = () => {
  return (
    <footer className="bg-bg01 border-bg02 relative z-11 flex min-h-[90px] w-full items-center justify-center border-t py-2">
      <div className="page-container items start flex w-full flex-col justify-between gap-2 md:flex-row md:items-end">
        <div className="flex flex-col gap-2">
          <Link href={PATH_LIST.main}>
            <Image
              src={LogoCodeHeaanLight}
              alt="CODE.HEAAN Logo"
              width={211}
              height={33}
              sizes="(max-width: 1280px) 85vw, 70vw"
              className="block dark:hidden"
            />
            <Image
              src={LogoCodeHeaanDark}
              alt="CODE.HEAAN Logo"
              width={211}
              height={33}
              sizes="(max-width: 1280px) 85vw, 70vw"
              className="hidden dark:block"
            />
          </Link>
          <p className="text-text03 cursor-default">{FOOTER_CONTENTS.copyright}</p>
        </div>
        <ul className="flex items-end gap-4">
          {FOOTER_NAV_LIST.map((val, i) => (
            <li key={`${i}-${val.name}`}>
              <Link href={val.path} className="text-text03">
                {val.name}
              </Link>
            </li>
          ))}
          <li className="text-text03">
            Contact Us.{' '}
            <a
              href={`mailto:${FOOTER_CONTENTS.contacts}`}
              target="_blank"
              className="cursor-pointer"
            >
              {FOOTER_CONTENTS.contacts}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
