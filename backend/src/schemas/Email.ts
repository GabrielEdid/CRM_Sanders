import mongoose, { Document, Schema } from "mongoose";

interface IEmailRecord extends Document {
  emailSchema: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const emailRecordSchema: Schema<IEmailRecord> = new mongoose.Schema({
  emailSchema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Email",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

emailRecordSchema.methods.toJSON = function () {
  const obj = this.toObject({ getters: true }); // Obtener una copia del documento como un objeto JS
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
};

const EmailRecord = mongoose.model<IEmailRecord>(
  "EmailRecord",
  emailRecordSchema
);
export default EmailRecord;
