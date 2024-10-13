import mongoose, { Schema, Document, model } from "mongoose";

export interface BudgetInput {
  title: string;
  totalAmount: number;
  description: string;
  startDate: Date;
  endDate: Date;
}

export interface BudgetDocument extends BudgetInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const budgetSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  totalAmount: {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

budgetSchema.methods.toJSON = function () {
  const obj = this.toObject({ getters: true }); // Obtener una copia del documento como un objeto JS
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
};

const Budget = mongoose.model<BudgetDocument>("Budget", budgetSchema);
export default Budget;
