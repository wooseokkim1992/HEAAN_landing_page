import dayjs from 'dayjs';
import { type ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';
import { User } from 'next-auth';
import { type JWT } from 'next-auth/jwt';

import { parseCookieInNextAuth } from '@utils/auth/loginUser';

import { COOKIES_NAMES_ARR } from '@constants/commonConstants';

import { type TResCheckUser } from '@typings/auth';
import { FetchError } from '@typings/errors/fetchError';

export const getCookies = async () => {
  return await cookies();
};

const customEvery = <T>(iterable: Iterable<T>, cb: (elem: T) => boolean): boolean => {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const { done, value } = iterator.next();
    if (done) return true;
    if (!cb(value)) break;
  }
  return false;
};

const checkCookieContainerKey = (cookieObj: ReadonlyRequestCookies) => {
  return (keyStr: string) => Boolean(cookieObj.get(keyStr));
};

export const getRequiredCookies = async ({
  names,
}: {
  names: string[];
}): Promise<{ [key: string]: string } | null> => {
  const cookieObj = await getCookies();
  const iter = names[Symbol.iterator]();
  const flag = customEvery(iter, checkCookieContainerKey(cookieObj));
  if (!flag) {
    return null;
  }
  const entry = names.map((name) => [name, cookieObj.get(name)?.value]);
  return Object.fromEntries(entry);
};

export const convertIntoCookieStr = (obj: { [key: string]: string }) => {
  return Object.entries(obj)
    .map((elem) => `${elem[0]}=${elem[1]}`)
    .join('; ')
    .trim();
};

export const deleteAllCookies = async (keyStrs: string[]) => {
  const cookieObj = await cookies();
  keyStrs.forEach((key) => {
    if (cookieObj.has(key)) {
      cookieObj.delete(key);
    }
  });
};

export const checkSession = async ({ cookieStr }: { cookieStr: string }) => {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/me`, {
      method: 'GET',
      headers: {
        Cookie: cookieStr,
      },
      signal: AbortSignal.timeout(5000),
    });
    console.log(resp.ok);
    if (!resp.ok) {
      throw new FetchError({ response: resp, message: 'Authentication Error' });
    }
    return resp;
  } catch (err) {
    console.log('err');
    throw err;
  }
};

export const getUserInfo = async <TResDTO extends object>(cookieStr: string): Promise<TResDTO> => {
  console.log({ cookieStr });

  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/me`, {
    method: 'GET',
    headers: {
      Cookie: cookieStr,
    },
    signal: AbortSignal.timeout(5000),
  });
  if (!resp.ok) {
    const errorResult = await resp.json();
    throw errorResult;
  }
  const data = (await resp.json()) as TResDTO;
  console.log({ data });
  return data;
};

export const getUserValidation = async () => {
  const nameStrs = ['coder_session_token', 'h_sid'];
  try {
    const cookieObj1 = await getRequiredCookies({ names: nameStrs });
    const cookieStr = cookieObj1 ? convertIntoCookieStr(cookieObj1) : '';
    const { data } = await getUserInfo<TResCheckUser>(cookieStr);
    return data;
  } catch (err) {
    console.error({ err });
    throw err;
  }
};

export const testPathNameRegEx = (pathname: string, regExArr: Iterable<RegExp>) => {
  const iterator = regExArr[Symbol.iterator]();
  while (true) {
    const { value, done } = iterator.next();
    if (done) return false;
    else if (value.test(pathname)) break;
  }
  return true;
};

export const extractTokenIntoString = ({ token }: { token: JWT }) => {
  const { info } = token;
  return info ? convertIntoCookieStr(info) : '';
};

export const checkTokenExpired = ({ tokenExp }: { tokenExp?: string; maxAge: number }) => {
  //console.log({ diffResult });
  const now = dayjs();
  console.log({ now: now.format('YYYY-MM-DD HH:mm:ss') });
  const exp = dayjs(tokenExp ?? now);
  console.log({ exp: exp.format('YYYY-MM-DD HH:mm:ss') });
  const diff = exp.diff(now);
  console.log({ diff });
  return tokenExp ? dayjs(tokenExp).diff(now) <= 0 : false;
};

export const checkSessionValidationInAuthServer = async ({
  token,
}: {
  token: JWT;
}): Promise<JWT> => {
  const clonedToken = JSON.parse(JSON.stringify(token)) as JWT;
  try {
    const cookieStr = extractTokenIntoString({ token: clonedToken });
    const respHeader = await checkSession({ cookieStr });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const cookieObj = parseCookieInNextAuth({ respHeader, cookieName: COOKIES_NAMES_ARR });
    // cookieObj 를 통해 갱신 정보 얻어올 예정
    const data = (await respHeader.json()) as TResCheckUser;
    clonedToken.user = data.data;
    clonedToken.errorInfo = undefined;
    // 갱신 정보를 cookie header 을 통해 얻어 올 때 cookie 에 새로 설정된 expiration date
    // 로 업데이트 할 예정
    console.log(token.hSidExpDate?.maxAge);
    clonedToken.hSidExpDate = {
      ...token.hSidExpDate,
      tokenExp: dayjs(Date.now())
        .add(token.hSidExpDate?.maxAge ?? 0, 'millisecond')
        .toISOString(),
    };
    return clonedToken;
  } catch (err) {
    clonedToken.errorInfo = err as FetchError;
    console.log({ errorInfo: clonedToken.errorInfo });
    //session 검증 실패 시 exp 값을 0 으로 지정하여 session callback 에서 null 을 반환하여
    // user 객체를 제거함
    return clonedToken;
  }
};

export const injectUserIntoToken = ({ user, token }: { user: User; token: JWT }): JWT => {
  const clonedToken = JSON.parse(JSON.stringify(token)) as JWT;
  clonedToken.user = user.data;
  clonedToken.info = user.info;
  clonedToken.errorInfo = undefined;
  clonedToken.coderSessionExpDate = user.coderSessionExpDate;
  clonedToken.hSidExpDate = user.hSidExpDate;
  return clonedToken;
};
