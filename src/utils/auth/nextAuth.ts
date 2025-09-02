import { type User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { CallbacksOptions, type AuthOptions } from 'node_modules/next-auth/core/types';

import { convertIntoCookieStr, getUserInfo } from '@utils/auth/checkUser';
import { logIn, parseCookieInNextAuth } from '@utils/auth/loginUser';
import { signOutInServer } from '@utils/auth/logoutUser';

import { COOKIES_NAMES_ARR } from '@constants/commonConstants';

import { type TResCheckUser } from '@typings/auth';

export const credentialProvider = CredentialsProvider({
  name: 'credential',
  credentials: {
    email: { label: 'email', type: 'text', placeholder: 'wsKim1992@cryptolab.co.kr' },
    password: { label: 'password', type: 'password' },
  },
  async authorize(credentials): Promise<User | null> {
    try {
      const respHeader = await logIn<{ email: string; password: string }>({
        data: { email: credentials?.email ?? '', password: credentials?.password ?? '' },
      });
      const cookies = parseCookieInNextAuth({ respHeader, cookieName: COOKIES_NAMES_ARR });
      const cookieStr = convertIntoCookieStr(cookies);
      const userData = await getUserInfo<TResCheckUser>(cookieStr);
      return {
        id: credentials?.email ?? '',
        data: userData['data'],
        info: cookies,
      };
    } catch (err) {
      console.log('log in error occured');
      console.error(err);
      return null;
    }
  },
});

export const providers = [credentialProvider];

export const callbacks: CallbacksOptions = {
  signIn() {
    // 해당 user 가 sign in 을 해도 되는지 여부  판단하는 callback
    //true 일 경우 허가 아닐경우 비허가
    return true;
  },
  session({ session, token }) {
    if (token) {
      session.user = token.user;
    }
    return session;
  },
  jwt({ token, user, trigger }) {
    console.log({ trigger });
    if (user && trigger === 'signIn') {
      token.user = user.data;
      token.info = user.info;
    } else if (trigger === 'update') {
    } else {
    }
    return token;
  },
  redirect() {
    return '/';
  },
};

export const events: AuthOptions['events'] = {
  async signOut({ token }) {
    try {
      const { info } = token;
      const cookieStr = convertIntoCookieStr(info);
      await signOutInServer({ cookieStr });
    } catch (err) {
      console.error(err);
    }
  },
};

export const authOptions: AuthOptions = {
  jwt: {
    maxAge: 60 * 60,
  },
  pages: {
    signIn: '/sign-in',
  },
  providers,
  callbacks,
  session: {
    strategy: 'jwt',
  },
  events,
  secret: process.env.NEXTAUTH_SECRET,
};
