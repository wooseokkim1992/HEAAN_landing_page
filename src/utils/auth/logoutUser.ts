import { FetchError } from '@typings/errors/fetchError';

export const signOutInServer = async ({ cookieStr }: { cookieStr: string }) => {
  console.log({ cookieStr });
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStr,
    },
    signal: AbortSignal.timeout(50000),
  });
  console.log({ resp });
  if (!resp.ok) {
    throw new FetchError({ response: resp, message: 'api 서버 오류' });
  }
  return resp;
};
