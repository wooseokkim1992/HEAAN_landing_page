'use client';

import { SessionProvider } from 'next-auth/react';
import { type FC } from 'react';

const NextAuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
