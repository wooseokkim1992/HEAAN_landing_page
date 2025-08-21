import { AxiosResponse } from 'axios';

import { authInstance } from '@/constants/axiosInstances';
import { type TNormalRespDTO } from '@/typings/auth';

export const logout = async () => {
  return await authInstance.delete<TNormalRespDTO, AxiosResponse<TNormalRespDTO>, undefined>(
    '/logout',
  );
};
