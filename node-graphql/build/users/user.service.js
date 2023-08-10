"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const crypto_1 = __importDefault(require("crypto"));
class UserService {
    constructor() {
        this.users = [];
    }
    configTypeDefs() {
        let typeDefs = `
      type User {
        firstName: String,
        lastName: String,
        id: Int,
        password: String,
        permissionLevel: Int,
        email: String
      } `;
        typeDefs += ` 
      extend type Query {
        users: [User]
      }
    `;
        typeDefs += `
      extend type Mutation {
        user(firstName:String,
          lastName: String,
          password: String,
          permissionLevel: Int,
          email: String,
          id:Int): User!
      }`;
        return typeDefs;
    }
    configResolvers(resolvers) {
        resolvers.Query.users = () => {
            return this.users;
        };
        resolvers.Mutation.user = (_, user) => {
            let salt = crypto_1.default.randomBytes(16).toString('base64');
            let hash = crypto_1.default.createHmac('sha512', salt).update(user.password).digest("base64");
            user.password = hash;
            this.users.push(user);
            return user;
        };
    }
}
exports.UserService = UserService;
