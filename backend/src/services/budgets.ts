import Budget from "../schemas/Budget";
import { BudgetInput } from "../schemas/Budget";
import DonationModel from "../schemas/Donation";

const getBudgets = async (filter = {}) => {
  const budgets = await Budget.find(filter).lean();

  const donations = await DonationModel.aggregate([
    { $match: { budgetId: { $in: budgets.map((budget) => budget._id) } } },
    { $group: { _id: "$budgetId", totalDonations: { $sum: "$amount" } } },
  ]);

  const donationMap = new Map<string, number>(
    donations.map((donation) => [
      donation._id.toString(),
      donation.totalDonations,
    ])
  );

  return budgets.map((budget) => ({
    ...budget,
    id: budget._id,
    collectedAmount: donationMap.get(budget._id.toString()) || 0,
  }));
};

const getBudget = async (id: string) => {
  const budget = await Budget.findById(id).lean();

  if (!budget) {
    return null;
  }

  const donations = await DonationModel.aggregate([
    { $match: { budgetId: budget._id } },
    { $group: { _id: "$budgetId", totalDonations: { $sum: "$amount" } } },
  ]);

  const collectedAmount =
    donations.length > 0 ? donations[0].totalDonations : 0;

  return {
    ...budget,
    id: budget._id,
    collectedAmount,
  };
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
