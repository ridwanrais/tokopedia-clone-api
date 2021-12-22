class PutProductUseCase {
  constructor({ productRepository }) {
    this._productRepository = productRepository;
  }

  async execute(useCasePayload) {
    const { userId, productId } = useCasePayload;
    await this._productRepository.verifyProductOwner(productId, userId);
    return this._productRepository.putProduct(useCasePayload);
  }
}

module.exports = PutProductUseCase;
