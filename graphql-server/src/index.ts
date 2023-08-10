import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema";
import { authors, games, reviews } from "./_db";

const resolvers = {
  Query: {
    games: () => {
      return games;
    },

    game: (_, args: any) => {
      return games.find((game) => game.id == args.id);
    },

    reviews: () => {
      return reviews;
    },

    review: (_, args: any) => {
      return reviews.find((review) => review.id == args.id);
    },

    authors: () => {
      return authors;
    },

    author: (_, args: any) => {
      return authors.find((author) => author.id == args.id);
    }
  },

  Game: (parent: any) => {
    return reviews.filter((review) => review.game_id == parent.id)
  }
}

// Server Setup
const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log(`Server ready at: ${url}`);
