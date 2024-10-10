import Donation from "../schemas/Donation";
import DonationModel, {
  DonationInput,
  DonationDocument,
} from "../schemas/Donation";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

const getDonations = async (filter = {}) => {
  return await Donation.find(filter);
};

const getDonation = async (id: string) => {
  return await Donation.findById(id);
};

const getLastYearDonationSummary = async () => {
  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);

  const donations = await Donation.aggregate([
    {
      $match: {
        createdAt: { $gte: lastYear },
      },
    },
    {
      $group: {
        _id: null,
        totalDonations: { $sum: "$amount" },
        totalTransactions: { $sum: 1 },
        uniqueDonators: { $addToSet: "$donator" },
      },
    },
    {
      $project: {
        totalDonations: 1,
        totalTransactions: 1,
        donatorsCount: { $size: "$uniqueDonators" },
      },
    },
  ]);

  return (
    donations[0] || {
      totalDonations: 0,
      totalTransactions: 0,
      donatorsCount: 0,
    }
  );
};

const createDonation = async (donation: DonationInput) => {
  return await Donation.create(donation);
};

const updateDonation = async (id: string, donation: DonationInput) => {
  return await Donation.findByIdAndUpdate(id, donation, { new: true });
};

const deleteDonation = async (id: string) => {
  return await Donation.findByIdAndDelete(id);
};

export {
  getDonations,
  getDonation,
  getLastYearDonationSummary,
  createDonation,
  updateDonation,
  deleteDonation,
};
