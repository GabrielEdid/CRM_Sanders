import { Router } from "express";

import {
  getUserHandler,
  getUsersHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from "../controllers/users";

const usersRouter = Router();

usersRouter.get("/", getUsersHandler);
usersRouter.get("/:id", getUserHandler);
usersRouter.post("/", createUserHandler);
usersRouter.put("/:id", updateUserHandler);
usersRouter.delete("/:id", deleteUserHandler);

export { usersRouter };
