const { GraphQLDateTime } = require("graphql-iso-date");

const userResolver = require("./user");
const projectResolver = require("./project");

const customDateScalarResolver = {
  Date: GraphQLDateTime,
};

module.exports = [userResolver, projectResolver, customDateScalarResolver];
