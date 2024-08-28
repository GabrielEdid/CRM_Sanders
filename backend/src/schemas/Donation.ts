import mongoose, { Schema, Document, model } from "mongoose";

export interface IDonation extends Document {
  user: mongoose.Schema.Types.ObjectId;
  amount: number;
  paymentMethod: "stripe" | "cash" | "transfer";
  message?: string;
  createdAt: Date;
}

const donationSchema: Schema<IDonation> = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: [true, "La cantidad es obligatoria"],
    validate: {
      validator: function (value: number) {
        return value > 0; // Valida que el valor sea mayor que 0
      },
      message: "La cantidad debe ser un número positivo",
    },
  },
  paymentMethod: {
    type: String,
    required: [true, "El método de pago es obligatorio"],
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
});

donationSchema.methods.toJSON = function () {
  const obj = this.toObject({ getters: true }); // Obtener una copia del documento como un objeto JS
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
};

const Donation = model<IDonation>("Donation", donationSchema);
export default Donation;
