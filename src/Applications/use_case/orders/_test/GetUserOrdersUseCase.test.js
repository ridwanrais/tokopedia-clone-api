const OrderDetail = require("../../../../Domains/orders/entities/OrderDetail");
const OrderRepository = require("../../../../Domains/orders/OrderRepository");
const GetOrderUseCase = require("../GetUserOrdersUseCase");

describe("GetOrderUseCase", () => {
  it("should orchestrating the get order action correctly", async () => {
    // Arrange
    const useCasePayload = {
      userId: "user-123",
    };

    const expectedOrdersDetail = [
      new OrderDetail({
        id: "123",
        userId: "user-123",
        amount: 90,
        address: "test",
        status: "pending",
      }),
      new OrderDetail({
        id: "456",
        userId: "user-123",
        amount: 90,
        address: "test",
        status: "pending",
      }),
    ];

    /** creating dependency of use case */
    const mockOrderRepository = new OrderRepository();

    /** mocking needed function */
    mockOrderRepository.getUserOrders = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedOrdersDetail));

    /** creating use case instance */
    const getGetOrderUseCase = new GetOrderUseCase({
      orderRepository: mockOrderRepository,
    });

    // Action
    const ordersDetail = await getGetOrderUseCase.execute(useCasePayload);

    // Assert
    expect(ordersDetail).toStrictEqual(expectedOrdersDetail);
    expect(mockOrderRepository.getUserOrders).toBeCalledWith(
      useCasePayload.userId
    );
  });
});
