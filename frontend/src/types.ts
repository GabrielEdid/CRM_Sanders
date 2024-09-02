export type Donation = {
  id: string;
  amount: Number;
  paymentMethod: "stripe" | "cash" | "transfer";
  message?: string;
  createdAt: Date;
};

export type Donator = {
  id: string;
  name: string;
  email: string;
  totalDonations: number;
  totalAmountDonated: number;
};
