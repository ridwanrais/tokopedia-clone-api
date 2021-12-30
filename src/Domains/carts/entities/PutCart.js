class PutCart {
  constructor(payload) {
    this._verifyPayload(payload);

    const { cartId, userId, productId, quantity } = payload;

    this.cartId = cartId;
    this.userId = userId;
    this.productId = productId;
    this.quantity = quantity;
  }

  _verifyPayload({ cartId, userId, productId, quantity }) {
    if (!cartId || !userId || !productId || !quantity) {
      throw new Error("PUT_CART.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof cartId !== "string" ||
      typeof userId !== "string" ||
      typeof productId !== "string" ||
      typeof quantity !== "number"
    ) {
      throw new Error("PUT_CART.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = PutCart;
