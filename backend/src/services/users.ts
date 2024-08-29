import UserModel, { UserInput, UserDocument } from "../schemas/User";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

const getUsers = async () => {
  return await UserModel.find();
};

const getUser = async (
  query: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }
) => {
  return await UserModel.findOne(query, {}, options);
};

const createUser = async (user: UserInput) => {
  return await UserModel.create(user);
};

const updateUser = async (id: string, user: UserInput) => {
  return await UserModel.findByIdAndUpdate(id, user, { new: true });
};

const deleteUser = async (id: string) => {
  return await UserModel.findByIdAndDelete(id);
};

export { getUsers, getUser, createUser, updateUser, deleteUser };
