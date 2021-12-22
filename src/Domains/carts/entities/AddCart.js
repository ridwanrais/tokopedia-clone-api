class AddCart {
  constructor(payload) {
    this._verifyPayload(payload);

    const { userId, productId, quantity } = payload;

    this.userId = userId;
    this.productId = productId;
    this.quantity = quantity;
  }

  _verifyPayload({ userId, productId, quantity }) {
    if (!userId || !productId || !quantity) {
      throw new Error("ADD_CART.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof userId !== "string" ||
      typeof productId !== "string" ||
      typeof quantity !== "number"
    ) {
      throw new Error("ADD_CART.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = AddCart;
