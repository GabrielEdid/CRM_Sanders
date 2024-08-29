import mongoose, { Schema, Document, model } from "mongoose";

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

/* export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "usuario" | "admin";
  createdAt: Date;
  updatedAt: Date;
  toJSON: () => Omit<IUser, "password">; // Método para ocultar la contraseña al convertir a JSON
} */

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "El correo electrónico es obligatorio"],
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

userSchema.pre("save", function (next) {
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
