import { Router } from "express";

import {
  getDonatorHandler,
  getDonatorsHandler,
  createDonatorHandler,
  deleteDonatorHandler,
  updateDonatorHandler,
} from "../controllers/donators";

import validateResource from "../middleware/validateResource";

import {
  createDonatorSchema,
  updateDonatorSchema,
} from "../validation/donators";

const donatorsRouter = Router();

donatorsRouter.get("/", getDonatorsHandler);
donatorsRouter.get("/:id", getDonatorHandler);
donatorsRouter.post(
  "/",
  [validateResource(createDonatorSchema)],
  createDonatorHandler
);
donatorsRouter.put("/:id", updateDonatorHandler);
donatorsRouter.delete("/:id", deleteDonatorHandler);

export { donatorsRouter };
