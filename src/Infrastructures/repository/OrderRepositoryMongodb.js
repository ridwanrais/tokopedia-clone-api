const InvariantError = require("../../Commons/exceptions/InvariantError");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const AuthorizationError = require("../../Commons/exceptions/AuthorizationError");
const OrderRepository = require("../../Domains/orders/OrderRepository");
const Order = require("../database/mongodb/models/Order");

class OrderRepositoryMongodb extends OrderRepository {
  constructor(collection) {
    super();
    this._collection = collection;
  }

  async addOrder(addOrder) {
    const newOrder = new Order({
      userId: addOrder.userId,
      products: [
        {
          productId: addOrder.productId,
          quantity: addOrder.quantity,
        },
      ],
      amount: addOrder.amount,
      address: addOrder.address,
      status: addOrder.status,
    });

    const result = await this._collection.insertOne(newOrder);
    const id = result.insertedId.toString();

    return id;
  }

  async putOrder(putOrder) {
    const orderId = putOrder.orderId;

    const result = await this._collection.findOneAndUpdate(
      { _id: orderId },
      {
        $set: putOrder,
      },
      { returnDocument: "after" }
    );

    return result.value;
  }

  async deleteOrder(orderId) {
    const result = await this._collection.findOneAndDelete({ _id: orderId });

    if (!result.value) {
      throw new InvariantError("order tidak ditemukan");
    }

    return result.value;
  }

  async verifyOrderExistence(orderId) {
    const result = await this._collection.findOne({ _id: orderId });

    if (!result) {
      throw new NotFoundError("order yang dicari tidak ditemukan");
    }
  }

  async verifyOrderOwner(orderId, userId) {
    const result = await this._collection.findOne({
      _id: orderId,
      userId: userId.toString(),
    });

    if (!result) {
      throw new AuthorizationError("Anda tidak berhak melakukan perintah ini");
    }
  }

  async getUserOrders(userId) {
    const orderArray = await this._collection.find({ userId }).toArray();

    if (!orderArray.length) {
      throw new NotFoundError("order tidak ditemukan");
    }

    return orderArray;
  }
}

module.exports = OrderRepositoryMongodb;
