const ProductRepository = require("../ProductRepository");

describe("ProductRepository interface", () => {
  it("should throw error when invoke abstract behavior", async () => {
    // Arrange
    const productRepository = new ProductRepository();

    // Action and Assert
    await expect(productRepository.addProduct({}, {})).rejects.toThrowError(
      "PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(productRepository.getProduct({})).rejects.toThrowError(
      "PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(productRepository.getAllProducts({})).rejects.toThrowError(
      "PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(
      productRepository.getProductsByCategory({})
    ).rejects.toThrowError("PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(
      productRepository.getProductsByProductIds({})
    ).rejects.toThrowError("PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(productRepository.putProduct({})).rejects.toThrowError(
      "PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(
      productRepository.verifyProductExistence({})
    ).rejects.toThrowError("PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(productRepository.verifyProductOwner({})).rejects.toThrowError(
      "PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
    await expect(productRepository.deleteProduct({})).rejects.toThrowError(
      "PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED"
    );
  });
});
