const AddedProduct = require("../AddedProduct");

describe("an AddedProduct entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      id: "product-123",
      title: "abc",
    };

    // Action and Assert
    expect(() => new AddedProduct(payload)).toThrowError(
      "ADDED_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: "product-123",
      title: "abc",
      sellerId: 123,
    };

    // Action and Assert
    expect(() => new AddedProduct(payload)).toThrowError(
      "ADDED_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create AddedProduct object correctly", () => {
    // Arrange
    const payload = {
      id: "product-123",
      title: "abc",
      sellerId: "user-123",
    };

    // Action
    const { id, title, sellerId } = new AddedProduct(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(sellerId).toEqual(payload.sellerId);
  });
});
