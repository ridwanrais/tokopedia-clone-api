const CartRepository = require("../CartRepository");

describe("CartRepository interface", () => {
  it("should throw error when invoke abstract behavior", async () => {
    // Arrange
    const cartRepository = new CartRepository();

    // Action and Assert
    await expect(cartRepository.addCart({}, {})).rejects.toThrowError(
      "CART_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(cartRepository.getCart({})).rejects.toThrowError(
      "CART_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(cartRepository.putCart({})).rejects.toThrowError(
      "CART_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(cartRepository.verifyCartExistence({})).rejects.toThrowError(
      "CART_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(cartRepository.verifyCartOwner({})).rejects.toThrowError(
      "CART_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(cartRepository.deleteCart({})).rejects.toThrowError(
      "CART_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
  });
});
