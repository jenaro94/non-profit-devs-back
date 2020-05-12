const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Project {
    id: ID!
    name: String!
    description: String!
    contactEmail: String!
    createdAt: Date!
    updatedAt: Date!
    users: [User!]
  }

  input CreateProjectInput {
    name: String!
    description: String!
    contactEmail: String!
  }

  input UpdateProjectInput {
    name: String
    description: String
    contactEmail: String
  }

  input AddUserInput {
    user: ID!
  }

  extend type Query {
    projects: [Project!]
    project(id: ID!): Project
  }

  extend type Mutation {
    createProject(input: CreateProjectInput): Project
    updateProject(id: ID!, input: UpdateProjectInput): Project
    addUserToProject(id: ID!, input: AddUserInput): Project
  }
`;

module.exports = typeDefs;
