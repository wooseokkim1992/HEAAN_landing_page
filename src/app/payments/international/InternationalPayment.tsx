'use client';

import { loadTossPayments, TossPaymentsPayment } from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';

import { postTempOrder } from '@/api/paymentsAPI';
import Button from '@/components/elements/Button';
import { useAuthStore } from '@/state/store/authStore';
import { OrderField } from '@/typings/paymentsTypes';

const InternationalPayment = () => {
  const [orderInfo, setOrderInfo] = useState<OrderField>({
    orderId: '',
    amount: '1000',
    credit: 1000,
  });
  const [currency, setCurrency] = useState('KRW');
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);

  const { auth } = useAuthStore();

  const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
  const customerKey = 'ii4RLf9MM7iuClXBEwlgY';

  useEffect(() => {
    (async () => {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentspayment
        const payment = tossPayments.payment({
          customerKey,
        });

        setPayment(payment);
      } catch (error) {
        console.error('Error fetching payment:', error);
      }
    })();
  }, [clientKey]);

  const testTemporaryOrder = async () => {
    const uuid = crypto.randomUUID();

    const orderUUID = `ORDER_${uuid}`;
    setOrderInfo((prev) => ({ ...prev, orderId: orderUUID }));

    // await requestTossPayments(orderUUID);
    try {
      const res = await postTempOrder({
        orderId: orderUUID,
        amount: orderInfo.amount,
        credit: orderInfo.credit,
        currency: currency,
        user_id: auth.username,
      });

      if (res.status === 201) {
        await requestTossPayments(orderUUID);
      }
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const requestTossPayments = async (orderUUID: string) => {
    try {
      // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
      // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
      if (!payment) {
        throw new Error('Payment widgets are not initialized.');
      }

      await payment.requestPayment({
        method: 'CARD', // 카드 및 간편결제
        amount: {
          value: Number(orderInfo.amount), // 결제 금액
          currency: currency, // 통화 단위
        },
        orderId: orderUUID, // 고유 주문번호
        orderName: '토스 티셔츠 외 2건',
        successUrl: window.location.origin + '/widget/success',
        failUrl: window.location.origin + '/fail',
        customerEmail: auth.username,
        customerName: auth.username,
        customerMobilePhone: '01012341234',
        // 카드 결제에 필요한 정보
        card: {
          useEscrow: false,
          flowMode: 'DEFAULT', // 통합결제창 여는 옵션
          useCardPoint: false,
          useAppCardOnly: false,
          useInternationalCardOnly: true, // 다국어 결제창
        },
      });
    } catch (error) {
      // 에러 처리하기
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-8 p-20">
      <h2>INTERNATIONAL PAYMENT</h2>
      <div>
        <div className="border-blue03 flex max-w-[500px] flex-col gap-8 rounded border p-8">
          <p className="text-text01">ORDER ID : {orderInfo.orderId}</p>
          <div className="flex items-center gap-4">
            <label className="text-text04">AMOUNT</label>
            <input
              id="amount"
              className={`placeholder-text04 border-text03 text-text01 h-7 w-full border-b text-sm outline-none sm:text-base`}
              type="text"
              placeholder={'amount'}
              value={orderInfo.amount}
              onChange={(e) =>
                setOrderInfo((prev) => ({
                  ...prev,
                  amount: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="text-text04">CREDIT</label>
            <input
              id="credit"
              className={`placeholder-text-04 border-text03 text-text01 h-7 w-full border-b text-sm outline-none sm:text-base`}
              type="number"
              placeholder={'credit'}
              value={orderInfo.credit}
              onChange={(e) =>
                setOrderInfo((prev) => ({
                  ...prev,
                  credit: Number(e.target.value),
                }))
              }
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="text-text04">CURRENCY</label>
            <input
              id="currency"
              className={`placeholder-text-04 border-text03 text-text01 h-7 w-full border-b text-sm outline-none sm:text-base`}
              type="text"
              placeholder={'currency'}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="w-[400px]">
        <Button
          btnText={'CREATE ORDER'}
          btnSize="lg"
          btnColor="blue01Filled"
          isLink={false}
          handleClick={testTemporaryOrder}
        />
      </div>
    </div>
  );
};

export default InternationalPayment;
