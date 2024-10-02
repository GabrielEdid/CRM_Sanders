import { Router } from "express";
import { createStripeSessionHandler } from "../controllers/stripeController";
import validateResource from "../middleware/validateResource";
import { createDonationSchema } from "../validation/donations";

const stripeRouter = Router();

stripeRouter.post(
  "/checkout",
  validateResource(createDonationSchema),
  createStripeSessionHandler
);

export { stripeRouter };
