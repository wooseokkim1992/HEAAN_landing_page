import { NextResponse, type NextRequest, type MiddlewareConfig } from 'next/server';

const isHasCookieRequired = (request: NextRequest) => {
  const cookies = request.cookies;
  const h_sid = cookies.get('h_sid');
  const coder_session_token = cookies.get('coder_session_token');
  return Boolean(h_sid) && Boolean(coder_session_token);
};

const testPathNameRegEx = (pathname: string, regExArr: Iterable<RegExp>) => {
  const iterator = regExArr[Symbol.iterator]();
  while (true) {
    const { value, done } = iterator.next();
    if (done) return false;
    else if (value.test(pathname)) break;
  }
  return true;
};

const regExForAuth: RegExp[] = [/^\/payments/, /^\/my/, /^\/workspace/, /^\/widget/];
const regExForUnAuth: RegExp[] = [
  /^\/sign-in(?:\?.*)?$/,
  /^\/reset-password(?:\?.*)?$/,
  /^\/confirm-account(?:\?.*)?$/,
];
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthorized = isHasCookieRequired(request);
  console.log({ pathname });
  console.log({ isAuthorized });
  const isAuthDisAllowedPath = testPathNameRegEx(pathname, regExForUnAuth);
  if (isAuthDisAllowedPath && isAuthorized) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  const isAuthAllowedPath = testPathNameRegEx(pathname, regExForAuth);
  if (isAuthAllowedPath && !isAuthorized) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (isAuthAllowedPath && pathname === '/workspace') {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CODER}`);
  }
  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    '/sign-in',
    '/reset-password',
    '/confirm-account',
    '/payments/:path*',
    '/my/:path*',
    '/workspace',
    '/widget/:path*',
  ],
};
