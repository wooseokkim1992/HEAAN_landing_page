import { FC } from 'react';

import TempLogin from '@/components/main/TempLogin';

type SignInPageProps = {
  searchParams: Promise<{ uid: string }>;
};

const SignInPage: FC<SignInPageProps> = async ({ searchParams }) => {
  const { uid } = await searchParams;
  return <div className="block w-dvw h-dvh">{uid && <TempLogin uid={uid} />}</div>;
};

export default SignInPage;
