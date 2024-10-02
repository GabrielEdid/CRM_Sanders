import { Router } from "express";

import {
  getBudgetsHandler,
  getBudgetHandler,
  createBudgetHandler,
  updateBudgetHandler,
  deleteBudgetHandler,
} from "../controllers/budgets";
import validateResource from "../middleware/validateResource";

import { updateBudgetSchema, createBudgetSchema } from "../validation/budgets";

const budgetsRouter = Router();

budgetsRouter.get("/", getBudgetsHandler);
budgetsRouter.get("/:id", getBudgetHandler);
budgetsRouter.post(
  "/",
  [validateResource(createBudgetSchema)],
  createBudgetHandler
);
budgetsRouter.put("/:id", updateBudgetHandler);
budgetsRouter.delete("/:id", deleteBudgetHandler);

export { budgetsRouter as budgetsRouter };
