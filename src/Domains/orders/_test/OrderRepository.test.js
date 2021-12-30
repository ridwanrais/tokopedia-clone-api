const OrderRepository = require("../OrderRepository");

describe("OrderRepository interface", () => {
  it("should throw error when invoke abstract behavior", async () => {
    // Arrange
    const orderRepository = new OrderRepository();

    // Action and Assert
    await expect(orderRepository.addOrder({}, {})).rejects.toThrowError(
      "ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(orderRepository.putOrder({})).rejects.toThrowError(
      "ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(orderRepository.deleteOrder({})).rejects.toThrowError(
      "ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(orderRepository.verifyOrderExistence({})).rejects.toThrowError(
      "ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(orderRepository.verifyOrderOwner({})).rejects.toThrowError(
      "ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(orderRepository.getUserOrders({})).rejects.toThrowError(
      "ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
  });
});
