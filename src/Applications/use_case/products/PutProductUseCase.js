const PutProduct = require("../../../Domains/products/entities/PutProduct");

class PutProductUseCase {
  constructor({ productRepository }) {
    this._productRepository = productRepository;
  }

  async execute(useCasePayload) {
    const { sellerId, productId } = useCasePayload;
    await this._productRepository.verifyProductOwner(productId, sellerId);

    // const putProduct = new PutProduct(useCasePayload);
    const oldProduct = await this._productRepository.getProduct(productId);

    const newProduct = this.mergeProducts(oldProduct, useCasePayload);

    return this._productRepository.putProduct(newProduct);
  }

  mergeProducts(oldProduct, useCasePayload) {
    // for (const prop in useCasePayload) {
    //   if (useCasePayload[prop] === undefined) {
    //     delete useCasePayload[prop];
    //   }
    // }

    Object.assign(oldProduct, useCasePayload);

    return new PutProduct({ ...oldProduct });
  }
}

module.exports = PutProductUseCase;
