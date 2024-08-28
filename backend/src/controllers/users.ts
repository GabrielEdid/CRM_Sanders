import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/users";

import { Request, Response } from "express";

const getUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.set("X-Total-Count", users.length.toString());
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

const getUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await getUser(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

const createUserHandler = async (req: Request, res: Response) => {
  try {
    const newUser = await createUser(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la donación" });
  }
};

const updateUserHandler = async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "Usuario no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const deletedUser = await deleteUser(req.params.id);
    if (deletedUser) {
      res.status(200).json({ id: deletedUser._id });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};

export {
  getUserHandler,
  getUsersHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
