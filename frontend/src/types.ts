export type Donation = {
  id: string;
  amount: Number;
  paymentMethod: "stripe" | "cash" | "transfer";
  message?: string;
  createdAt: Date;
};
