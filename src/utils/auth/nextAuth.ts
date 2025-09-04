import { type User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { CallbacksOptions, type AuthOptions } from 'node_modules/next-auth/core/types';

import {
  checkSessionValidationInAuthServer,
  checkTokenExpired,
  convertIntoCookieStr,
  getUserInfo,
  injectUserIntoToken,
} from '@utils/auth/checkUser';
import { logIn, parseCookieInNextAuth } from '@utils/auth/loginUser';
import { signOutInServer } from '@utils/auth/logoutUser';

import { COOKIES_NAMES_ARR } from '@constants/commonConstants';

import { TExpDate, type TResCheckUser } from '@typings/auth';

export const credentialProvider = CredentialsProvider({
  name: 'credential',
  credentials: {
    email: { label: 'email', type: 'text', placeholder: 'wsKim1992@cryptolab.co.kr' },
    password: { label: 'password', type: 'password' },
  },
  async authorize(credentials): Promise<User | null> {
    try {
      console.log({ credentials });
      const respHeader = await logIn<{ email: string; password: string }>({
        data: { email: credentials?.email ?? '', password: credentials?.password ?? '' },
      });
      const { info: cookies, expDateObj } = parseCookieInNextAuth({
        respHeader,
        cookieName: COOKIES_NAMES_ARR,
      });
      const cookieStr = convertIntoCookieStr(cookies);
      const userData = await getUserInfo<TResCheckUser>(cookieStr);
      console.log({ expDateObj });
      return {
        id: credentials?.email ?? '',
        data: userData['data'],
        info: cookies,
        hSidExpDate: expDateObj['h_sid'],
        coderSessionExpDate: expDateObj['coder_session_token'],
      };
    } catch (err) {
      console.log('log in error occured');
      throw err;
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
      const { user, errorInfo } = token;
      if (Boolean(errorInfo)) {
        session.errorInfo = errorInfo;
        session.user = undefined;
      } else {
        session.errorInfo = undefined;
        session.user = user;
      }
    }
    return session;
  },
  async jwt({ token, user, trigger }) {
    if (user && trigger === 'signIn') {
      if (user.data && user.info) {
        const newToken = injectUserIntoToken({ user, token });
        return newToken;
      }
    } else if ((!Boolean(trigger) || trigger === 'update') && Boolean(token)) {
      const isTokenExpired = checkTokenExpired({
        tokenExp: token.hSidExpDate?.tokenExp,
        maxAge: token.hSidExpDate?.maxAge ?? 0,
      });
      if (isTokenExpired) {
        const newToken = await checkSessionValidationInAuthServer({ token });
        return newToken;
      } else if (user) {
        return token;
      }
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
      const cookieStr = info ? convertIntoCookieStr(info) : '';
      await signOutInServer({ cookieStr });
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};

export const authOptions: AuthOptions = {
  jwt: {
    //next auth 에서는 milli-second 가 아닌 second 단위로 지정 해야 함
    maxAge: 2 * 60 * 60, //refresh-token 의 max Age 와 동기화 해야함
  },
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  providers,
  callbacks,
  session: {
    strategy: 'jwt',
    maxAge: 2 * 60 * 60,
    updateAge: 2 * 60 * 60,
  },
  events,
  secret: process.env.NEXTAUTH_SECRET,
};
