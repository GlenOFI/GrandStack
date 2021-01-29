// const ApolloServer = require("apollo-server");
import { ApolloServer } from "../GrandStack/node_modules/apollo-server/dist/index.js";

import { typeDefs } from "../GrandStack/typeDefs.js";
import { resolvers } from "../GrandStack/resolvers.js";
import { db } from "../GrandStack/mockData.js";

const server = new ApolloServer({ typeDefs, resolvers, context: { db } });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
