"use client";

import { useEffect, useState } from "react";
import {
  loadTossPayments,
  ANONYMOUS,
  TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";

import Button from "@/components/elements/Button";
import { useAuthStore } from "@/state/store/authStore";
import { postTempOrder } from "@/api/paymentsAPI";
import { BTN_TEXT, PATH_LIST } from "@/constants/commonConstants";
import { OrderField } from "@/types/paymentsTypes";

const Pricing = () => {
  const [orderInfo, setOrderInfo] = useState<OrderField>({
    orderId: "",
    amount: "1000",
    credit: 1000,
  });
  const [currency, setCurrency] = useState("KRW");

  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<null | TossPaymentsWidgets>(null);

  const { auth } = useAuthStore();

  const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY ?? "";

  console.log("TOSS ready? ", ready);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      try {
        const tossPayments = await loadTossPayments(clientKey);

        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentswidgets
        const widgets = tossPayments.widgets({
          customerKey: ANONYMOUS,
        });
        // 비회원 결제
        // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
        setWidgets(widgets);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
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
        // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderpaymentmethods
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          // 렌더링하고 싶은 결제 UI의 variantKey
          // 결제 수단 및 스타일이 다른 멀티 UI를 직접 만들고 싶다면 계약이 필요해요.
          // @docs https://docs.tosspayments.com/guides/v2/payment-widget/admin#새로운-결제-ui-추가하기
          variantKey: "DEFAULT",
        }),
        // ------  이용약관 UI 렌더링 ------
        // @docs https://docs.tosspayments.com/sdk/v2/js#widgetsrenderagreement
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
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
      if (!widgets) {
        throw new Error("Payment widgets are not initialized.");
      }

      await widgets.requestPayment({
        orderId: orderUUID, // 고유 주문 번호
        // orderId: orderInfo.orderId, // 고유 주문 번호
        orderName: "CODE.HEAAN order test",
        successUrl: window.location.origin + "/widget/success", // 결제 요청이 성공하면 리다이렉트되는 URL
        failUrl: window.location.origin + "/fail", // 결제 요청이 실패하면 리다이렉트되는 URL
        customerEmail: auth.username,
        customerName: auth.username,
        // 가상계좌 안내, 퀵계좌이체 휴대폰 번호 자동 완성에 사용되는 값입니다. 필요하다면 주석을 해제해 주세요.
        // customerMobilePhone: "01012341234",
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
          btnText={BTN_TEXT.paypalWidget}
          btnSize="lg"
          btnColor="blue01Filled"
          isLink={true}
          targetLink={PATH_LIST.paypalWidget}
        />
      </div>
      <div className="w-[400px]">
        <Button
          btnText={BTN_TEXT.internationalPaymentWidget}
          btnSize="lg"
          btnColor="blue01Filled"
          isLink={true}
          targetLink={PATH_LIST.internationalPaymentWidget}
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
              placeholder={"amount"}
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
              placeholder={"credit"}
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
              placeholder={"currency"}
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
      </div>
      <div className="w-[400px]">
        <Button
          btnText={"CREATE ORDER"}
          btnSize="lg"
          btnColor="blue01Filled"
          isLink={false}
          handleClick={testTemporaryOrder}
        />
      </div>
    </div>
  );
};

export default Pricing;
