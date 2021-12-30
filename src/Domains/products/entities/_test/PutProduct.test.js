const PutProduct = require("../PutProduct");

describe("an PutProduct entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      title: "abc",
      desc: "abc",
      img: "abc",
      price: 90,
    };

    // Action and Assert
    expect(() => new PutProduct(payload)).toThrowError(
      "PUT_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      sellerId: "user-123",
      productId: "product-123",
      price: "90",
    };

    // Action and Assert
    expect(() => new PutProduct(payload)).toThrowError(
      "PUT_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create PutProduct object correctly", () => {
    // Arrange
    const payload = {
      sellerId: "user-123",
      productId: "product-123",
      title: "abc",
      desc: "abc",
      img: "abc",
      categories: ["t-shirt", "man"],
      price: 90,
      discount: 0.05,
      rating: 4.9,
      cashback: true,
      sold: 1,
    };

    // Action
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
    } = new PutProduct(payload);

    // Assert
    expect(sellerId).toEqual(payload.sellerId);
    expect(productId).toEqual(payload.productId);
    expect(title).toEqual(payload.title);
    expect(desc).toEqual(payload.desc);
    expect(img).toEqual(payload.img);
    expect(categories).toEqual(payload.categories);
    expect(price).toEqual(payload.price);
    expect(discount).toEqual(payload.discount);
    expect(rating).toEqual(payload.rating);
    expect(cashback).toEqual(payload.cashback);
    expect(sold).toEqual(payload.sold);
    expect(sellerId).toEqual(payload.sellerId);
  });
});
