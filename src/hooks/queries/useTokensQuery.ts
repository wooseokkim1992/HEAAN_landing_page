import { useQuery } from '@tanstack/react-query';

import { getTokensByGrantId } from '@/api/oidcAPI';

export const useTokensQuery = () => {
  return useQuery({
    queryKey: ['tokens'],
    queryFn: async () => getTokensByGrantId(),
    enabled: false, // This query is disabled by default, you can enable it with refatch()
  });
};
