import User from "../schemas/User";
import { IUser } from "../schemas/User";

const getUsers = async () => {
  return await User.find();
};

const getUser = async (id: string) => {
  return await User.findById(id);
};

const createUser = async (user: IUser) => {
  return await User.create(user);
};

const updateUser = async (id: string, user: IUser) => {
  return await User.findByIdAndUpdate(id, user, { new: true });
};

const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

export { getUsers, getUser, createUser, updateUser, deleteUser };
