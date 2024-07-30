import Article from "./model/articles.model"

// Bên resolvers chứa những hàm xử lý logic (same same folder controller)
export const resolvers = {
  // Xứ lý logic các hàm [GET]
  Query: {
    hello: () => {
      return "hello World"
    },
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
    }
  }
}