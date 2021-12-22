const AddOrder = require("../AddOrder");

describe("an AddOrder entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      userId: "user-123",
    };

    // Action and Assert
    expect(() => new AddOrder(payload)).toThrowError(
      "ADD_ORDER.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      userId: "user-123",
      productId: "product-123",
      quantity: "1",
      amount: 90,
      address: "test",
      status: "pending",
    };

    // Action and Assert
    expect(() => new AddOrder(payload)).toThrowError(
      "ADD_ORDER.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create AddOrder object correctly", () => {
    // Arrange
    const payload = {
      userId: "user-123",
      productId: "product-123",
      quantity: 1,
      amount: 90,
      address: "test",
      status: "pending",
    };

    // Action
    const { userId, productId, quantity, amount, address, status } =
      new AddOrder(payload);

    // Assert
    expect(userId).toEqual(payload.userId);
    expect(productId).toEqual(payload.productId);
    expect(quantity).toEqual(payload.quantity);
    expect(amount).toEqual(payload.amount);
    expect(address).toEqual(payload.address);
    expect(status).toEqual(payload.status);
  });
});
