export class ProductService {
  public products: any = [];

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
        product(name: String, description: String, id: Int, price: Int): Product!
      }
    `;

    return typeDefs;
  }

  configResolver(resolvers: any) {
    resolvers.Query.products = () => {
      return this.products;
    }

    resolvers.Mutation.product = (_: any, product: any) => {
      this.products.push(product);
      return product;
    }
  }
}