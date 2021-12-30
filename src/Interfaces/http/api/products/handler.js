const AddProductUseCase = require("../../../../Applications/use_case/products/AddProductUseCase");
const PutProductUseCase = require("../../../../Applications/use_case/products/PutProductUseCase");
const DeleteProductUseCase = require("../../../../Applications/use_case/products/DeleteProductUseCase");
const GetProductUseCase = require("../../../../Applications/use_case/products/GetProductUseCase");
const GetMultipleProductsUseCase = require("../../../../Applications/use_case/products/GetMultipleProductsUseCase");

class ProductsHandler {
  constructor(container) {
    this._container = container;

    this.postProductHandler = this.postProductHandler.bind(this);
    this.putProductHandler = this.putProductHandler.bind(this);
    this.deleteProductHandler = this.deleteProductHandler.bind(this);
    this.getProductHandler = this.getProductHandler.bind(this);
    this.getMultipleProductsHandler =
      this.getMultipleProductsHandler.bind(this);
  }

  async postProductHandler(request, h) {
    const addProductUseCase = this._container.getInstance(
      AddProductUseCase.name
    );

    const sellerId = request.auth.credentials.id;

    const addedProduct = await addProductUseCase.execute({
      ...request.payload,
      sellerId,
    });

    const response = h.response({
      status: "success",
      data: {
        addedProduct,
      },
    });
    response.code(201);
    return response;
  }

  async putProductHandler(request, h) {
    const putProductUseCase = this._container.getInstance(
      PutProductUseCase.name
    );

    const { productId } = request.params;
    const sellerId = request.auth.credentials.id;

    const updatedProduct = await putProductUseCase.execute({
      ...request.payload,
      productId,
      sellerId,
    });

    const response = h.response({
      status: "success",
      data: {
        updatedProduct,
      },
    });
    response.code(201);
    return response;
  }

  async deleteProductHandler(request) {
    const deleteProductUseCase = this._container.getInstance(
      DeleteProductUseCase.name
    );

    const { productId } = request.params;
    const userId = request.auth.credentials.id;

    await deleteProductUseCase.execute({ productId, userId });

    return {
      status: "success",
    };
  }

  async getProductHandler(request) {
    const getProductUseCase = this._container.getInstance(
      GetProductUseCase.name
    );

    const { productId } = request.params;

    const product = await getProductUseCase.execute({ productId });

    return {
      status: "success",
      data: {
        product,
      },
    };
  }

  async getMultipleProductsHandler(request) {
    const getMultipleProductsUseCase = this._container.getInstance(
      GetMultipleProductsUseCase.name
    );

    const { category, sortNew } = request.query;

    const products = await getMultipleProductsUseCase.execute({
      category,
      sortNew,
    });

    return {
      status: "success",
      data: {
        products,
      },
    };
  }
}

module.exports = ProductsHandler;
