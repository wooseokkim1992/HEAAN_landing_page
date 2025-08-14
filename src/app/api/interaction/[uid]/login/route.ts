import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

type TParams = {
  uid?: string;
};

export const POST = async (request: NextRequest, { params }: { params: TParams }) => {
  const { formData } = request;
  const { uid } = await params;
  console.log({ uid });
  if (!uid) {
    return NextResponse.json({ errorMessage: 'uid 값이 존재하지 않습니다' }, { status: 403 });
  }
  const data = await formData();
  const username = data.get('username');
  const password = data.get('password');
  console.log({ username });
  console.log({ password });
  if (
    process.env.OIDC_API_URL &&
    process.env.CODER_API_URL &&
    username &&
    password &&
    typeof username === 'string' &&
    typeof password === 'string'
  ) {
    try {
      console.log({ request });
      console.log({ username });
      console.log({ password });
      const origin = request.headers.get('origin');
      console.log({ origin });
      if (origin) {
        const resp = await axios.post(
          `${process.env.OIDC_API_URL}/interaction/${uid}/login`,
          {
            username,
            password,
          },
          { baseURL: process.env.OIDC_API_URL, headers: { Origin: origin } },
        );
        console.log({ resp });
        return NextResponse.redirect(`http://localhost:3000/`);
      }
      return;
    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError && err.isAxiosError) {
        return NextResponse.json({ errorMessage: err.message }, { status: err.status });
      }
      return NextResponse.json({ message: 'next 서버 오류' }, { status: 403 });
    }
  }

  return NextResponse.json({ errorMessage: '부적절한 form data' }, { status: 403 });
};
