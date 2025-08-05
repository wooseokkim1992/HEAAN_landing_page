import axios, { AxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

import { signInUrlRegEx } from '@/constants/sign-in/sign-in';
import { appendPath } from '@/utils/sign-in/manipulateURL';

export async function GET(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log({ pathname });
  const ua = request.headers.get('user-agent');
  const endPointURL = appendPath({
    originalURL: pathname,
    newPathToAppend: '/v2/users/oidc',
    baseURL: process.env.CODER_API_URL,
  });
  if (endPointURL) {
    console.log({ endPointURL: endPointURL?.toString() });
    const reqConfig: AxiosRequestConfig = {
      method: request.method,
      url: `${process.env.CODER_API_URL}/api/v2/users/oidc/callback`,
      headers: {
        'User-Agent': ua,
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        referer: 'https://wooseok.iheaan.io/',
      },
    };

    const resp = await axios.get(
      `${process.env.CODER_API_URL}/api/v2/users/oidc/callback`,
      reqConfig,
    );

    const subHeader = resp.request._header;
    if (Boolean(subHeader) && signInUrlRegEx.test(subHeader)) {
      const redirectUrl = subHeader.split('HTTP/1.1')[0]?.split('GET')[1].trim();
      console.log({ redirectUrl });
      const uid = new URLSearchParams(redirectUrl).get('uid');
      redirect(`/sign-in?uid=${uid}`);
    }
    redirect(request.url);
  }
}
