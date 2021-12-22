const CartRepository = require("../../../../Domains/carts/CartRepository");
const DeleteCartUseCase = require("../DeleteCartUseCase");

describe("DeleteCartUseCase", () => {
  it("should orchestrating the delete cart action correctly", async () => {
    // Arrange
    const useCasePayload = {
      userId: "user-123",
      cartId: "cart-123",
    };

    /** creating dependency of use case */
    const mockCartRepository = new CartRepository();

    /** mocking needed function */
    mockCartRepository.deleteCart = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCartRepository.verifyCartOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const getDeleteCartUseCase = new DeleteCartUseCase({
      cartRepository: mockCartRepository,
    });

    // Action
    await getDeleteCartUseCase.execute(useCasePayload);

    // Assert
    expect(mockCartRepository.deleteCart).toBeCalledWith(useCasePayload.cartId);
    expect(mockCartRepository.verifyCartOwner).toBeCalledWith(
      useCasePayload.cartId,
      useCasePayload.userId
    );
  });
});
