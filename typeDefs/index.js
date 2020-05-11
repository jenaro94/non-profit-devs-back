const { gql } = require("apollo-server-express");

const userTypeDefs = require("./user");
const projectTypeDefs = require("./project");

const typeDefs = gql`
  scalar Date

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type Subscription {
    _: String
  }
`;

module.exports = [typeDefs, userTypeDefs, projectTypeDefs];
