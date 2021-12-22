class CartSellerDetail {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, sellerName, merchantLevel, sellerAddress, products } = payload;

    this.id = id;
    this.sellerName = sellerName;
    this.merchantLevel = merchantLevel;
    this.sellerAddress = sellerAddress;
    this.products = products;
  }

  _verifyPayload({ id, sellerName, merchantLevel, sellerAddress, products }) {
    if (!id || !sellerName || !merchantLevel || !sellerAddress || !products) {
      throw new Error("CART_SELLER_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof sellerName !== "string" ||
      typeof merchantLevel !== "string" ||
      typeof sellerAddress !== "string" ||
      typeof products !== "object"
    ) {
      throw new Error("CART_SELLER_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = CartSellerDetail;
