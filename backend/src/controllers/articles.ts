import jwt from "jsonwebtoken";
import {
  getArticle,
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../services/articles";

import { Request, Response } from "express";
import { CreateArticleInput } from "../validation/articles";

const secretKey = process.env.SECRET_KEY || "";

const bcrypt = require("bcrypt");

const getArticlesHandler = async (req: Request, res: Response) => {
  try {
    const articles = await getArticles();
    res.set("X-Total-Count", articles.length.toString());
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los artículos" });
  }
};

const getArticleHandler = async (req: Request, res: Response) => {
  try {
    const article = await getArticle({ _id: req.params.id });
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ error: "Artículo no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el artículo por su Id" });
  }
};

const createArticleHandler = async (
  req: Request<{}, {}, CreateArticleInput["body"]>,
  res: Response
) => {
  try {
    const newArticle = await createArticle(req.body);
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el artículo" });
  }
};

const updateArticleHandler = async (req: Request, res: Response) => {
  try {
    const updatedArticle = await updateArticle(req.params.id, req.body);
    if (updatedArticle) {
      res.status(200).json(updatedArticle);
    } else {
      res.status(404).json({ error: "Artículo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el artículo" });
  }
};

const deleteArticleHandler = async (req: Request, res: Response) => {
  try {
    const deletedArticle = await deleteArticle(req.params.id);
    if (deletedArticle) {
      res.status(200).json({ id: deletedArticle._id });
    } else {
      res.status(404).json({ error: "Artículo no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el artículo" });
  }
};

export {
  getArticleHandler,
  getArticlesHandler,
  createArticleHandler,
  updateArticleHandler,
  deleteArticleHandler,
};
