import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '@/api/oidcAPI';

export const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => await getUserInfo(),
    enabled: false,
  });
};
