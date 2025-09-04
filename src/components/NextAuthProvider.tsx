'use client';

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
  useEffect(() => {
    (async (data) => {
      const errorMessage = '';
      if (data && data?.errorInfo) {
        await authSignOut({ callbackUrl: `/sign-in?error=${errorMessage}`, redirect: true });
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
