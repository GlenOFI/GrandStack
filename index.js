const { ApolloServer } = require("apollo-server");
const neo4j = require("neo4j-driver");
const { makeAugmentedSchema } = require("neo4j-graphql-js");
const { typeDefs } = require("./typeDefs");

const schema = makeAugmentedSchema({
  typeDefs,
  //   resolvers,
  config: { mutation: false },
});

const driver = neo4j.driver(
  // TODO: move to .env file
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "1234")
);

const server = new ApolloServer({ schema, context: { driver } });

server.listen().then(({ url }) => {
  console.log(`GraphQL server ready at ${url}`);
});
