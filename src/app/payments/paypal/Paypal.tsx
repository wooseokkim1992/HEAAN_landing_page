'use client';

import { loadTossPayments, ANONYMOUS, TossPaymentsWidgets } from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';

import { postTempOrder } from '@/api/paymentsAPI';
import Button from '@/components/elements/Button';
import { BTN_TEXT, PATH_LIST } from '@/constants/commonConstants';
import { useAuthStore } from '@/state/store/authStore';
import { OrderField } from '@/typings/paymentsTypes';

const Paypal = () => {
  const [orderInfo, setOrderInfo] = useState<OrderField>({
    orderId: '',
    amount: '1000',
    credit: 1000,
  });
  const [currency, setCurrency] = useState('USD');

  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<null | TossPaymentsWidgets>(null);

  const { auth } = useAuthStore();

  const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY ?? '';

  console.log('Paypal ready? ', ready);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientKey);

        // 회원 결제
        const widgets = tossPayments.widgets({
          customerKey: ANONYMOUS,
        });
        // 비회원 결제
        setWidgets(widgets);
      } catch (error) {
        console.error('Error fetching payment widget:', error);
      }
    }

    fetchPaymentWidgets();
  }, [clientKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }

      // ------  주문서의 결제 금액 설정 ------
      // TODO: 위젯의 결제금액을 결제하려는 금액으로 초기화하세요.
      // TODO: renderPaymentMethods, renderAgreement, requestPayment 보다 반드시 선행되어야 합니다.
      // @docs https://docs.tosspayments.com/sdk/v2/js#widgetssetamount
      await widgets.setAmount({
        value: Number(orderInfo.amount),
        currency: currency,
      });

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          // 렌더링하고 싶은 결제 UI의 variantKey
          variantKey: 'PAYPAL',
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

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

  /* PAYPAL TEST ACCOUNT */
  // tosspayments-paypal@example.com
  // tosskim123!@#

  const requestTossPayments = async (orderUUID: string) => {
    try {
      // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
      // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
      if (!widgets) {
        throw new Error('Payment widgets are not initialized.');
      }

      await widgets.requestPayment({
        orderId: orderUUID, // 고유 주문 번호
        orderName: 'CODE.HEAAN Paypal order test',
        successUrl: window.location.origin + '/widget/success', // 결제 요청이 성공하면 리다이렉트되는 URL
        failUrl: window.location.origin + '/fail', // 결제 요청이 실패하면 리다이렉트되는 URL
        customerEmail: auth.username,
        customerName: auth.username,
        customerMobilePhone: '01012341234',
        foreignEasyPay: {
          country: 'US',
          products: [
            {
              name: 'NeoPhone',
              quantity: 1,
              unitAmount: 400,
              currency: 'USD',
              description: 'Green color, 2023',
            },
            {
              name: 'NeoPad',
              quantity: 1,
              unitAmount: 600,
              currency: 'USD',
              description: 'Grey color',
            },
          ],
          shipping: {
            fullName: 'Toss Kim',
            address: {
              country: 'US',
              line1: '2nd st 105',
              line2: 'unit #105',
              area1: 'CA',
              area2: 'San Jose',
              postalCode: '16328',
            },
          },
          paymentMethodOptions: {
            // PayPal에서 요구하는 추가 파라미터
            paypal: {
              setTransactionContext: {
                // PayPal STC 파라미터 예시 (구매자의 로그인 정보)
                sender_account_id: 'kimToss01',
                sender_first_name: 'Toss',
                sender_last_name: 'Kim',
                sender_email: 'toss@sample.com',
                sender_phone: '(1) 562 254 5591',
                sender_country_code: 'US',
                sender_create_date: '2012-12-09T 19:14:55.277-0:00',
              },
            },
          },
        },
      });
    } catch (error) {
      // 에러 처리하기
      console.error(error);
    }
  };

  return (
    <div className="flex w-full flex-col gap-8 p-20">
      <h2>PRICING</h2>
      <div className="w-[400px]">
        <Button
          btnText={BTN_TEXT.pricing}
          btnSize="lg"
          btnColor="blue01Filled"
          isLink
          targetLink={PATH_LIST.pricing}
        />
      </div>
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
      <div>
        {/* 결제 UI */}
        <div id="payment-method" />
        {/* 이용약관 UI */}
        <div id="agreement" />
        <button
          onClick={testTemporaryOrder}
          className="button"
          id="payment-button"
          style={{ marginTop: '30px', color: 'tomato' }}
        >
          결제하기
        </button>
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

export default Paypal;
