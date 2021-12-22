class GetMultipleProductsUseCase {
  constructor({ productRepository }) {
    this._productRepository = productRepository;
  }

  async execute(useCasePayload) {
    const { category, sortNew } = useCasePayload;

    let products;
    if (category) {
      products = await this._productRepository.getProductsByCategory(category);
    } else {
      products = await this._productRepository.getAllProducts();
    }

    if (sortNew) {
      return this.sortByDate(products);
    } else {
      return products;
    }
  }

  sortByDate(products) {
    return products.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }
}

module.exports = GetMultipleProductsUseCase;
