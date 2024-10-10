import { Router } from "express";

import validateResource from "../middleware/validateResource";
import {
  createArticleHandler,
  deleteArticleHandler,
  getArticleHandler,
  getArticlesHandler,
  updateArticleHandler,
} from "../controllers/articles";
import { createArticleSchema } from "../validation/articles";

const articlesRouter = Router();

articlesRouter.get("/", getArticlesHandler);
articlesRouter.get("/:id", getArticleHandler);
articlesRouter.post(
  "/",
  validateResource(createArticleSchema),
  createArticleHandler
);
articlesRouter.put("/:id", updateArticleHandler);
articlesRouter.delete("/:id", deleteArticleHandler);

export { articlesRouter };
