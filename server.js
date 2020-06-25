const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const dotEnv = require("dotenv");
const os = require('os');

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const { connection } = require("./db/util");
const { verifyUser } = require("./helpers/context");

const ifaces = os.networkInterfaces();
dotEnv.config();

connection();
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4000",
  "http://localhost:4000/graphql",
  "http://100.115.92.200:4000",
  "http://100.115.92.200:3000",
  "https://nonprofitdevs.com",
  "https://www.nonprofitdevs.com",
];
const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      if (origin === undefined || allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      return callback(
        new Error(
          `The CORS policy for this site does not allow access from the origin ${origin}.`
        ),
        false
      );
    },
  })
);
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

let IPADDR;
Object.keys(ifaces).forEach(function (ifname) {
  let alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      return;
    }

    if (alias >= 1) {
      IPADDR = iface.address;
    } else {
      IPADDR = iface.address;
    }
    ++alias;
  });
});

server.applyMiddleware({ app, path: "/graphql" });
const PORT = process.env.PORT || 4000;
const httpServer = app.listen(PORT, () => {
  console.log(`🚀 Api running on port: ${IPADDR}:${PORT}`);
  console.log(`🚀 GraphQL endpoint: ${IPADDR}:${PORT}${server.graphqlPath}`);
});

server.installSubscriptionHandlers(httpServer);
