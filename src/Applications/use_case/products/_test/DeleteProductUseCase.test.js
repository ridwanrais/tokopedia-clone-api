const ProductRepository = require("../../../../Domains/products/ProductRepository");
const DeleteProductUseCase = require("../DeleteProductUseCase");

describe("DeleteProductUseCase", () => {
  it("should orchestrating the delete product action correctly", async () => {
    // Arrange
    const useCasePayload = {
      userId: "user-123",
      productId: "product-123",
    };

    /** creating dependency of use case */
    const mockProductRepository = new ProductRepository();

    /** mocking needed function */
    mockProductRepository.verifyProductOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockProductRepository.deleteProduct = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    /** creating use case instance */
    const deleteDeleteProductUseCase = new DeleteProductUseCase({
      productRepository: mockProductRepository,
    });

    // Action
    await deleteDeleteProductUseCase.execute(useCasePayload);

    // Assert
    expect(mockProductRepository.verifyProductOwner).toBeCalledWith(
      useCasePayload.productId,
      useCasePayload.userId
    );
    expect(mockProductRepository.deleteProduct).toBeCalledWith(
      useCasePayload.productId
    );
  });
});
