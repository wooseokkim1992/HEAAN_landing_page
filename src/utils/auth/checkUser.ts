import axios, { AxiosResponse } from 'axios';
import { type ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { cookies } from 'next/headers';

import { type TResCheckUser } from '@typings/auth';
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
  return (
    Object.entries(obj)
      .map((elem) => `${elem[0]}=${elem[1]}`)
      .join('; ') + ';'
  );
};

export const deleteAllCookies = async (keyStrs: string[]) => {
  const cookieObj = await cookies();
  keyStrs.forEach((key) => {
    if (cookieObj.has(key)) {
      cookieObj.delete(key);
    }
  });
};

export const getUserValidation = async () => {
  const nameStrs = ['coder_session_token', 'h_sid'];
  try {
    const cookieObj1 = await getRequiredCookies({ names: nameStrs });
    const cookieStr = cookieObj1 ? convertIntoCookieStr(cookieObj1) : '';
    const { data } = await axios.get<TResCheckUser, AxiosResponse<TResCheckUser>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/me`,
      {
        withCredentials: true,
        headers: {
          Cookie: cookieStr,
        },
      },
    );
    return data;
  } catch (err) {
    console.error({ err });
    throw err;
  }
};
