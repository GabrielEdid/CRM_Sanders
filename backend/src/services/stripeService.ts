import Stripe from "stripe";
import { DonationInput } from "../schemas/Donation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15" as Stripe.LatestApiVersion,
});

export const createCheckoutSession = async (donation: DonationInput) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "mxn",
          product_data: { name: "Donation" },
          unit_amount: donation.amount * 100, // Stripe handles amounts in cents
        },
        quantity: 1,
      },
    ],
    customer_email: donation.donator.email,
    success_url: `${process.env.FRONTEND_URL}/donation-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/donation-canceled?session_id={CHECKOUT_SESSION_ID}`,
  });

  return session;
};
