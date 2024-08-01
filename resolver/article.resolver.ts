import Article from "../model/articles.model"
import Category from "../model/category.model";

// Bên resolvers chứa những hàm xử lý logic (same same folder controller)
export const resolversArticle = {
  // Xứ lý logic các hàm [GET]
  Query: {
    getlistArticle: async (_, agrs) => {
      const {
        sortKey,
        sortValue,
        currentPage,
        limitItem,
        filterKey,
        filterValue,
        keyword
      } = agrs

      let find = {
        deleted: false
      }

      // Sort
      const sort = {};
      if (sortKey && sortValue) {
        sort[sortKey] = sortValue;
      }

      // Pagination
      const skip: number = (currentPage - 1) * limitItem;

      // Filter 
      if (filterKey && filterValue) {
        find[filterKey] = filterValue;
      }

      // Search
      if (keyword) {
        const regexKey = new RegExp(keyword, "i");
        find["title"] = regexKey;
      }

      const articles = await Article.find(find)
        .sort(sort)
        .skip(skip)
        .limit(limitItem);

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
  },
  // Xứ lý logic các biến trong type Article
  Article: {
    category: async (article) => {
      const categoryId = article.categoryId;

      const category = await Category.findOne({
        _id: categoryId,
        deleted: false
      });

      return category;
    }
  },
  // Xử lý logic các hàm [POST, PATCH, DELETE, PUT]
  Mutation: {
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
  }
}