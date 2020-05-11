const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    email: String!
    avatar: String
  }

  extend type Query {
    me: User!
  }
`;

module.exports = typeDefs;
