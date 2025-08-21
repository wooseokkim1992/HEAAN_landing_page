import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/commonConstants';
import { logout } from '@/utils/auth/logoutUserCli';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logout(),
    onSuccess() {
      //queryClient.invalidateQueries({ queryKey: [...QUERY_KEYS.USER()] });
      queryClient.removeQueries({ queryKey: [...QUERY_KEYS.USER()] });
    },
    onError(error) {
      console.log({ error });
    },
  });
};
