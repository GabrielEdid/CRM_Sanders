import DonatorModel, {
  DonatorInput,
  DonatorDocument,
} from "../schemas/Donator";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import DonationModel from "../schemas/Donation";

const getDonators = async (
  name?: string,
  lastDonationGte?: string, // lastDonationDate >=
  lastDonationLte?: string // lastDonationDate <=
) => {
  // Start building the aggregation pipeline
  const aggregationPipeline: any[] = [
    {
      // This stage will handle filtering based on the donator's name
      $match: name ? { name: { $regex: name, $options: "i" } } : {},
    },
    {
      // Lookup stage to join donations for each donator
      $lookup: {
        from: "donations",
        localField: "_id",
        foreignField: "donator",
        as: "donations",
      },
    },
    {
      // Add calculated fields: total donations, total amount, and last donation date
      $addFields: {
        totalDonations: { $size: "$donations" },
        totalAmountDonated: { $sum: "$donations.amount" },
        lastDonationDate: { $max: "$donations.createdAt" }, // Find the latest donation date
        id: "$_id",
      },
    },
  ];

  // Add filtering for donation date range, if provided
  if (lastDonationGte || lastDonationLte) {
    const donationDateQuery: any = {};

    if (lastDonationGte) {
      donationDateQuery.$gte = new Date(lastDonationGte);
    }

    if (lastDonationLte) {
      donationDateQuery.$lte = new Date(lastDonationLte);
    }

    // Add a $match stage to filter based on last donation date
    aggregationPipeline.push({
      $match: {
        lastDonationDate: donationDateQuery,
      },
    });
  }

  // Final project stage to select the fields to return
  aggregationPipeline.push({
    $project: {
      _id: 0,
      id: 1,
      name: 1,
      email: 1,
      phone: 1,
      totalDonations: 1,
      totalAmountDonated: 1,
      lastDonationDate: 1,
      createdAt: 1,
      updatedAt: 1,
    },
  });

  // Execute the aggregation pipeline
  const donators = await DonatorModel.aggregate(aggregationPipeline);

  return donators;
};

const getDonator = async (
  queryOrId: string | FilterQuery<DonatorDocument>,
  options: QueryOptions = { lean: true }
) => {
  if (typeof queryOrId === "string") {
    const donator = await DonatorModel.findById(queryOrId, {}, options);
    const jsonDonator = {
      ...donator,
      id: donator?._id,
    };

    return jsonDonator;
  } else {
    const donator = await DonatorModel.findOne(queryOrId, {}, options);
    const jsonDonator = {
      ...donator,
      id: donator?._id,
    };

    return jsonDonator;
  }
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
