const PutCart = require("../PutCart");

describe("an PutCart entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      userId: "user-123",
    };

    // Action and Assert
    expect(() => new PutCart(payload)).toThrowError(
      "PUT_CART.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      cartId: "cart-123",
      userId: "user-123",
      productId: "product-123",
      quantity: "1",
    };

    // Action and Assert
    expect(() => new PutCart(payload)).toThrowError(
      "PUT_CART.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create PutCart object correctly", () => {
    // Arrange
    const payload = {
      cartId: "cart-123",
      userId: "user-123",
      productId: "product-123",
      quantity: 1,
    };

    // Action
    const { cartId, userId, productId, quantity } = new PutCart(payload);

    // Assert
    expect(cartId).toEqual(payload.cartId);
    expect(userId).toEqual(payload.userId);
    expect(productId).toEqual(payload.productId);
    expect(quantity).toEqual(payload.quantity);
  });
});
