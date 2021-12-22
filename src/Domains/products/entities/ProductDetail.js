class ProductDetail {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      id,
      title,
      desc,
      img,
      categories = [],
      price,
      discount,
      rating,
      cashback,
      sold,
      createdAt,
      sellerId,
    } = payload;

    this.id = id;
    this.title = title;
    this.desc = desc;
    this.img = img;
    this.categories = categories;
    this.price = price;
    this.discount = discount;
    this.rating = rating;
    this.cashback = cashback;
    this.sold = sold;
    this.createdAt = createdAt;
    this.sellerId = sellerId;
  }

  _verifyPayload({
    id,
    title,
    desc,
    img,
    categories,
    price,
    discount,
    rating,
    cashback,
    sold,
    createdAt,
    sellerId,
  }) {
    if (!id || !title || !desc || !img || !price || !createdAt || !sellerId) {
      throw new Error("PRODUCT_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof id !== "string" ||
      typeof title !== "string" ||
      typeof desc !== "string" ||
      typeof img !== "string" ||
      typeof price !== "number" ||
      typeof createdAt !== "string" ||
      typeof sellerId !== "string"
    ) {
      throw new Error("PRODUCT_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }
}

module.exports = ProductDetail;
