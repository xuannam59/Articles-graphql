import { gql } from "apollo-server-express";

export const typeDefsUse = gql`
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
`