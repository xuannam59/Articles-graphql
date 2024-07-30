import Article from "../model/articles.model"
import Category from "../model/category.model";

// Bên resolvers chứa những hàm xử lý logic (same same folder controller)
export const resolversCategory = {
  // Xứ lý logic các hàm [GET]
  Query: {
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