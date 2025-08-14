type OrderIdField = {
  orderId: string;
};

type UserIdField = {
  user_id: string;
};

type AmountField = {
  amount: string;
};

type CreditField = {
  credit: number;
};

type CurrencyField = {
  currency: string;
};

type PaymentKeyField = {
  paymentKey: string;
};

type CancelReasonField = {
  cancelReason: string;
};

type CancelAmountField = {
  cancelAmount: string;
};

export type OrderField = OrderIdField & AmountField & CreditField;

export type TempOrderType = OrderField & UserIdField & CurrencyField;

export type ConfirmOrderType = OrderField & PaymentKeyField;

export type PaymentsCancelType = CancelReasonField &
  CancelAmountField &
  PaymentKeyField;
