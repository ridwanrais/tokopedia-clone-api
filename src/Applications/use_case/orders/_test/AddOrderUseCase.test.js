const AddOrder = require("../../../../Domains/orders/entities/AddOrder");
const OrderRepository = require("../../../../Domains/orders/OrderRepository");
const AddOrderUseCase = require("../AddOrderUseCase");

describe("AddOrderUseCase", () => {
  it("should orchestrating the add order action correctly", async () => {
    // Arrange
    const useCasePayload = {
      userId: "user-123",
      productId: "product-123",
      quantity: 1,
      amount: 90,
      address: "test",
      status: "pending",
    };
    const expectedOrderId = "order-123";

    /** creating dependency of use case */
    const mockOrderRepository = new OrderRepository();

    /** mocking needed function */
    mockOrderRepository.addOrder = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedOrderId));

    /** creating use case instance */
    const getAddOrderUseCase = new AddOrderUseCase({
      orderRepository: mockOrderRepository,
    });

    // Action
    const orderId = await getAddOrderUseCase.execute(useCasePayload);

    // Assert
    expect(orderId).toStrictEqual(expectedOrderId);
    expect(mockOrderRepository.addOrder).toBeCalledWith(
      new AddOrder({
        userId: useCasePayload.userId,
        productId: useCasePayload.productId,
        quantity: useCasePayload.quantity,
        amount: useCasePayload.amount,
        address: useCasePayload.address,
        status: useCasePayload.status,
      })
    );
  });
});
