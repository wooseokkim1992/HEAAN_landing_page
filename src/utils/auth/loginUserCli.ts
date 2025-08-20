import { type AxiosResponse } from 'axios';

import { authInstance } from '@/constants/axiosInstances';
import { type TLoginReqDTO, type TNormalRespDTO } from '@/typings/auth';

export const login = async ({ email, password }: TLoginReqDTO) => {
  try {
    await authInstance.post<TNormalRespDTO, AxiosResponse<TNormalRespDTO>, TLoginReqDTO>('/login', {
      email,
      password,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
