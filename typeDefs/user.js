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

  extend type Query {
    me: User!
  }
`;

module.exports = typeDefs;
