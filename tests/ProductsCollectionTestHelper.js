/* istanbul ignore file */
const Product = require("../src/Infrastructures/database/mongodb/models/Product");
const productCollection =
  require("../src/Infrastructures/database/mongodb/db").collection("products");

const ProductsCollectionTestHelper = {
  async getProductModel({
    title = "xyz",
    desc = "xyz",
    img = "xyz",
    categories = ["t-shirt"],
    price = 100,
    sellerId = "user-123",
  }) {
    return new Product({
      title,
      desc,
      img,
      categories,
      price,
      sellerId,
    });
  },

  async addProduct({
    title = "xyz",
    desc = "xyz",
    img = "xyz",
    categories = ["t-shirt"],
    price = 100,
    sellerId = "user-123",
  }) {
    const product = await this.getProductModel({
      title,
      desc,
      img,
      categories,
      price,
      sellerId,
    });

    const result = await productCollection.insertOne(product);
    return result.insertedId;
  },
};

module.exports = ProductsCollectionTestHelper;
