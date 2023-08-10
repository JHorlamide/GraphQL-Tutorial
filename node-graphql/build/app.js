"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const graphql_tools_1 = require("graphql-tools");
const product_service_1 = require("./products/product.service");
const user_service_1 = require("./users/user.service");
const app = (0, express_1.default)();
const port = 4000;
let typeDefs = [`
  type Query {
    hello: String
  }
     
  type Mutation {
    hello(message: String) : String
  }
`];
let helloMessage = "World!";
let resolvers = {
    Query: {
        hello: () => helloMessage,
    },
    Mutation: {
        hello: (_, helloData) => {
            helloMessage = helloData.message;
            return helloMessage;
        }
    }
};
let productService = new product_service_1.ProductService();
let userService = new user_service_1.UserService();
typeDefs += productService.configTypeDefs();
typeDefs += userService.configTypeDefs();
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: (0, graphql_tools_1.makeExecutableSchema)({ typeDefs, resolvers }),
    graphiql: true
}));
app.listen(port, () => console.log(`Node Graphql API listening on port ${port}!`));
