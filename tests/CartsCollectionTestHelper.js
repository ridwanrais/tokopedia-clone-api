/* istanbul ignore file */
const Cart = require("../src/Infrastructures/database/mongodb/models/Cart");
const cartCollection =
  require("../src/Infrastructures/database/mongodb/db").collection("carts");

const CartsCollectionTestHelper = {
  async getCartModel({
    userId = "user-123",
    productId = "product-123",
    quantity = 1,
  }) {
    return new Cart({
      userId,
      products: [
        {
          productId,
          quantity,
        },
      ],
    });
  },

  async addCart({
    userId = "user-123",
    productId = "product-123",
    quantity = 1,
  }) {
    const cart = await this.getCartModel({
      userId,
      productId,
      quantity,
    });

    const result = await cartCollection.insertOne(cart);
    return result.insertedId;
  },
};

module.exports = CartsCollectionTestHelper;
