import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logout } from '@utils/auth/logoutUserCli';

import { QUERY_KEYS } from '@constants/commonConstants';

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
