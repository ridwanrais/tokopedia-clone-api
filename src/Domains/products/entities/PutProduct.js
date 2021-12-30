class PutProduct {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      sellerId,
      productId,
      title,
      desc,
      img,
      categories,
      price,
      discount,
      rating,
      cashback,
      sold,
    } = payload;

    this.sellerId = sellerId;
    this.productId = productId;
    this.title = title;
    this.desc = desc;
    this.img = img;
    this.categories = categories;
    this.price = price;
    this.discount = discount;
    this.rating = rating;
    this.cashback = cashback;
    this.sold = sold;
  }

  _verifyPayload({
    sellerId,
    productId,
    title,
    desc,
    img,
    categories = [],
    price,
    discount,
    rating,
    sold,
  }) {
    if (!sellerId || !productId) {
      throw new Error("PUT_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    this.validateOptionalStrings([title, desc, img]);
    this.validateOptionalNumbers([price, discount, rating, sold]);
    this.validateOptionalStrings(categories);

    if (typeof sellerId !== "string" || typeof productId !== "string") {
      throw new Error("PUT_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }

  validateOptionalStrings(stringArr) {
    stringArr.map((element) => {
      if (element) {
        if (typeof element !== "string") {
          throw new Error("PUT_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION");
        }
      }
    });
  }

  validateOptionalNumbers(numberArr) {
    numberArr.map((element) => {
      if (element) {
        if (typeof element !== "number") {
          throw new Error("PUT_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION");
        }
      }
    });
  }
}

module.exports = PutProduct;
