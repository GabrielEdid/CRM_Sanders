import { Request, Response } from "express";
import { createCheckoutSession } from "../services/stripeService";
import { CreateStripeDonationInput } from "../validation/stripe";

export const createStripeSessionHandler = async (
  req: Request<{}, {}, CreateStripeDonationInput["body"]>,
  res: Response
) => {
  try {
    const session = await createCheckoutSession(req.body);
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating Stripe session", error);
    res.status(500).json({ message: "Failed to create Stripe session" });
  }
};
