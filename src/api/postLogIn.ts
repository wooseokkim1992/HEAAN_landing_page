import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/commonConstants';
import { type TLoginReqDTO } from '@/typings/auth';
import { login } from '@/utils/auth/loginUserCli';

export const usePostLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reqData: TLoginReqDTO) => login(reqData),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [...QUERY_KEYS.USER()] });
    },
    onError(error) {
      console.error({ error });
    },
  });
};
