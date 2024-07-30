import Article from "./model/articles.model"

// Bên resolvers chứa những hàm xử lý logic
export const resolvers = {
  Query: {
    hello: () => {
      return "hello World"
    },
    getlistArticle: async () => {
      const record = await Article.find({
        deleted: false
      });
      return record;
    }
  }
}