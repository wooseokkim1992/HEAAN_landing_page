'use client';

import { useRouter } from 'next/navigation';
import {
  // SessionProvider,
  signIn as authSignIn,
  signOut as authSignOut,
  useSession,
} from 'next-auth/react';
import { type Session } from 'node_modules/next-auth/core/types';
import { createContext, useEffect, type FC } from 'react';

import { type TAuthContext, type TLoginReqDTO } from '@typings/auth';

type CTXType = TAuthContext<Session, TLoginReqDTO>;

export const NextAuthCTX = createContext<CTXType>({ user: null, status: 'unauthenticated' });

const NextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    (async (data) => {
      if (data && data?.errorInfo) {
        try {
          await authSignOut({
            callbackUrl: `/sign-in?error=${data.errorInfo.getMessage()}`,
            redirect: true,
          });
        } catch (err) {
          console.error({ err });
          router.push(`/sign-in?error=세션오류로 인한 로그아웃`);
        }
      } else {
        router.push(`/sign-in?error=세션종료로 인한 로그아웃`);
      }
    })(data);
    console.log({ data });
  }, [data]);
  const signIn: CTXType['signIn'] = async ({ loginData }) => {
    await authSignIn('credentials', {
      email: loginData.email,
      password: loginData.password,
      redirect: true,
      callbackUrl: '/',
    });
  };
  const signOut: CTXType['signOut'] = async () => {
    const result = await authSignOut({
      callbackUrl: '/',
      redirect: true,
    });
    console.log(result);
  };
  return (
    <NextAuthCTX.Provider value={{ user: data, signIn, signOut, status }}>
      {children}
    </NextAuthCTX.Provider>
  );
};

export default NextProvider;
