class PutOrder {
  constructor(payload) {
    this._verifyPayload(payload);

    const { orderId, userId, productId, quantity, amount, address, status } =
      payload;

    this.orderId = orderId;
    this.userId = userId;
    this.productId = productId;
    this.quantity = quantity;
    this.amount = amount;
    this.address = address;
    this.status = status;
  }

  _verifyPayload({
    orderId,
    userId,
    productId,
    quantity,
    amount,
    address,
    status,
  }) {
    if (
      !orderId ||
      !userId ||
      !productId ||
      !quantity ||
      !amount ||
      !address ||
      !status
    ) {
      throw new Error("PUT_ORDER.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof orderId !== "string" ||
      typeof userId !== "string" ||
      typeof productId !== "string" ||
      typeof quantity !== "number" ||
      typeof amount !== "number" ||
      typeof address !== "string" ||
      typeof status !== "string"
    ) {
      throw new Error("PUT_ORDER.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = PutOrder;
