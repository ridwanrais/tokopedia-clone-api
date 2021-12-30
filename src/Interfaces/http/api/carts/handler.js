const AddCartUseCase = require("../../../../Applications/use_case/carts/AddCartUseCase");
const PutCartUseCase = require("../../../../Applications/use_case/carts/PutCartUseCase");
const DeleteCartUseCase = require("../../../../Applications/use_case/carts/DeleteCartUseCase");
const GetCartUseCase = require("../../../../Applications/use_case/carts/GetCartUseCase");

class CartsHandler {
  constructor(container) {
    this._container = container;

    this.postCartHandler = this.postCartHandler.bind(this);
    this.putCartHandler = this.putCartHandler.bind(this);
    this.deleteCartHandler = this.deleteCartHandler.bind(this);
    this.getCartHandler = this.getCartHandler.bind(this);
  }

  async postCartHandler(request, h) {
    const addCartUseCase = this._container.getInstance(AddCartUseCase.name);

    const userId = request.auth.credentials.id;

    const addedCart = await addCartUseCase.execute({
      ...request.payload,
      userId,
    });

    const response = h.response({
      status: "success",
      data: {
        addedCart,
      },
    });
    response.code(201);
    return response;
  }

  async putCartHandler(request, h) {
    const putCartUseCase = this._container.getInstance(PutCartUseCase.name);

    const { cartId } = request.params;
    const userId = request.auth.credentials.id;

    const updatedCart = await putCartUseCase.execute({
      ...request.payload,
      cartId,
      userId,
    });

    const response = h.response({
      status: "success",
      data: {
        updatedCart,
      },
    });
    response.code(201);
    return response;
  }

  async deleteCartHandler(request) {
    const deleteCartUseCase = this._container.getInstance(
      DeleteCartUseCase.name
    );

    const { cartId } = request.params;
    const userId = request.auth.credentials.id;

    await deleteCartUseCase.execute({ cartId, userId });

    return {
      status: "success",
    };
  }

  async getCartHandler(request) {
    const getCartUseCase = this._container.getInstance(GetCartUseCase.name);

    const userId = request.auth.credentials.id;
    const { cartId } = request.params;

    const cart = await getCartUseCase.execute({ userId, cartId });

    return {
      status: "success",
      data: {
        cart,
      },
    };
  }
}

module.exports = CartsHandler;
