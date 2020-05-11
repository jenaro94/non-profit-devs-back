const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const dotEnv = require("dotenv");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

const { connection } = require("./db/util");
const { verifyUser } = require("./helpers/context");

dotEnv.config();

connection();

const app = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    let contextObj = {};
    if (req) {
      await verifyUser(req);
      contextObj.email = req.email;
      contextObj.loggedInUserId = req.loggedInUserId;
    }
    return contextObj;
  },
  formatError: (error) => ({
    message: error.message,
    code: error.extensions.code,
  }),
});

server.applyMiddleware({ app, path: "/graphql" });
const PORT = process.env.PORT || 4000;
const httpServer = app.listen(PORT, () => {
  console.log(`🚀 Api running on port: ${PORT}`);
  console.log(`🚀 GraphQL endpoint: ${server.graphqlPath}`);
});

server.installSubscriptionHandlers(httpServer);
