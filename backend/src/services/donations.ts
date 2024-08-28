import Donation from "../schemas/Donation";
import { IDonation } from "../schemas/Donation";

const getDonations = async () => {
  return await Donation.find();
};

const getDonation = async (id: string) => {
  return await Donation.findById(id);
};

const createDonation = async (donation: IDonation) => {
  return await Donation.create(donation);
};

const updateDonation = async (id: string, donation: IDonation) => {
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
