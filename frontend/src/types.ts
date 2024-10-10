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
  phone: string;
  isSendEmails: boolean;
  totalDonations: number;
  totalAmountDonated: number;
  lastDonationDate: Date;
};

export type Budget = {
  id: string;
  title: string;
  totalAmountInCentsMXN: number;
  collectedAmountInCentsMXN: number;
  description: string;
  startDate: Date;
  endDate: Date;
};
