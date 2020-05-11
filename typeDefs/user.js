const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: Date!
    updatedAt: Date!
    projects: [Project!]
  }

  input SignupInput {
    email: String!
    name: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Token {
    token: String!
  }

  extend type Query {
    users: [User]!
    user: User!
  }

  extend type Mutation {
    signup(input: SignupInput): User
    login(input: LoginInput): Token
  }
`;

module.exports = typeDefs;
