const ProductDetail = require("../ProductDetail");

describe("a ProductDetail entities", () => {
  it("should throw error when payload did not contain needed property or empty", () => {
    // Arrange
    const payload = {
      id: "123",
      title: "abc",
      desc: "abc",
      img: "abc",
      price: "abc",
      discount: 0,
      cashback: "abc",
      sold: "abc",
    };

    // Action and Assert
    expect(() => new ProductDetail(payload)).toThrowError(
      "PRODUCT_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: "123",
      title: "abc",
      desc: "abc",
      img: "abc",
      price: "abc",
      discount: "0",
      cashback: "abc",
      sold: "abc",
      createdAt: "testDate",
      sellerId: "abc",
    };

    // Action and Assert
    expect(() => new ProductDetail(payload)).toThrowError(
      "PRODUCT_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create ProductDetail object correctly", () => {
    // Arrange
    const payload = {
      id: "123",
      title: "abc",
      desc: "abc",
      img: "abc",
      price: 25,
      discount: 0,
      cashback: "abc",
      sold: "abc",
      createdAt: "testDate",
      sellerId: "abc",
    };

    // Action
    const {
      id,
      title,
      desc,
      img,
      price,
      discount,
      cashback,
      sold,
      createdAt,
      sellerId,
    } = new ProductDetail(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(desc).toEqual(payload.desc);
    expect(img).toEqual(payload.img);
    expect(price).toEqual(payload.price);
    expect(discount).toEqual(payload.discount);
    expect(cashback).toEqual(payload.cashback);
    expect(sold).toEqual(payload.sold);
    expect(createdAt).toEqual(payload.createdAt);
    expect(sellerId).toEqual(payload.sellerId);
  });
});
