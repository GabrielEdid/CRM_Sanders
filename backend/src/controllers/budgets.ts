import {
  getBudget,
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../services/budgets";

import { Request, Response } from "express";
import { CreateBudgetInput, UpdateBudgetInput } from "../validation/budgets";

const getBudgetsHandler = async (req: Request, res: Response) => {
  try {
    const budgets = await getBudgets({});
    res.set("X-Total-Count", budgets.length.toString());
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los presupuestos" });
  }
};

const getBudgetHandler = async (req: Request, res: Response) => {
  try {
    const budget = await getBudget(req.params.id);
    if (budget) {
      res.status(200).json(budget);
    } else {
      res.status(404).json({ error: "Presupuesto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el presupuesto" });
  }
};

const createBudgetHandler = async (
  req: Request<{}, {}, CreateBudgetInput["body"]>,
  res: Response
) => {
  try {
    console.log(req.body);
    const body = req.body;
    const newBudget = await createBudget({
      ...body,
    });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el presupuesto" });
  }
};

const updateBudgetHandler = async (
  req: Request<UpdateBudgetInput["params"]>,
  res: Response
) => {
  try {
    const budgetId = req.params.id;
    const update = req.body;

    const budget = await getBudget(budgetId);

    if (!budget) {
      return res.status(404).json({ error: "Presupuesto no encontrado" });
    }

    const updatedBudget = await updateBudget(budgetId, update);

    return res.status(200).json(updatedBudget);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el presupuesto" });
  }
};

const deleteBudgetHandler = async (req: Request, res: Response) => {
  try {
    const deletedBudget = await deleteBudget(req.params.id);
    if (deletedBudget) {
      res.status(200).json({ id: deletedBudget._id });
    } else {
      res.status(404).json({ error: "Presupuesto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el presupuesto" });
  }
};

export {
  getBudgetHandler,
  getBudgetsHandler,
  createBudgetHandler,
  updateBudgetHandler,
  deleteBudgetHandler,
};
