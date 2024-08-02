"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsArticle = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsArticle = (0, apollo_server_express_1.gql) `
  type Article {
    id: ID, # returns a ID
    title: String, # returns a String
    avatar: String,
    description: String,
    category: Category
  }


  # type Query chứa các câu lệnh để người dùng truy vấn dữ liệu [GET]
  type Query {
    getlistArticle(
      sortKey: String,
      sortValue:String,
      currentPage: Int = 1,
      limitItem: Int = 2,
      filterKey: String,
      filterValue: String,
      keyword: String
    ): [Article], # returns a array Article
    getArticle(id: ID): Article # returns a Article
  }

  # Khởi tạo các giá trị người dùng có thể truyền vào 
  input ArticleInput {
    title: String,
    avatar: String,
    description: String,
    categoryId: String
  }

  # type Mutaiton chứa các câu lện để người dùng thêm, sửa, xoá ,... [POST, PATCH, DELETE, PUT]
  type Mutation {
    # Article
    createArticle(article: ArticleInput): Article # return a Article
    updateArticle(id: ID, article: ArticleInput):Article # return a Article
    deleteArticle(id: ID): String # return a String
  }
`;
