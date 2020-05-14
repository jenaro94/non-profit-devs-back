const { gql } = require("apollo-server-express");

const typeDefs = gql`
  enum ProjectStatus {
    PENDING_REVIEW
    APPROVED
    IN_PROGRESS
    FINISHED
  }

  type Project {
    id: ID!
    name: String!
    description: String!
    contactEmail: String!
    createdAt: Date!
    updatedAt: Date!
    users: [User!]
    status: ProjectStatus!
    slug: String!
    repository: String!
  }

  input CreateProjectInput {
    name: String!
    description: String!
    contactEmail: String!
    status: ProjectStatus!
  }

  input UpdateProjectInput {
    name: String
    description: String
    contactEmail: String
    repository: String
    status: ProjectStatus
  }

  input AddUserInput {
    user: ID!
  }

  extend type Query {
    projects(status: ProjectStatus): [Project!]
    project(id: ID!): Project
  }

  extend type Mutation {
    createProject(input: CreateProjectInput): Project
    updateProject(id: ID!, input: UpdateProjectInput): Project
    addUserToProject(id: ID!, input: AddUserInput): Project
    removeUserFromProject(id: ID!, input: AddUserInput): Project
  }
`;

module.exports = typeDefs;
