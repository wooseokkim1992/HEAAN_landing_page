'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';

import LogoCodeHeaanDark from '@/assets/code_heaan_logo_dark.png';
import LogoCodeHeaanLight from '@/assets/code_heaan_logo_light.png';
import Button from '@/components/elements/Button';
import { BTN_TEXT, NAV_LIST, PATH_LIST } from '@/constants/commonConstants';
// import { useAuthStore } from '@/state/store/authStore';
import { NavType } from '@/typings/commonTypes';

import { AuthCTX } from './AuthProvider';
const Navigation = () => {
  const [navList, setNavList] = useState<NavType>(NAV_LIST);
  const { user, logOutAsync } = useContext(AuthCTX);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const userNav = {
        title: BTN_TEXT.myPage,
        url: PATH_LIST.myPage,
        _blank: false,
        subMenu: [],
      };

      setNavList((prev) => ({ ...prev, userNav }));
    }
  }, [user]);

  return (
    <nav className="bg-bg01 border-bg02 fixed z-[21] flex min-h-[60px] w-full items-center border-b">
      <div className="page-container mx-auto flex h-full w-full flex-col items-center justify-between gap-2 sm:flex-row">
        <Link href={PATH_LIST.main} className="w-fit self-start">
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
        <div className="flex items-center gap-4 self-end sm:self-auto md:gap-8">
          {Object.values(navList).map((val, i) => {
            return (
              <Link
                key={`${val.title}-${i}`}
                className={`text-text02 text-sm md:text-base`}
                href={val.url}
                target={val._blank ? '_blank' : '_self'}
              >
                {val.title}
              </Link>
            );
          })}
          <div className="w-fit">
            <Button
              btnText={BTN_TEXT.signOut}
              btnSize="md"
              btnColor="blue03Outline"
              isLink={false}
              targetLink={PATH_LIST.signIn}
              handleClick={async () => {
                try {
                  if (logOutAsync) {
                    await logOutAsync();
                    router.push('/sign-in');
                  }
                } catch (err) {
                  console.error(err);
                  throw err;
                }
              }}
            />
          </div>
          <div className="w-fit">
            <Button
              btnText={BTN_TEXT.goToWorkspace}
              btnSize="md"
              btnColor="blue03Outline"
              isLink={false}
              handleClick={() => {
                if (user) {
                  router.push(`${process.env.NEXT_PUBLIC_CODER}`);
                } else {
                  router.push(`/sign-in`);
                }
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
