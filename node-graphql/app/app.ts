import express from "express"
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "graphql-tools";
import { ProductService } from "./products/product.service";
import { UserService } from "./users/user.service";

const app: express.Application = express();
const port = 4000;

let typeDefs: any = [`
  type Query {
    hello: String
  }
     
  type Mutation {
    hello(message: String) : String
  }
`];

let helloMessage: String = "World!";

let resolvers = {
  Query: {
    hello: () => helloMessage,
  },

  Mutation: {
    hello: (_: any, helloData: any) => {
      helloMessage = helloData.message;
      return helloMessage;
    }
  }
}

let productService = new ProductService();
let userService = new UserService();

typeDefs += productService.configTypeDefs();
typeDefs += userService.configTypeDefs();

app.use("/graphql", graphqlHTTP({
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  graphiql: true
}))

app.listen(port, () => console.log(`Node Graphql API listening on port ${port}!`));