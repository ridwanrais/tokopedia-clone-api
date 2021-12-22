const CartRepository = require("../../../../Domains/carts/CartRepository");
const PutCartUseCase = require("../PutCartUseCase");

describe("PutCartUseCase", () => {
  it("should orchestrating the put cart action correctly", async () => {
    // Arrange
    const useCasePayload = {
      userId: "user-123",
      cartId: "cart-123",
      productId: "product-123",
      quantity: 2,
    };

    /** creating dependency of use case */
    const mockCartRepository = new CartRepository();

    /** mocking needed function */
    mockCartRepository.verifyCartOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCartRepository.putCart = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const getPutCartUseCase = new PutCartUseCase({
      cartRepository: mockCartRepository,
    });

    // Action
    await getPutCartUseCase.execute(useCasePayload);

    // Assert
    expect(mockCartRepository.putCart).toBeCalledWith(useCasePayload.cartId);
    expect(mockCartRepository.verifyCartOwner).toBeCalledWith(
      useCasePayload.cartId,
      useCasePayload.userId
    );
  });
});
