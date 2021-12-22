const AddCart = require("../../../../Domains/carts/entities/AddCart");
const CartRepository = require("../../../../Domains/carts/CartRepository");
const AddCartUseCase = require("../AddCartUseCase");

describe("AddCartUseCase", () => {
  it("should orchestrating the add cart action correctly", async () => {
    // Arrange
    const useCasePayload = {
      userId: "user-123",
      productId: "product-123",
      quantity: 1,
    };
    const expectedCartId = "cart-123";

    /** creating dependency of use case */
    const mockCartRepository = new CartRepository();

    /** mocking needed function */
    mockCartRepository.addCart = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedCartId));

    /** creating use case instance */
    const getAddCartUseCase = new AddCartUseCase({
      cartRepository: mockCartRepository,
    });

    // Action
    const cartId = await getAddCartUseCase.execute(useCasePayload);

    // Assert
    expect(cartId).toStrictEqual(expectedCartId);
    expect(mockCartRepository.addCart).toBeCalledWith(
      new AddCart({
        userId: useCasePayload.userId,
        productId: useCasePayload.productId,
        quantity: useCasePayload.quantity,
      })
    );
  });
});
