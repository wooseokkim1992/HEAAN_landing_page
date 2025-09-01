import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import { FC } from 'react';

import { getUserValidation } from '@utils/auth/checkUser';

import { QUERY_KEYS } from '@constants/commonConstants';

const AuthHydration: FC<{ children: React.ReactNode }> = async ({ children }) => {
  const queryClient = new QueryClient();
  try {
    await queryClient.prefetchQuery({
      queryKey: [...QUERY_KEYS.USER()],
      queryFn: getUserValidation,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    queryClient.setQueryData([...QUERY_KEYS.USER()], null);
  }
  return <HydrationBoundary state={dehydrate(queryClient, {})}>{children}</HydrationBoundary>;
};

export default AuthHydration;
