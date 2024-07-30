import { gql } from "apollo-server-express";

// Bên typeDefs dùng để định nghĩa các key cho phép người dùng được phép lấy
export const typeDefs = gql`
  type Article {
    id: ID, # returns a ID
    title: String, # returns a String
    avatar: String,
    description: String
  }

  # type Query chứa các câu lệnh để người dùng truy vấn dữ liệu [GET]
  type Query {
    hello: String,
    getlistArticle: [Article], # returns a array Article
    getArticle(id: ID): Article # returns a Article
  }
  # Khởi tạo các giá trị người dùng có thể truyền vào 
  input ArticleInput {
    title: String, # returns a String
    avatar: String,
    description: String
  }
  # type Mutaiton chứa các câu lện để người dùng thêm, sửa, xoá ,... [POST, PATCH, DELETE, PUT]
  type Mutation {
    createArticle(article: ArticleInput): Article # return a Article
  }
`