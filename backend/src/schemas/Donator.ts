import mongoose, { Schema } from "mongoose";

export interface DonatorInput {
  name: string;
  email: string;
  phone: string;
  isSendEmails: boolean;
}

export interface DonatorDocument extends DonatorInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const donatorSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "El correo electrónico es inválido"],
  },
  phone: {
    type: String,
    required: [true, "El teléfono es obligatorio"],
  },
  isSendEmails: {
    type: Boolean,
    default: false,
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

donatorSchema.methods.toJSON = function () {
  const obj = this.toObject({ getters: true }); // Obtener una copia del documento como un objeto JS
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
};

const DonatorModel = mongoose.model<DonatorDocument>("Donator", donatorSchema);

export default DonatorModel;
