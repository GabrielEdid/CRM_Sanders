import { Request, Response } from "express";
import DonationModel from "../schemas/Donation";
import DonatorModel from "../schemas/Donator";
import Stripe from "stripe";
import { createDonation } from "./donations";

// Handle Stripe Webhook events
export const handleStripeWebhook = async (req: Request, res: Response) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15" as Stripe.LatestApiVersion,
  });

  const sig = req.headers["stripe-signature"]!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err);
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Extract donator info from session
    const donatorEmail = session.customer_email;
    const donatorName = session.metadata?.name || "Anónimo";
    const donatorPhone = session.metadata?.phone || "0000000000";
    const donatorIsSendEmails = session.metadata?.isSendEmails == "true";

    console.log(
      "session.metadata?.isSendEmails: ",
      session.metadata?.isSendEmails
    );

    console.log("session.metadata ", session.metadata);

    if (!donatorEmail) {
      console.error("Email is missing in session data.");
      return res.status(400).send("Email is required for donations.");
    }

    try {
      // Update donator if exists, otherwise create a new one
      const donator = await DonatorModel.findOneAndUpdate(
        { email: donatorEmail },
        {
          name: donatorName,
          phone: donatorPhone,
          isSendEmails: donatorIsSendEmails,
        },
        { new: true, upsert: true } // Create new donator if not found
      );

      // Create a new donation entry
      const newDonation = await createDonation({
        donator: donator.id,
        amount: session.amount_total ? session.amount_total / 100 : 0,
        paymentMethod: "stripe",
        message: "Donación completada a través de Stripe.",
      });

      console.log("Donation saved:", newDonation);
      res.status(200).send("Donation recorded successfully.");
    } catch (error) {
      console.error("Error saving donator or donation:", error);
      return res.status(500).json({ message: "Error saving donation." });
    }
  } else {
    console.warn(`Unhandled event type ${event.type}`);
    res.status(200).send(`Unhandled event type ${event.type}`);
  }
};
