'use client';

import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/commonConstants';
import { getUserValidation } from '@/utils/auth/checkUserCli';

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: [...[...QUERY_KEYS.USER()]],
    queryFn: getUserValidation,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });
};
