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

  extend type Query {
    allProjects: [Project!]!
  }
`;

module.exports = typeDefs;
