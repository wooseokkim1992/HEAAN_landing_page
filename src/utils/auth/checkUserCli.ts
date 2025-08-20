import { AxiosResponse } from 'axios';

import { authInstance } from '@/constants/axiosInstances';
import { type TResCheckUser } from '@/typings/auth';

export const getUserValidation = async () => {
  return await authInstance
    .get<TResCheckUser, AxiosResponse<TResCheckUser>>('/auth/user/me')
    .then((resp) => resp.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
