import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

import LogoCodeHeaanLight from '@/assets/code_heaan_logo_light.png';
import { authOptions } from '@/utils/auth/nextAuth';
import LogoCodeHeaanDark from '@assets/code_heaan_logo_dark.png';
import Button from '@components/elements/Button';
import { checkAuth, getLinkBtnFromNavList } from '@utils/auth/nav';

import SignOutButton from './elements/SignOutButton';

import { PATH_LIST } from '@constants/commonConstants';
// import { useAuthStore } from '@/state/store/authStore';

const Navigation = async () => {
  // const user = await checkAuth();
  const session = await getServerSession(authOptions);

  const { buttons, links } = getLinkBtnFromNavList(session?.user);
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
          {links.map(([key, val]) => (
            <Link
              key={`${val.title}-${key}`}
              className={`text-text02 text-sm md:text-base`}
              href={val.url}
              target={val._blank ? '_blank' : '_self'}
            >
              {val.title}
            </Link>
          ))}
          {buttons.map(([key, val]) => (
            <div key={key} className="w-fit">
              {val.title !== 'Sign Out' ? (
                <Button
                  btnText={val.title}
                  btnSize="md"
                  btnColor="blue03Outline"
                  isLink
                  targetLink={val.url}
                />
              ) : (
                <SignOutButton btnText={val.title} btnSize="md" btnColor="blue03Outline" />
              )}
            </div>
          ))}
          {/* 
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
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
