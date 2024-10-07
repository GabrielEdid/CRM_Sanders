import { Request, Response } from "express";
import DonationModel from "../schemas/Donation";
import DonatorModel from "../schemas/Donator";
import Stripe from "stripe";

// Handle Stripe Webhook events
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

  // Handle the event types
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Extract donator info from session (e.g., session.customer_email)
    const donatorEmail = session.customer_email;
    const donatorName = session.metadata?.name; // Extract name from metadata
    const donatorPhone = session.metadata?.phone; // Extract phone from metadata

    if (!donatorEmail) {
      console.error("Email is missing in session data.");
      return res.status(400).send("Email is required for donations.");
    }

    // Try to find the donator by email, otherwise create a new donator
    let donator = await DonatorModel.findOne({ email: donatorEmail });

    if (!donator) {
      // Create a new donator with name and phone from metadata
      donator = new DonatorModel({
        name: donatorName || "Anónimo", // Use metadata name
        email: donatorEmail || "anonimo@mail.com",
        phone: donatorPhone || "0000000000", // Use metadata phone
      });

      try {
        await donator.save();
      } catch (error) {
        console.error("Error saving donator:", error);
        return res.status(500).json({ message: "Failed to create donator." });
      }
    }

    // Create a new donation entry
    try {
      const newDonation = new DonationModel({
        donator: donator._id,
        amount: session.amount_total ? session.amount_total / 100 : 0,
        paymentMethod: "stripe",
        message: "Donación completada a través de Stripe.",
      });

      await newDonation.save();
      console.log("Donation saved:", newDonation);
      res.status(200).send("Donation recorded successfully.");
    } catch (error) {
      console.error("Error saving donation:", error);
      return res.status(500).json({ message: "Error saving donation." });
    }
  } else {
    console.warn(`Unhandled event type ${event.type}`);
    res.status(200).send(`Unhandled event type ${event.type}`);
  }
};
