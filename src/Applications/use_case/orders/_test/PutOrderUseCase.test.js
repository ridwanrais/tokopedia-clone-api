const OrderRepository = require("../../../../Domains/orders/OrderRepository");
const PutOrderUseCase = require("../PutOrderUseCase");
const PutOrder = require("../../../../Domains/orders/entities/PutOrder");

describe("PutOrderUseCase", () => {
  it("should orchestrating the put order action correctly", async () => {
    // Arrange
    const useCasePayload = {
      userId: "user-123",
      orderId: "order-123",
      productId: "product-123",
      quantity: 2,
      amount: 90,
      address: "test",
      status: "pending",
    };

    /** creating dependency of use case */
    const mockOrderRepository = new OrderRepository();

    /** mocking needed function */
    mockOrderRepository.verifyOrderOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockOrderRepository.putOrder = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const getPutOrderUseCase = new PutOrderUseCase({
      orderRepository: mockOrderRepository,
    });

    // Action
    await getPutOrderUseCase.execute(useCasePayload);

    // Assert
    expect(mockOrderRepository.putOrder).toBeCalledWith(
      new PutOrder({ ...useCasePayload })
    );
    expect(mockOrderRepository.verifyOrderOwner).toBeCalledWith(
      useCasePayload.orderId,
      useCasePayload.userId
    );
  });
});
