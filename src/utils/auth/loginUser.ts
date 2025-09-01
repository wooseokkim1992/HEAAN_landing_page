import { type TInfo } from '@typings/auth';

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
      const err = await resp.json();
      throw err;
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
}): TInfo => {
  const cookies = respHeader.headers.getSetCookie();
  const mapData = new Map<string, string>();
  cookies.forEach((cookieStr) => {
    const cookieElems = cookieStr.split(';');
    const [key, val] = cookieElems[0].split('=');
    if (customIncludes({ arr: cookieName, val: key }) && !mapData.has(key)) {
      console.log({ val });
      mapData.set(key, val);
    }
  });
  return Object.fromEntries(mapData.entries());
};

export const isCookieInfo = (data: object): data is TInfo => {
  const keyArr = Object.keys(data);
  return (
    customIncludes({ arr: keyArr, val: 'h_sid' }) &&
    customIncludes({ arr: keyArr, val: 'coder_session_token' })
  );
};
