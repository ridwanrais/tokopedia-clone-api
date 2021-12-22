class CartSellerDetail {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, img, title, price, discount, quantity } = payload;

    this.id = id;
    this.img = img;
    this.title = title;
    this.price = price;
    this.discount = discount;
    this.quantity = quantity;
  }

  _verifyPayload({ id, img, title, price, discount, quantity }) {
    if (!id || !img || !title || !price || !quantity) {
      throw new Error("CART_PRODUCT_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof img !== "string" ||
      typeof title !== "string" ||
      typeof price !== "number" ||
      typeof discount !== "number" ||
      typeof quantity !== "number"
    ) {
      throw new Error("CART_PRODUCT_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = CartSellerDetail;
