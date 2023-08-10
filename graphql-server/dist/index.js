import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { authors, games, reviews } from "./_db.js";
const resolvers = {
    Query: {
        games: () => games,
        game: (_, args) => games.find((game) => game.id == args.id),
        reviews: () => reviews,
        review: (_, args) => reviews.find((review) => review.id == args.id),
        authors: () => authors,
        author: (_, args) => authors.find((author) => author.id == args.id)
    }
};
// Server Setup
const server = new ApolloServer({
    typeDefs,
    resolvers
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});
console.log(`Server ready at: ${url}`);
