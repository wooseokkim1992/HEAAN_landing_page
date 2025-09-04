'use client';

import { useQuery } from '@tanstack/react-query';

import { getUserValidation } from '@utils/auth/checkUserCli';

import { QUERY_KEYS } from '@constants/commonConstants';

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: [...QUERY_KEYS.USER()],
    queryFn: getUserValidation,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 0,
  });
};
