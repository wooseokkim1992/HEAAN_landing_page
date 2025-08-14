"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/elements/Button";
import LoadingSpinner from "@/components/elements/LoadingSpinner";
import { useAuthStore } from "@/state/store/authStore";
import { handleSignOut } from "@/api/authAPI";
import {
  getCreditChargeList,
  getCreditDeductList,
  getCreditRefundList,
  getUserCreditInfo,
} from "@/api/creditAPI";
import {
  getCancelList,
  getCancelOrder,
  getOrderList,
  postCancelOrder,
} from "@/api/paymentsAPI";
import { ALERT_MSG, BTN_TEXT, PATH_LIST } from "@/constants/commonConstants";

// TODO:DELETE
// const ORDER_SAMPLE = [
//   {
//     approvedAt: "2025-06-12T12:00:21Z",
//     balanceAmount: "1000.00",
//     cancels: [],
//     card: null,
//     checkout_url:
//       "https://api.tosspayments.com/v1/payments/tgen_20250612210005G0jt7/checkout",
//     country: "KR",
//     cultureExpense: false,
//     currency: "KRW",
//     deleted_at: null,
//     discount: null,
//     isPartialCancelable: true,
//     is_failed: false,
//     is_paypal: false,
//     lastTransactionKey: "txrd_a01jxj06dbynkyd7w3qqtky4sps",
//     mId: "tgen_docs",
//     method: "간편결제",
//     orderId: "ORDER_bd875aed-120d-4e00-908b-0af4f37dd0d3",
//     orderName: "CODE.HEAAN order test",
//     paymentKey: "tgen_20250612210005G0jt7",
//     receipt_url:
//       "https://dashboard.tosspayments.com/receipt/redirection?transactionId=tgen_20250612210005G0jt7&ref=PX",
//     requestedAt: "2025-06-12T12:00:05Z",
//     secret: "ps_BX7zk2yd8yjAXwRLJ7xp3x9POLqK",
//     status: "DONE",
//     suppliedAmount: "909.00",
//     taxExemptionAmount: "0.00",
//     taxFreeAmount: "0.00",
//     temp_order: 7,
//     totalAmount: "1000.00",
//     type: "NORMAL",
//     useEscrow: false,
//     user_id: "geuna0204@gmail.com",
//     vat: "91.00",
//     version: "2022-11-16",
//   },
// ];

type OrderListItemType = {
  approvedAt: string;
  balanceAmount: string;
  totalAmount: string;
  orderId: string;
  currency: string;
  paymentKey: string;
};

type CancelListItemType = {
  canceledAt: string;
  cancelAmount: string;
  cancelReason: string;
  orderId: string;
  cancelStatus: string;
  payment: string;
  transactionKey: string;
};

