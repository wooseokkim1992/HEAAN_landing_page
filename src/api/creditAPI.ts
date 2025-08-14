import { instance } from '@/api/axios';

export const getUserCreditInfo = async () => {
  const res = await instance.get(`${process.env.NEXT_PUBLIC_BE_DOMAIN}/credits/user/info/`, {
    validateStatus: (status: number) =>
      status === 200 || status === 400 || status === 403 || status === 404,
  });

  return res;
};

export const getCreditChargeList = async () => {
  const res = await instance.get(`${process.env.NEXT_PUBLIC_BE_DOMAIN}/credits/charge/list/`, {
    validateStatus: (status: number) => status === 200 || status === 403 || status === 404,
  });

  return res;
};

export const getCreditDeductList = async () => {
  const res = await instance.get(`${process.env.NEXT_PUBLIC_BE_DOMAIN}/credits/deduct/list/`, {
    validateStatus: (status: number) => status === 200 || status === 403 || status === 404,
  });

  return res;
};

export const getCreditRefundList = async () => {
  const res = await instance.get(`${process.env.NEXT_PUBLIC_BE_DOMAIN}/credits/refund/list/`, {
    validateStatus: (status: number) => status === 200 || status === 403,
  });

  return res;
};
