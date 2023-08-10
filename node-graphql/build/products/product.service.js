"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
class ProductService {
    constructor() {
        this.products = [];
    }
    configTypeDefs() {
        let typeDefs = `
      type Product {
        name: String,
        description: String,
        id: Int,
        price: Int
      }
    `;
        typeDefs += `
      extend type Query {
        products: [Product]
      }
    `;
        typeDefs += `
      extend type Mutation {
        product(name: String, description: String, id: Int, price: Int): Product
      }
    `;
        return typeDefs;
    }
    configResolver(resolvers) {
        resolvers.Query.products = () => {
            return this.products;
        };
        resolvers.Mutation.product = (_, product) => {
            this.products.push(product);
            return product;
        };
    }
}
exports.ProductService = ProductService;
