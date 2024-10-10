import mongoose, { Schema, Document, model } from "mongoose";

// In schemas/Article.ts
export interface ArticleInput {
  title: string;
  body: string;
  readMoreUrl: string;
}

export interface IArticle extends Document {
  title: string;
  body: string;
  readMoreUrl: string;
}

export interface ArticleDocument extends ArticleInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  readMoreUrl: {
    type: String,
    required: true,
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

articleSchema.methods.toJSON = function () {
  const obj = this.toObject({ getters: true }); // Obtener una copia del documento como un objeto JS
  obj.id = obj._id.toString();
  delete obj._id;
  delete obj.__v;
  return obj;
};

const ArticleModel = mongoose.model<ArticleDocument>("Article", articleSchema);
export default ArticleModel;
