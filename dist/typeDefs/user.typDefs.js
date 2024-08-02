"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsUse = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsUse = (0, apollo_server_express_1.gql) `
  type User {
    id: ID,
    fullName: String,
    email: String,
    phone: String,
    token: String,
    avatar: String,
    code: Int,
    message: String
  }

  type Query {
    getInfoUser(id: ID): User,
  }

  input RegisterUserInput {
    fullName: String,
    email: String,
    phone: String,
    password: String
  }

  input LoginUser{
    email: String,
    password: String
  }

  type Mutation {
    registerUser(user: RegisterUserInput): User,
    loginUser(user: LoginUser ): User
  }
`;
