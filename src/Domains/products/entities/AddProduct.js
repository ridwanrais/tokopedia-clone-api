class AddProduct {
  constructor(payload) {
    this._verifyPayload(payload);

    const {
      title,
      desc,
      img,
      categories,
      price,
      discount,
      cashback,
      sellerId,
    } = payload;

    this.title = title;
    this.desc = desc;
    this.img = img;
    this.categories = categories;
    this.price = price;
    this.discount = discount;
    this.cashback = cashback;
    this.sellerId = sellerId;
  }

  _verifyPayload({
    title,
    desc,
    img,
    categories = [],
    price,
    discount,
    sellerId,
  }) {
    if (!title || !desc || !img || !price || !sellerId) {
      throw new Error("ADD_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    this.validateOptionalNumbers([discount]);
    this.validateOptionalStrings(categories);

    if (
      typeof title !== "string" ||
      typeof desc !== "string" ||
      typeof img !== "string" ||
      typeof price !== "number" ||
      typeof sellerId !== "string"
    ) {
      throw new Error("ADD_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }
  }

  validateOptionalStrings(stringArr) {
    stringArr.map((element) => {
      if (element) {
        if (typeof element !== "string") {
          throw new Error("ADD_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION");
        }
      }
    });
  }

  validateOptionalNumbers(numberArr) {
    numberArr.map((element) => {
      if (element) {
        if (typeof element !== "number") {
          throw new Error("ADD_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION");
        }
      }
    });
  }
}

module.exports = AddProduct;
