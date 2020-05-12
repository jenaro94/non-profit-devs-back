const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum Skill {
    FRONT_END_DEVELOPER
    BACK_END_DEVELOPER
    FULL_STACK_DEVELOPER
    UX_UI_DESIGNER
    DATABASE_ENGINEER
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: Date!
    updatedAt: Date!
    projects: [Project!]
    skills: [Skill!]!
  }

  input SignupInput {
    email: String!
    name: String!
    password: String!
    skills: Skill!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input AddProjectInput {
    project: ID!
  }

  type Token {
    token: String!
  }

  extend type Query {
    users: [User]!
    user(id: ID!): User!
  }

  extend type Mutation {
    signup(input: SignupInput): User
    login(input: LoginInput): Token
    addProjectToUser(id: ID!, input: AddProjectInput): User
  }
`;

module.exports = typeDefs;
