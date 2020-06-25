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
    skills: [Skill]!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input AddProjectInput {
    project: ID!
  }

  input UpdateUserInput {
    name: String
    email: String
    skills: [String]
  }

  input ChangePasswordInput {
    oldPassword: String!
    newPassword: String!
  }

  type Token {
    token: String!
  }

  type LoginResult {
    token: Token!
    user: User!
  }

  extend type Query {
    users: [User]!
    user(id: ID!): User!
  }

  extend type Mutation {
    signup(input: SignupInput!): User!
    login(input: LoginInput!): LoginResult!
    addProjectToUser(id: ID!, input: AddProjectInput!): User!
    removeProjectFromUser(id: ID!, input: AddProjectInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User!
    changePassword(id: ID!, input: ChangePasswordInput!): User!
    deleteUser(id: ID!): User
  }
`;

module.exports = typeDefs;
