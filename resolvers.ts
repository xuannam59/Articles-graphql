import Article from "./model/articles.model"
import Category from "./model/category.model";

// Bên resolvers chứa những hàm xử lý logic (same same folder controller)
export const resolvers = {
  // Xứ lý logic các hàm [GET]
  Query: {
    // Articel
    getlistArticle: async () => {
      const articles = await Article.find({
        deleted: false
      });
      return articles;
    },
    getArticle: async (_, agrs) => {
      const { id } = agrs; // agrs : các đối số được font-end gửi lên
      const article = await Article.findOne({
        _id: id,
        deleted: false
      });
      return article;
    },

    // Category
    getListCategory: async () => {
      const categories = await Category.find({
        deleted: false
      });
      return categories;
    },
    getCategory: async (_, agrs) => {
      const { id } = agrs;
      const category = await Category.findOne({
        _id: id,
        deleted: false
      });

      return category;
    }
  },

  // Xử lý logic các hàm [POST, PATCH, DELETE, PUT]
  Mutation: {
    // Articel
    createArticle: async (_, agrs) => {
      const { article } = agrs;

      const record = new Article(article);
      await record.save();

      return record;
    },
    updateArticle: async (_, agrs) => {
      const { id, article } = agrs;

      await Article.updateOne({
        _id: id,
      }, article);
      const record = await Article.findOne({
        _id: id
      });
      return record;
    },
    deleteArticle: async (_, agrs) => {
      const { id } = agrs;

      await Article.updateOne({
        _id: id
      }, {
        deleted: true,
        deletedAt: new Date()
      });

      return "Đã xoá";
    },

    // Category
    createCategory: async (_, agrs) => {
      const { category } = agrs;
      const record = new Category(category);
      await record.save();

      return record;
    },
    updateCategory: async (_, agrs) => {
      const { id, category } = agrs;

      await Category.updateOne({
        _id: id
      }, category);

      const record = await Category.findOne({
        _id: id
      });

      return record;
    },
    deleteCategory: async (_, agrs) => {
      const { id } = agrs;
      await Category.updateOne({
        _id: id
      }, {
        deleted: true,
        deleteAt: new Date
      });

      return "Đã Xoá";
    }
  }
}