import { gql } from "apollo-server-express";

// Bên typeDefs dùng để định nghĩa các key cho phép người dùng được phép lấy
// type Query chứa các câu lệnh để người ta có thẻ truy vấn ra được
export const typeDefs = gql`
  type Articles {
    id: ID,
    title: String,
    avatar: String,
    description: String
  }
  type Query {
    hello: String,
    getlistArticle: [Articles],

  }
`