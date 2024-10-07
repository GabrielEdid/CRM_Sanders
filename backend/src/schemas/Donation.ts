import mongoose, { Schema, Document, model } from "mongoose";
import { DonatorDocument } from "./Donator";

// In schemas/Donation.ts
export interface DonationInput {
  donator: {
    name: string; // Add name
    email: string;
    phone: string; // Add phone
  };
  amount: number;
  paymentMethod: "stripe" | "cash" | "transfer";
  message?: string;
}

export interface IDonation extends Document {
  donator: mongoose.Schema.Types.ObjectId;
  amount: number;
  paymentMethod: "stripe" | "cash" | "transfer";
  message?: string;
  createdAt: Date;
}

export interface DonationDocument extends DonationInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const donationSchema = new Schema({
  donator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donator",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["stripe", "cash", "transfer"],
  },
  message: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

donationSchema.methods.toJSON = function () {
  const obj = this.toObject({ getters: true }); // Obtener una copia del documento como un objeto JS
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
};

const DonationModel = mongoose.model<DonationDocument>(
  "Donation",
  donationSchema
);
export default DonationModel;
