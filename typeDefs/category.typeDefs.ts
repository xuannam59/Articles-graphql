import { gql } from "apollo-server-express";

// Bên typeDefs dùng để định nghĩa các key cho phép người dùng được phép lấy
export const typeDefsCategory = gql`
  type Category {
    id: ID,
    title: String,
    avatar: String
  }

  # type Query chứa các câu lệnh để người dùng truy vấn dữ liệu [GET]
  type Query {
    # Category
    getListCategory: [Category]
    getCategory(id: ID): Category
  }

  # Khởi tạo các giá trị người dùng có thể truyền vào 
  input CategoryInput {
    title: String,
    avatar: String
  }

  # type Mutaiton chứa các câu lện để người dùng thêm, sửa, xoá ,... [POST, PATCH, DELETE, PUT]
  type Mutation {
    createCategory(category: CategoryInput): Category
    updateCategory(id: ID, category: CategoryInput): Category
    deleteCategory(id: ID): String
  }
`