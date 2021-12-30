/* istanbul ignore file */
const Order = require("../src/Infrastructures/database/mongodb/models/Order");
const orderCollection =
  require("../src/Infrastructures/database/mongodb/db").collection("orders");

const OrdersCollectionTestHelper = {
  async getOrderModel({
    userId = "user-123",
    productId = "product-123",
    quantity = 1,
    amount = 1,
    address = "testAddress",
    status = "pending",
  }) {
    return new Order({
      userId,
      products: [
        {
          productId,
          quantity,
        },
      ],
      amount,
      address,
      status,
    });
  },

  async addOrder({
    userId = "user-123",
    productId = "product-123",
    quantity = 1,
    amount = 1,
    address = "testAddress",
    status = "pending",
  }) {
    const order = await this.getOrderModel({
      userId,
      productId,
      quantity,
      amount,
      address,
      status,
    });

    const result = await orderCollection.insertOne(order);
    return result.insertedId;
  },
};

module.exports = OrdersCollectionTestHelper;
