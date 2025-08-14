"use client";

import { postConfirmOrder } from "@/api/paymentsAPI";
import Button from "@/components/elements/Button";
import { useSearchParams } from "next/navigation";

const PaymentsSuccess = () => {
  const searchParams = useSearchParams();

  console.log("paymentType", searchParams.get("paymentType"));
  console.log("orderId", searchParams.get("orderId"));
  console.log("paymentKey", searchParams.get("paymentKey"));
  console.log("amount", searchParams.get("amount"));

  const CREDIT = 1000;

  const testConfirmOrder = async () => {
    try {
      const res = await postConfirmOrder({
        orderId: searchParams.get("orderId") as string,
        amount: searchParams.get("amount") as string,
        credit: CREDIT,
        paymentKey: searchParams.get("paymentKey") as string,
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex w-full flex-col gap-8 p-20">
      <h2>PAYMENTS SUCCESS</h2>
      <div className="w-[400px]">
        <Button
          btnText={"CREATE ORDER"}
          btnSize="lg"
          btnColor="blue01Filled"
          isLink={false}
          handleClick={testConfirmOrder}
        />
      </div>
    </div>
  );
};

export default PaymentsSuccess;
