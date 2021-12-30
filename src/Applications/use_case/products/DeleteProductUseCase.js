class DeleteProductUseCase {
  constructor({ productRepository }) {
    this._productRepository = productRepository;
  }

  async execute(useCasePayload) {
    const { userId, productId } = useCasePayload;
    await this._productRepository.verifyProductExistence(productId);
    await this._productRepository.verifyProductOwner(productId, userId);
    await this._productRepository.deleteProduct(productId);
  }
}

module.exports = DeleteProductUseCase;
