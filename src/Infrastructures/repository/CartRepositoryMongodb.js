const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const AuthorizationError = require("../../Commons/exceptions/AuthorizationError");
const CartRepository = require("../../Domains/carts/CartRepository");
const Cart = require("../database/mongodb/models/Cart");

class CartRepositoryMongodb extends CartRepository {
  constructor(collection) {
    super();
    this._collection = collection;
  }

  async addCart(addCart) {
    const newCart = new Cart({
      userId: addCart.userId,
      products: [
        {
          productId: addCart.productId,
          quantity: addCart.quantity,
        },
      ],
    });

    const result = await this._collection.insertOne(newCart);
    const id = result.insertedId.toString();

    return id;
  }

  async getCart(cartId) {
    const result = await this._collection.findOne({ _id: cartId });

    if (!result) {
      throw new NotFoundError("cart tidak ditemukan");
    }

    return result;
  }

  async putCart(putCart) {
    const result = await this._collection.findOneAndUpdate(
      { _id: putCart.cartId },
      {
        $set: putCart,
      },
      { returnDocument: "after" }
    );

    return result.value;
  }

  async verifyCartExistence(cartId) {
    const result = await this._collection.findOne({ _id: cartId });

    if (!result) {
      throw new NotFoundError("cart yang dicari tidak ditemukan");
    }
  }

  async verifyCartOwner(cartId, userId) {
    const result = await this._collection.findOne({
      _id: cartId,
      userId: userId,
    });

    if (!result) {
      throw new AuthorizationError("Anda tidak berhak melakukan perintah ini");
    }
  }

  async deleteCart(cartId) {
    const result = await this._collection.findOneAndDelete({ _id: cartId });

    if (!result.value) {
      throw new NotFoundError("cart yang dicari tidak ditemukan");
    }

    return result.value;
  }
}

module.exports = CartRepositoryMongodb;
