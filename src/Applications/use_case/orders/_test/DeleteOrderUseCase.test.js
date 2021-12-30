const OrderRepository = require("../../../../Domains/orders/OrderRepository");
const DeleteOrderUseCase = require("../DeleteOrderUseCase");

describe("DeleteOrderUseCase", () => {
  it("should orchestrating the delete order action correctly", async () => {
    // Arrange
    const useCasePayload = {
      userId: "user-123",
      orderId: "order-123",
    };

    /** creating dependency of use case */
    const mockOrderRepository = new OrderRepository();

    /** mocking needed function */
    mockOrderRepository.deleteOrder = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockOrderRepository.verifyOrderExistence = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockOrderRepository.verifyOrderOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const getDeleteOrderUseCase = new DeleteOrderUseCase({
      orderRepository: mockOrderRepository,
    });

    // Action
    await getDeleteOrderUseCase.execute(useCasePayload);

    // Assert
    expect(mockOrderRepository.deleteOrder).toBeCalledWith(
      useCasePayload.orderId
    );
    expect(mockOrderRepository.verifyOrderExistence).toBeCalledWith(
      useCasePayload.orderId
    );
    expect(mockOrderRepository.verifyOrderOwner).toBeCalledWith(
      useCasePayload.orderId,
      useCasePayload.userId
    );
  });
});
