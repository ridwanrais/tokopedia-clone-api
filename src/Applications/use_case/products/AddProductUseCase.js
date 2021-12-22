const AddProduct = require("../../../Domains/products/entities/AddProduct");

class AddProductUseCase {
  constructor({ productRepository }) {
    this._productRepository = productRepository;
  }

  async execute(useCasePayload) {
    const addProduct = new AddProduct(useCasePayload);
    return this._productRepository.addProduct(addProduct);
  }
}

module.exports = AddProductUseCase;
