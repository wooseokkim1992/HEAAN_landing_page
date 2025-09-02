import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextURL } from 'next/dist/server/web/next-url';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { regExForAuth, regExForUnAuth } from '@/constants/commonConstants';
import { MiddlewareError } from '@/typings/errors/middlewareError';
import { testPathNameRegEx } from '@/utils/auth/checkUser';

import { type CustomMiddleware } from './middlewareChain';

const getJWT = ({ req, cookieTitle }: { req: NextRequest; cookieTitle: string }) => {
  return req.cookies.get(cookieTitle);
};
const checkTokenExist = ({
  req,
}: {
  req: NextRequest;
}): { flag: boolean; jwt: RequestCookie | undefined } => {
  const jwt = getJWT({ req, cookieTitle: 'next-auth.session-token' });
  return { flag: Boolean(jwt), jwt };
};

const getURL = ({ req }: { req: NextRequest }): NextURL => {
  return req.nextUrl.clone();
};

const validateJWT = async ({ req, secret }: { req: NextRequest; secret: string }) => {
  return await getToken({ req, secret })
    .then((resp) => resp)
    .catch((err) => {
      console.error({ err });
      throw new MiddlewareError(new URLSearchParams({ errorMessage: 'invalid token' }));
    });
};

export const newNextAuthMiddleware = (nextMiddleware: CustomMiddleware) => {
  return (reqOutside: NextRequest, event: NextFetchEvent, resp: NextResponse) => {
    console.log('next-auth middleware');
    const url = getURL({ req: reqOutside });
    const { pathname } = url;
    const isForwardingBeforeGetToken = testPathNameRegEx(pathname, regExForUnAuth);
    const isForwardingAfterGetToken = testPathNameRegEx(pathname, regExForAuth);
    const { flag: isTokenExist, jwt } = checkTokenExist({ req: reqOutside });
    console.log({ isTokenExist });
    console.log({ isForwardingAfterGetToken });
    const qs = new URLSearchParams({ error: 'Not Allowed Access!' });
    if (isTokenExist && jwt && isForwardingAfterGetToken) {
      return nextAuthMiddleware(reqOutside, event, resp, nextMiddleware);
    }
    if (!isTokenExist && isForwardingAfterGetToken) {
      return NextResponse.redirect(new URL(`/login?${qs.toString()}`, url));
    } else if (isTokenExist && isForwardingBeforeGetToken) {
      return NextResponse.redirect(new URL(`/?${qs.toString()}`, url));
    }
    return nextMiddleware(reqOutside, event, resp);
  };
};

const nextAuthMiddleware = async (
  requestFromOutside: NextRequest,
  event: NextFetchEvent,
  resp: NextResponse,
  nextMiddleware: CustomMiddleware,
) => {
  const url = getURL({ req: requestFromOutside });
  try {
    if (process.env.NEXTAUTH_SECRET) {
      await validateJWT({
        req: requestFromOutside,
        secret: process.env.NEXTAUTH_SECRET,
      });
      return nextMiddleware(requestFromOutside, event, resp);
    } else {
      throw new MiddlewareError(new URLSearchParams({ errorMessage: '비밀키 미설정' }));
    }
  } catch (err) {
    if (err instanceof MiddlewareError) {
      return NextResponse.redirect(new URL(`/?${err.getQSIntoString()}`, url));
    }
    const qs = new URLSearchParams({ error: 'disallowed' });
    return NextResponse.redirect(new URL(`/?${qs.toString()}`, url));
  }
};
// withAuth(
//   function middleware(req) {
//     console.log({ req });
//     //user 권한별 상세 제어 부분
//     return nextMiddleware(requestFromOutside, event, resp) as NextMiddlewareResult;
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         //token 이 없으면 /sign-in 페이지로 이동.
//         return !!token;
//       },
//     },
//   },
// );
