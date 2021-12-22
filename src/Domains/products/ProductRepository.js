class ProductRepository {
  async addProduct(addProduct) {
    throw new Error("PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getProduct(productId) {
    throw new Error("PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getAllProducts() {
    throw new Error("PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getProductsByCategory(category) {
    throw new Error("PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getProductsByProductIds(category) {
    throw new Error("PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async putProduct(productId) {
    throw new Error("PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyProductExistence(productId) {
    throw new Error("PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyProductOwner(productId) {
    throw new Error("PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async deleteProduct(productId) {
    throw new Error("PRODUCT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = ProductRepository;
