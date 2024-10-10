import ArticleModel, {
  ArticleInput,
  ArticleDocument,
} from "../schemas/Article";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

const getArticles = async () => {
  return await ArticleModel.find();
};

const getArticle = async (
  query: FilterQuery<ArticleDocument>,
  options: QueryOptions = { lean: true }
) => {
  return await ArticleModel.findOne(query, {}, options);
};

const get2RandomArticles = async () => {
  return await ArticleModel.aggregate([
    { $sample: { size: 2 } }, // Selecciona 2 documentos aleatorios
  ]);
};

const createArticle = async (article: ArticleInput) => {
  return await ArticleModel.create(article);
};

const updateArticle = async (id: string, article: ArticleInput) => {
  return await ArticleModel.findByIdAndUpdate(id, article, { new: true });
};

const deleteArticle = async (id: string) => {
  return await ArticleModel.findByIdAndDelete(id);
};

export {
  getArticles,
  getArticle,
  get2RandomArticles,
  createArticle,
  updateArticle,
  deleteArticle,
};
