class AddOrder {
  constructor(payload) {
    this._verifyPayload(payload);

    const { userId, productId, quantity, amount, address, status } = payload;

    this.userId = userId;
    this.productId = productId;
    this.quantity = quantity;
    this.amount = amount;
    this.address = address;
    this.status = status;
  }

  _verifyPayload({ userId, productId, quantity, amount, address, status }) {
    if (!userId || !productId || !quantity || !amount || !address || !status) {
      throw new Error("ADD_ORDER.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof userId !== "string" ||
      typeof productId !== "string" ||
      typeof quantity !== "number" ||
      typeof amount !== "number" ||
      typeof address !== "string" ||
      typeof status !== "string"
    ) {
      throw new Error("ADD_ORDER.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = AddOrder;
