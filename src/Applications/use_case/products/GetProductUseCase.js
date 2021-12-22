class GetProductUseCase {
  constructor({ productRepository }) {
    this._productRepository = productRepository;
  }

  async execute(useCasePayload) {
    const { productId } = useCasePayload;
    return this._productRepository.getProduct(productId);
  }
}

module.exports = GetProductUseCase;
