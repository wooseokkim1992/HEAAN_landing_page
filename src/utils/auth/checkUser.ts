import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

import { type TResCheckUser } from '@typings/auth';

export const getCookies = async () => {
  return await cookies();
};

export const getUserValidation = async () => {
  try {
    const cookieObj = await getCookies();
    console.log({ cookieObj });
    const coder_session_token = cookieObj.get('coder_session_token');
    const h_sid = cookieObj.get('h_sid');
    console.log({ coder_session_token });
    console.log({ h_sid });
    const { data } = await axios.get<TResCheckUser, AxiosResponse<TResCheckUser>>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/user/me`,
      {
        withCredentials: true,
        headers: {
          Cookie: `coder_session_token=${coder_session_token?.value}; h_sid=${h_sid?.value};`,
        },
      },
    );
    console.log({ data });
    return data;
  } catch (err) {
    console.error({ err });
    throw err;
  }
};
