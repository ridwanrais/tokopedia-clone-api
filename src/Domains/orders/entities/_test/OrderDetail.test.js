const OrderDetail = require("../OrderDetail");

describe("an OrderDetail entities", () => {
  it("should throw error when payload did not contain needed property", () => {
    // Arrange
    const payload = {
      userId: "user-123",
    };

    // Action and Assert
    expect(() => new OrderDetail(payload)).toThrowError(
      "ORDER_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: "123",
      userId: "user-123",
      amount: "90",
      address: "test",
      status: "pending",
    };

    // Action and Assert
    expect(() => new OrderDetail(payload)).toThrowError(
      "ORDER_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create OrderDetail object correctly", () => {
    // Arrange
    const payload = {
      id: "123",
      userId: "user-123",
      amount: 90,
      address: "test",
      status: "pending",
    };

    // Action
    const { id, userId, amount, address, status } = new OrderDetail(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(userId).toEqual(payload.userId);
    expect(amount).toEqual(payload.amount);
    expect(address).toEqual(payload.address);
    expect(status).toEqual(payload.status);
  });
});
