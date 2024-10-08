import { Router } from "express";
import { createStripeSessionHandler } from "../controllers/stripeController";
import validateResource from "../middleware/validateResource";
import { createStripeDonationSchema } from "../validation/stripe";

const stripeRouter = Router();

stripeRouter.post(
  "/checkout",
  validateResource(createStripeDonationSchema),
  createStripeSessionHandler
);

export { stripeRouter };
