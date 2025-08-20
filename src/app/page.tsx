import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';

import MainPage from '@/app/(main)/MainPage';
import { getUserValidation } from '@utils/auth/checkUser';

import { QUERY_KEYS } from '@constants/commonConstants';

export default async function Home() {
  const queryClient = new QueryClient();
  try {
    await queryClient.prefetchQuery({
      queryKey: [...QUERY_KEYS.USER()],
      queryFn: getUserValidation,
    });
  } catch (err) {
    console.log({ err });
  }
  // return <MainPage />;
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainPage />
    </HydrationBoundary>
  );
}
