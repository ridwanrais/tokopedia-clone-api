class OrderDetail {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, userId, amount, address, status } = payload;

    this.id = id;
    this.userId = userId;
    this.amount = amount;
    this.address = address;
    this.status = status;
  }

  _verifyPayload({ id, userId, amount, address, status }) {
    if (!id || !userId || !amount || !address || !status) {
      throw new Error("ORDER_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof userId !== "string" ||
      typeof amount !== "number" ||
      typeof address !== "string" ||
      typeof status !== "string"
    ) {
      throw new Error("ORDER_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = OrderDetail;
