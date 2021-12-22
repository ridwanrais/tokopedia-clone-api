class AddedProduct {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, title, sellerId } = payload;

    this.id = id;
    this.title = title;
    this.sellerId = sellerId;
  }

  _verifyPayload({ id, title, sellerId }) {
    if (!id || !title || !sellerId) {
      throw new Error("ADDED_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof title !== "string" ||
      typeof sellerId !== "string"
    ) {
      throw new Error("ADDED_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = AddedProduct;
