import dayjs from 'dayjs';

import { type TExpDate, type TInfo } from '@typings/auth';
import { FetchError } from '@typings/errors/fetchError';
export const logIn = async <TReqDTO extends object>({
  data,
}: {
  data: TReqDTO;
}): Promise<Response> => {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
      signal: AbortSignal.timeout(10000),
    });
    if (!resp.ok) {
      throw new FetchError({ response: resp, message: 'sign in error' });
    }
    return resp;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const customIncludes = ({ arr, val }: { arr: Iterable<string>; val: string }): boolean => {
  const iterator = arr[Symbol.iterator]();
  while (true) {
    const { value, done } = iterator.next();
    if (done) break;
    if (value === val) return true;
  }
  return false;
};

export const parseCookieInNextAuth = ({
  respHeader,
  cookieName,
}: {
  respHeader: Response;
  cookieName: string[];
}): { info: TInfo; expDateObj: { [key: string]: TExpDate } } => {
  const cookies = respHeader.headers.getSetCookie();
  const mapData = new Map<string, string>();
  const expData = new Map<string, TExpDate>();
  cookies.forEach((cookieStr) => {
    console.log({ cookieStr });
    const cookieElems = cookieStr.split(';');
    const [key, val] = cookieElems[0].split('=');
    if (customIncludes({ arr: cookieName, val: key }) && !mapData.has(key)) {
      mapData.set(key, val);
      expData.set(key, parseCookieExpData({ cookies: cookieElems }));
    }
  });
  return {
    info: Object.fromEntries(mapData.entries()),
    expDateObj: Object.fromEntries(expData.entries()),
  };
};

export const parseCookieExpData = ({ cookies }: { cookies: string[] }): TExpDate => {
  const maxAgeRegEx = new RegExp(/^Max-Age=/);
  //const expireRegEx = new RegExp(/^Expires=/);
  const cookieNewArr = cookies.slice(1).map((elem) => elem.trim());
  const maxAgeStr = cookieNewArr.find((elem) => maxAgeRegEx.test(elem));
  const maxAgeNum = maxAgeStr ? Number(maxAgeStr?.split('=')[1]) : 0;
  console.log({ maxAgeNum });
  const expireStr = dayjs(Date.now()).add(maxAgeNum, 'millisecond');
  return {
    maxAge: maxAgeStr ? Number(maxAgeStr?.split('=')[1]) : 0,
    tokenExp: expireStr.toISOString(),
  };
};

export const isCookieInfo = (data: object): data is TInfo => {
  const keyArr = Object.keys(data);
  return (
    customIncludes({ arr: keyArr, val: 'h_sid' }) &&
    customIncludes({ arr: keyArr, val: 'coder_session_token' })
  );
};
