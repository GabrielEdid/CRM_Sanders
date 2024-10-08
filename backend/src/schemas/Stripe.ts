export interface StripeDonationInput {
  donator: {
    name: string; // Add name
    email: string;
    phone: string; // Add phone
  };
  amount: number;
  paymentMethod: "stripe" | "cash" | "transfer";
  message?: string;
}
