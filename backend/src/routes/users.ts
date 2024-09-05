import { Router } from "express";

import {
  getUserHandler,
  getUsersHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
  loginHandler,
  emailSender,
} from "../controllers/users";

import validateResource from "../middleware/validateResource";

import { createUserSchema } from "../validation/users";

const usersRouter = Router();

usersRouter.get("/email", emailSender);
usersRouter.get("/", getUsersHandler);
usersRouter.get("/:id", getUserHandler);
usersRouter.post("/", validateResource(createUserSchema), createUserHandler);
usersRouter.post("/login", loginHandler);
usersRouter.put("/:id", updateUserHandler);
usersRouter.delete("/:id", deleteUserHandler);

export { usersRouter };
