import { Router } from "express";

import {
  getDonationHandler,
  getDonationsHandler,
  createDonationHandler,
  updateDonationHandler,
  deleteDonationHandler,
} from "../controllers/donations";

const donationsRouter = Router();

donationsRouter.get("/", getDonationsHandler);
donationsRouter.get("/:id", getDonationHandler);
donationsRouter.post("/", createDonationHandler);
donationsRouter.put("/:id", updateDonationHandler);
donationsRouter.delete("/:id", deleteDonationHandler);

export { donationsRouter };
