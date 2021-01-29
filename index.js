const { ApolloServer } = require("apollo-server");
const neo4j = require("neo4j-driver");
const { makeAugmentedSchema } = require("neo4j-graphql-js");

// Replaced all: direction: "IN" with direction: IN and same for direction: OUT
const typeDefs = /* GraphQL */ `
  type Business {
    businessId: ID!
    name: String!
    city: String!
    state: String!
    address: String!
    location: Point!
    reviews: [Review] @relation(name: "REVIEWS", direction: IN)
    categories: [Category] @relation(name: "IN_CATEGORY", direction: OUT)
  }
  type User {
    userID: ID!
    name: String!
    reviews: [Review] @relation(name: "WROTE", direction: OUT)
  }
  type Review {
    reviewId: ID!
    stars: Float!
    date: Date!
    text: String
    user: User @relation(name: "WROTE", direction: IN)
    business: Business @relation(name: "REVIEWS", direction: OUT)
  }
  type Category {
    name: String!
    businesses: [Business] @relation(name: "IN_CATEGORY", direction: IN)
  }
`;

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
