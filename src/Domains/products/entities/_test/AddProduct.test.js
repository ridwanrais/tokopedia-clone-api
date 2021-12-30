const AddProduct = require("../AddProduct");

describe("an AddProduct entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      title: "abc",
      desc: "abc",
      img: "abc",
      price: 90,
    };

    // Action and Assert
    expect(() => new AddProduct(payload)).toThrowError(
      "ADD_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      title: "abc",
      desc: "abc",
      img: "abc",
      price: "90",
      sellerId: "user-123",
    };

    // Action and Assert
    expect(() => new AddProduct(payload)).toThrowError(
      "ADD_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create AddProduct object correctly", () => {
    // Arrange
    const payload = {
      title: "abc",
      desc: "abc",
      img: "abc",
      price: 90,
      categories: ["food"],
      discount: 0.1,
      sellerId: "user-123",
    };

    // Action
    const { title, desc, img, price, sellerId, discount } = new AddProduct(
      payload
    );

    // Assert
    expect(title).toEqual(payload.title);
    expect(desc).toEqual(payload.desc);
    expect(img).toEqual(payload.img);
    expect(price).toEqual(payload.price);
    expect(sellerId).toEqual(payload.sellerId);
    expect(discount).toEqual(payload.discount);
  });
});
