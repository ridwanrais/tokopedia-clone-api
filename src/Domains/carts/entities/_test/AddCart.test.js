const AddCart = require("../AddCart");

describe("an AddCart entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      userId: "user-123",
    };

    // Action and Assert
    expect(() => new AddCart(payload)).toThrowError(
      "ADD_CART.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      userId: "user-123",
      productId: "product-123",
      quantity: "1",
    };

    // Action and Assert
    expect(() => new AddCart(payload)).toThrowError(
      "ADD_CART.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create AddCart object correctly", () => {
    // Arrange
    const payload = {
      userId: "user-123",
      productId: "product-123",
      quantity: 1,
    };

    // Action
    const { userId, productId, quantity } = new AddCart(payload);

    // Assert
    expect(userId).toEqual(payload.userId);
    expect(productId).toEqual(payload.productId);
    expect(quantity).toEqual(payload.quantity);
  });
});
