import { Router } from "express";

import {
  getDonationHandler,
  getDonationsHandler,
  createDonationHandler,
  updateDonationHandler,
  deleteDonationHandler,
  getTopDonatorsHandler,
  getDonationTrendHandler,
  getRecurringVsUniqueDonationsHandler,
  getPaymentMethodDistributionHandler,
} from "../controllers/donations";

import validateResource from "../middleware/validateResource";

import {
  updateDonationSchema,
  createDonationSchema,
} from "../validation/donations";

const donationsRouter = Router();

donationsRouter.get("/trend", getDonationTrendHandler);
donationsRouter.get("/top-donators", getTopDonatorsHandler);
donationsRouter.get(
  "/recurring-vs-unique",
  getRecurringVsUniqueDonationsHandler
);
donationsRouter.get("/payment-methods", getPaymentMethodDistributionHandler);
donationsRouter.get("/", getDonationsHandler);
donationsRouter.get("/:id", getDonationHandler);
donationsRouter.post(
  "/",
  [validateResource(createDonationSchema)],
  createDonationHandler
);
donationsRouter.put("/:id", updateDonationHandler);
donationsRouter.delete("/:id", deleteDonationHandler);

export { donationsRouter };
