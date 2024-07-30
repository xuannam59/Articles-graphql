import { gql } from "apollo-server-express";

// Bên typeDefs dùng để định nghĩa các key cho phép người dùng được phép lấy
export const typeDefs = gql`
  type Article {
    id: ID, # returns a ID
    title: String, # returns a String
    avatar: String,
    description: String,
    category: Category
  }

  type Category {
    id: ID,
    title: String,
    avatar: String
  }

  # type Query chứa các câu lệnh để người dùng truy vấn dữ liệu [GET]
  type Query {
    # Article
    getlistArticle: [Article], # returns a array Article
    getArticle(id: ID): Article # returns a Article

    # Category
    getListCategory: [Category]
    getCategory(id: ID): Category
  }

  # Khởi tạo các giá trị người dùng có thể truyền vào 
  input ArticleInput {
    title: String,
    avatar: String,
    description: String,
    categoryId: String
  }

  input CategoryInput {
    title: String,
    avatar: String
  }

  # type Mutaiton chứa các câu lện để người dùng thêm, sửa, xoá ,... [POST, PATCH, DELETE, PUT]
  type Mutation {
    # Article
    createArticle(article: ArticleInput): Article # return a Article
    updateArticle(id: ID, article: ArticleInput):Article # return a Article
    deleteArticle(id: ID): String # return a String

    # Category
    createCategory(category: CategoryInput): Category
    updateCategory(id: ID, category: CategoryInput): Category
    deleteCategory(id: ID): String
  }
`