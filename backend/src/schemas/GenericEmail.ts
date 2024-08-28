import mongoose, { Schema, Document, model } from "mongoose";

interface IGenericEmail extends Document {
  subject: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

const genericEmailSchema: Schema<IGenericEmail> = new Schema({
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
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

genericEmailSchema.methods.toJSON = function () {
  const obj = this.toObject({ getters: true }); // Obtener una copia del documento como un objeto JS
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
};

genericEmailSchema.pre<IGenericEmail>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const GenericEmail = model<IGenericEmail>("GenericEmail", genericEmailSchema);
export default GenericEmail;
