import gql from "graphql-tag";
import express from "express";
import pkg from "apollo-server-express";
const { ApolloServer, makeExecutableSchema } = pkg;

// Configure express
const app = express();

const port = process.env.PORT || 8080;

// Define APIs using GraphQL SDL (Schema Definition Language)
const typeDefs = gql`
  type Query {
    sayHello(name: String!): String!
  }

  type Mutation {
    sayHello(name: String!): String!
  }
`;

// Define resolvers map for API definitions in SDL (Schema Definition Language)
const resolvers = {
  Query: {
    sayHello: (obj, args, context, info) => {
      return `Hello ${args.name}!`;
    },
  },

  Mutation: {
    sayHello: (obj, args, context, info) => {
      return `Hello ${args.name}!`;
    },
  },
};

// Build GraphQL schema based on SDL definitions and resolvers maps
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Build Apollo server
const apolloServer = new ApolloServer({ schema });
apolloServer.applyMiddleware({ app });

// Run server
app.listen({ port }, () => {
  console.log(
    `🚀Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  );
});
