import mongoose, { Schema, Document, model } from "mongoose";

interface IBudget extends Document {
  title: string;
  totalAmountInCentsMXN: number;
  collectedAmountInCentsMXN: number;
  description: string;
  startDate: Date;
  endDate: Date;
  creationDate: Date;
}

const budgetSchema: Schema<IBudget> = new Schema({
  title: {
    type: String,
    required: true,
  },
  totalAmountInCentsMXN: {
    type: Number,
    required: true,
  },
  collectedAmountInCentsMXN: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
  },
});

budgetSchema.methods.toJSON = function () {
  const obj = this.toObject({ getters: true }); // Obtener una copia del documento como un objeto JS
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
};

const Budget = model<IBudget>("Budget", budgetSchema);
export default Budget;
