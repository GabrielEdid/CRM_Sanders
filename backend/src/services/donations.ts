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
  createDonation,
  updateDonation,
  deleteDonation,
};