const MyPage = () => {
  const [paymentKey, setPaymentKey] = useState("");
  const [transactionKey, setTransactionKey] = useState("");
  const [orderList, setOrderList] = useState<OrderListItemType[]>([]);
  const [cancelList, setCancelList] = useState<CancelListItemType[]>([]);
  const [cancelListItem, setCancelListItem] = useState("");

  const [cancelOrder, setCancelOrder] = useState({
    cancelReason: "",
    cancelAmount: "",
  });

  const router = useRouter();

  const { auth } = useAuthStore();
  // const { auth, setAuth } = useAuthStore();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuth) {
      if (window.confirm(ALERT_MSG.auth.permissionDenied))
        router.replace(PATH_LIST.main);
    }
  }, [auth.isLoading, auth.isAuth]);

  const onSignOut = () => {
    handleSignOut();
    // setAuth({ isAuth: false, username: "", isLoading: false });
  };

  if (auth.isLoading) {
    return <LoadingSpinner />;
  }

  const testCredits = async () => {
    try {
      const res = await getUserCreditInfo();
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const testGetOrder = async () => {
    try {
      const res = await getOrderList({ page: "1" });

      if (res.status === 200) {
        console.log("getOrderList", res.data);
        const resArr = (res.data as OrderListItemType[]).map((val) => ({
          approvedAt: val.approvedAt,
          balanceAmount: val.balanceAmount,
          totalAmount: val.totalAmount,
          orderId: val.orderId,
          currency: val.currency,
          paymentKey: val.paymentKey,
        }));

        setOrderList(resArr);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectPaymentKey = (target: string) => setPaymentKey(target);

  const testCancelOrder = async () => {
    try {
      const res = await postCancelOrder({
        ...cancelOrder,
        paymentKey,
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const testGetCancelList = async () => {
    try {
      const res = await getCancelList();

      if (res.status === 200) {
        console.log("getCancelList", res.data);

        const resArr = (res.data as CancelListItemType[]).map((val) => ({
          canceledAt: val.canceledAt,
          cancelAmount: val.cancelAmount,
          cancelReason: val.cancelReason,
          orderId: val.orderId,
          cancelStatus: val.cancelStatus,
          payment: val.payment,
          transactionKey: val.transactionKey,
        }));

        setCancelList(resArr);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const testGetCancelOrder = async () => {
    try {
      const res = await getCancelOrder(transactionKey);

      if (res.status === 200) {
        console.log("getCancelOrder", res.data);
        const str = JSON.stringify(res.data);
        setCancelListItem(str);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const testGetCreditChargeList = async () => {
    try {
      const res = await getCreditChargeList();

      if (res.status === 200) {
        console.log("getCreditChargeList", res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const testGetCreditDeductList = async () => {
    try {
      const res = await getCreditDeductList();
      if (res.status === 200) {
        console.log("getCreditDeductList", res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const testGetCreditRefundList = async () => {
    try {
      const res = await getCreditRefundList();
      if (res.status === 200) {
        console.log("getCreditRefundList", res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!auth.isLoading && auth.isAuth && !!auth.username)
    return (
      <div className="flex w-full flex-col gap-20 py-10">
        <div className="flex w-full items-center gap-8">
          <h2 className="">Hello, {auth.username}</h2>
          <div className="w-fit">
            <Button
              btnText={BTN_TEXT.pricing}
              btnSize="md"
              btnColor="blue01Filled"
              isLink={true}
              targetLink={PATH_LIST.pricing}
            />
          </div>
          <div className="w-fit">
            <Button
              btnText={BTN_TEXT.signOut}
              btnSize="md"
              btnColor="blue01Filled"
              isLink={false}
              handleClick={onSignOut}
            />
          </div>
        </div>

        <div className="border-blue03 flex w-full flex-col gap-8 rounded border p-8">
          <div className="w-fit">
            <Button
              btnText={"GET ORDER LIST"}
              btnSize="md"
              btnColor="blue01Filled"
              isLink={false}
              handleClick={testGetOrder}
            />
          </div>
          <ul className="flex flex-col gap-4">
            {orderList.map((val, i) => {
              return (
                <li
                  key={`${val.orderId}-${i}`}
                  className="text-text01 border-text04 flex flex-col gap-2 rounded border p-2"
                >
                  <span>approvedAt: {val.approvedAt}</span>
                  <span>balanceAmount: {val.balanceAmount}</span>
                  <span>totalAmount: {val.totalAmount}</span>
                  <span>orderId: {val.orderId}</span>
                  <span>currency: {val.currency}</span>
                  <div className="flex items-center gap-2">
                    <span>paymentKey: {val.paymentKey}</span>
                    <div className="w-fit">
                      <Button
                        btnText={"SELECT"}
                        btnSize="md"
                        btnColor="blue03Outline"
                        isLink={false}
                        handleClick={() =>
                          handleSelectPaymentKey(val.paymentKey)
                        }
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-8">
          <h2>PAYMENTS</h2>

          <div className="border-blue03 flex max-w-[500px] flex-col gap-8 rounded border p-8">
            <p className="border-text03 text-text01 h-7 w-full border-b text-sm sm:text-base">
              PAYMENTKEY : {paymentKey}
            </p>
            <input
              id="cancelReason"
              className={`placeholder-text-04 border-text03 text-text01 h-7 w-full border-b text-sm outline-none sm:text-base`}
              type="text"
              placeholder={"cancelReason"}
              value={cancelOrder.cancelReason}
              onChange={(e) =>
                setCancelOrder((prev) => ({
                  ...prev,
                  cancelReason: e.target.value,
                }))
              }
            />
            <input
              id="cancelAmount"
              className={`placeholder-text-04 border-text03 text-text01 h-7 w-full border-b text-sm outline-none sm:text-base`}
              type="text"
              placeholder={"cancelAmount"}
              value={cancelOrder.cancelAmount}
              onChange={(e) =>
                setCancelOrder((prev) => ({
                  ...prev,
                  cancelAmount: e.target.value,
                }))
              }
            />
            <div className="w-fit">
              <Button
                btnText={"CANCEL ORDER"}
                btnSize="md"
                btnColor="blue01Filled"
                isLink={false}
                handleClick={testCancelOrder}
              />
            </div>
          </div>

          <div className="border-blue03 flex w-full flex-col gap-8 rounded border p-8">
            <div className="w-fit">
              <Button
                btnText={"GET CANCEL LIST"}
                btnSize="md"
                btnColor="blue01Filled"
                isLink={false}
                handleClick={testGetCancelList}
              />
            </div>
            <ul className="flex flex-col gap-4">
              {cancelList.map((val, i) => {
                return (
                  <li
                    key={`${val.orderId}-${i}`}
                    className="text-text01 border-text04 flex flex-col gap-2 rounded border p-2"
                  >
                    <span>canceledAt: {val.canceledAt}</span>
                    <span>cancelAmount: {val.cancelAmount}</span>
                    <span>cancelReason: {val.cancelReason}</span>
                    <span>orderId: {val.orderId}</span>
                    <span>cancelStatus: {val.cancelStatus}</span>
                    <span>payment: {val.payment}</span>
                    <div className="flex items-center gap-2">
                      <span>transactionKey: {val.transactionKey}</span>
                      <div className="w-fit">
                        <Button
                          btnText={"SELECT"}
                          btnSize="md"
                          btnColor="blue03Outline"
                          isLink={false}
                          handleClick={() =>
                            setTransactionKey(val.transactionKey)
                          }
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-blue03 flex w-full flex-col gap-8 rounded border p-8">
            <p className="border-text03 text-text01 h-7 w-full border-b text-sm sm:text-base">
              TRANSACTIONKEY : {transactionKey}
            </p>
            <div className="w-fit">
              <Button
                btnText={"GET CANCEL ORDER"}
                btnSize="md"
                btnColor="blue01Filled"
                isLink={false}
                handleClick={testGetCancelOrder}
              />
            </div>
            <p className="text-text01 w-full text-sm sm:text-base">
              {cancelListItem}
            </p>
          </div>
        </div>

        <div>
          <h2>CREDITS</h2>
        </div>
        <div className="border-blue03 flex w-full flex-col gap-8 rounded border p-8">
          <p className="border-text03 text-text01 h-7 w-full border-b text-sm sm:text-base">
            TRANSACTIONKEY : {transactionKey}
          </p>
          <div className="w-fit">
            <Button
              btnText={"GET USER CREDIT INFO"}
              btnSize="md"
              btnColor="blue01Filled"
              isLink={false}
              handleClick={testCredits}
            />
          </div>
          <p className="text-text01 w-full text-sm sm:text-base">
            {cancelListItem}
          </p>
        </div>
        <div className="border-blue03 flex w-full flex-col gap-8 rounded border p-8">
          <div className="w-fit">
            <Button
              btnText={"GET CREDIT CHARGE LIST"}
              btnSize="md"
              btnColor="blue01Filled"
              isLink={false}
              handleClick={testGetCreditChargeList}
            />
          </div>
          <div className="w-fit">
            <Button
              btnText={"GET CREDIT DEDUCT LIST"}
              btnSize="md"
              btnColor="blue01Filled"
              isLink={false}
              handleClick={testGetCreditDeductList}
            />
          </div>
          <div className="w-fit">
            <Button
              btnText={"GET CREDIT REFUND LIST"}
              btnSize="md"
              btnColor="blue01Filled"
              isLink={false}
              handleClick={testGetCreditRefundList}
            />
          </div>
        </div>
      </div>
    );

  return null;
};

export default MyPage;
