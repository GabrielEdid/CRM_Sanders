import { Router } from "express";

import {
  getUserHandler,
  getUsersHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from "../controllers/users";

import validateResource from "../middleware/validateResource";

import { createUserSchema } from "../validation/users";

const usersRouter = Router();

usersRouter.get("/", getUsersHandler);
usersRouter.get("/:id", getUserHandler);
usersRouter.post("/", validateResource(createUserSchema), createUserHandler);
usersRouter.put("/:id", updateUserHandler);
usersRouter.delete("/:id", deleteUserHandler);

export { usersRouter };
