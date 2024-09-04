import DonatorModel, { DonatorInput } from "../schemas/Donator";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import DonationModel from "../schemas/Donation";

const getDonators = async () => {
  const donators = await DonatorModel.aggregate([
    {
      $lookup: {
        from: "donations", // The name of the collection you want to join with
        localField: "_id", // Field from the Donator collection
        foreignField: "donator", // Field from the Donation collection
        as: "donations", // The name of the field to be added with the joined data
      },
    },
    {
      $addFields: {
        totalDonations: { $size: "$donations" }, // Calculate the total number of donations
        totalAmountDonated: { $sum: "$donations.amount" }, // Sum all donation amounts
        id: "$_id",
      },
    },
    {
      $project: {
        // Project only the necessary fields
        _id: 0, // Exclude the original '_id' field
        id: 1,
        name: 1,
        email: 1,
        phone: 1,
        totalDonations: 1,
        totalAmountDonated: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  return donators;
};

const getDonator = async (id: string) => {
  return await DonatorModel.findById(id);
};

const createDonator = async (donator: DonatorInput) => {
  return await DonatorModel.create(donator);
};

const updateDonator = async (id: string, donator: DonatorInput) => {
  return await DonatorModel.findByIdAndUpdate(id, donator, { new: true });
};

const deleteDonator = async (id: string) => {
  return await DonatorModel.findByIdAndDelete(id);
};

export { getDonators, getDonator, createDonator, updateDonator, deleteDonator };
