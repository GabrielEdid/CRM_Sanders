import { Router } from "express";
import { handleStripeWebhook } from "../controllers/webhookController";
import bodyParser from "body-parser"; // Required for raw body parsing

const webhookRouter = Router();

// Stripe requires raw body for webhook validation
webhookRouter.post(
  "/", // Note: this is mounted at "/webhook" in index.ts
  bodyParser.raw({ type: "application/json" }), // Ensure raw body parsing
  handleStripeWebhook
);

export { webhookRouter };
