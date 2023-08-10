"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(productId, productName, productDescription, price) {
        this.id = 0;
        this.name = "";
        this.description = "";
        this.price = 0;
        this.id = productId;
        this.name = productName;
        this.description = productDescription;
        this.price = price;
    }
}
exports.Product = Product;
