import { instance } from '@/api/axios';

export const getGrantId = async () => {
  const res = await instance.get(`${process.env.NEXT_PUBLIC_OIDC_DOMAIN}/api/user/grant-id`, {
    validateStatus: (status: number) => status === 200 || status === 401 || status === 422,
  });

  return res;
};

export const getTokensByGrantId = async () => {
  const res = await instance.get(`${process.env.NEXT_PUBLIC_OIDC_DOMAIN}/api/user/tokens`, {
    validateStatus: (status: number) =>
      status === 200 || status === 401 || status === 403 || status === 422,
  });

  return res;
};

export const getUserInfo = async () => {
  const res = await instance.get(`${process.env.NEXT_PUBLIC_OIDC_DOMAIN}/api/user/check`, {
    validateStatus: (status: number) => status === 200 || status === 401 || status === 422,
  });

  return res;
};
