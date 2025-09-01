'use server';
import { getServerSession } from 'next-auth';
import { type FC } from 'react';

import { authOptions } from '@/utils/auth/nextAuth';

const NextAuthHydrationBoundary: FC<{ children: React.ReactNode }> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  console.log({ session });
  return <>{children}</>;
};

export default NextAuthHydrationBoundary;
