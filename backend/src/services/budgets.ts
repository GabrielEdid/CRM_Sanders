import Budget from "../schemas/Budget";
import { BudgetInput } from "../schemas/Budget";

const getBudgets = async (filter = {}) => {
  return await Budget.find(filter);
};

const getBudget = async (id: string) => {
  return await Budget.findById(id);
};

const createBudget = async (budget: BudgetInput) => {
  return await Budget.create(budget);
};

const updateBudget = async (id: string, budget: BudgetInput) => {
  return await Budget.findByIdAndUpdate(id, budget, { new: true });
};

const deleteBudget = async (id: string) => {
  return await Budget.findByIdAndDelete(id);
};

export { getBudgets, getBudget, createBudget, updateBudget, deleteBudget };
