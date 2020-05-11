const { GraphQLDateTime } = require("graphql-iso-date");

const userResolver = require("./user");

const customDateScalarResolver = {
  Date: GraphQLDateTime,
};

module.exports = [userResolver, customDateScalarResolver];
