import {
  ConfirmOrderType,
  PaymentsCancelType,
  TempOrderType,
} from "@/types/paymentsTypes";
import { instance } from "./axios";

export const postTempOrder = async ({
  orderId,
  amount,
  credit,
  currency,
  user_id,
}: TempOrderType) => {
  const res = await instance.post(
    `${process.env.NEXT_PUBLIC_BE_DOMAIN}/payments/order/`,
    {
      orderId,
      amount,
      credit,
      currency,
      user_id,
    },
    {
      validateStatus: (status: number) =>
        status === 201 || status === 400 || status === 403 || status === 409,
    },
  );

  return res;
};

export const postConfirmOrder = async ({
  orderId,
  amount,
  credit,
  paymentKey,
}: ConfirmOrderType) => {
  const res = await instance.post(
    `${process.env.NEXT_PUBLIC_BE_DOMAIN}/payments/confirm/`,
    {
      orderId,
      amount,
      credit,
      paymentKey,
    },
    {
      validateStatus: (status: number) =>
        status === 200 ||
        status === 400 ||
        status === 403 ||
        status === 409 ||
        status === 422 ||
        status === 500 ||
        status === 504,
    },
  );

  return res;
};

export const postCancelOrder = async ({
  cancelReason,
  cancelAmount,
  paymentKey,
}: PaymentsCancelType) => {
  const res = await instance.post(
    `${process.env.NEXT_PUBLIC_BE_DOMAIN}/payments/cancel/`,
    {
      cancelReason,
      cancelAmount,
      paymentKey,
    },
    {
      validateStatus: (status: number) =>
        status === 200 ||
        status === 400 ||
        status === 403 ||
        status === 404 ||
        status === 504,
    },
  );

  return res;
};

type PageType = { page: string };

export const getOrderList = async ({ page }: PageType) => {
  const res = await instance.get(
    `${process.env.NEXT_PUBLIC_BE_DOMAIN}/payments/list/?page=${page}`,
    {
      validateStatus: (status: number) =>
        status === 200 || status === 403 || status === 404,
    },
  );

  return res;
};

// TODO(BE): pagination
export const getCancelList = async () => {
  const res = await instance.get(
    `${process.env.NEXT_PUBLIC_BE_DOMAIN}/payments/cancel/list/`,
    {
      validateStatus: (status: number) => status === 200 || status === 403,
    },
  );

  return res;
};

export const getCancelOrder = async (transactionKey: string) => {
  const res = await instance.get(
    `${process.env.NEXT_PUBLIC_BE_DOMAIN}/payments/cancel/${transactionKey}/`,
    {
      validateStatus: (status: number) =>
        status === 200 || status === 403 || status === 404,
    },
  );

  return res;
};
