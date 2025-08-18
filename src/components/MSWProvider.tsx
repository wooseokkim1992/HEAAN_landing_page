'use client';
import { FC, useEffect } from 'react';

import { initWorker } from '@/utils/msw/initWorker';

type MSWProviderProps = {
  children: React.ReactNode;
};

const MSWProvider: FC<MSWProviderProps> = ({ children }) => {
  useEffect(() => {
    console.log('init workder');
    initWorker();
  }, []);
  return <>{children}</>;
};

export default MSWProvider;
