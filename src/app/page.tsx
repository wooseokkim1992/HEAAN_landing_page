// import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';

import MainPage from '@/app/(main)/MainPage';
// import { getUserValidation } from '@utils/auth/checkUser';

// import { QUERY_KEYS } from '@constants/commonConstants';

export default function Home() {
  // const queryClient = new QueryClient();
  // try {
  //   const resp = await queryClient.prefetchQuery({
  //     queryKey: [...QUERY_KEYS.USER()],
  //     queryFn: getUserValidation,
  //   });
  //   console.log({ resp });
  // } catch (err) {
  //   console.log({ err });
  // }
  // return <MainPage />;
  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <MainPage />
    // </HydrationBoundary>
  );
}
