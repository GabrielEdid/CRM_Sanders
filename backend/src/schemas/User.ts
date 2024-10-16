import mongoose, { Schema, Document, model } from "mongoose";
const bcrypt = require("bcrypt");

export interface UserInput {
  username: string;
  email: string;
  password: string;
  role: "usuario" | "admin";
}

export interface UserDocument extends UserInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "El correo electrónico es inválido"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
  },
  role: {
    type: String,
    enum: ["usuario", "admin"],
    default: "usuario",
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

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
      return next(new Error("An unknown error occurred"));
    }
  }

  this.updatedAt = new Date();

  next();
});

// Método para ocultar la contraseña cuando se convierte el documento a JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject({ getters: true }); // Obtener una copia del documento como un objeto JS
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.password;
  delete obj.__v;
  return obj;
};

const UserModel = model<UserDocument>("User", userSchema);

export default UserModel;
