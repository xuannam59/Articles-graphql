"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsCategory = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsCategory = (0, apollo_server_express_1.gql) `
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
`;
