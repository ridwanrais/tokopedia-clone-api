const AddOrderUseCase = require("../../../../Applications/use_case/orders/AddOrderUseCase");
const PutOrderUseCase = require("../../../../Applications/use_case/orders/PutOrderUseCase");
const DeleteOrderUseCase = require("../../../../Applications/use_case/orders/DeleteOrderUseCase");
const GetUserOrdersUseCase = require("../../../../Applications/use_case/orders/GetUserOrdersUseCase");

class OrdersHandler {
  constructor(container) {
    this._container = container;

    this.postOrderHandler = this.postOrderHandler.bind(this);
    this.putOrderHandler = this.putOrderHandler.bind(this);
    this.deleteOrderHandler = this.deleteOrderHandler.bind(this);
    this.getUserOrdersHandler = this.getUserOrdersHandler.bind(this);
  }

  async postOrderHandler(request, h) {
    const addOrderUseCase = this._container.getInstance(AddOrderUseCase.name);

    const userId = request.auth.credentials.id;

    const addedOrder = await addOrderUseCase.execute({
      ...request.payload,
      userId,
    });

    const response = h.response({
      status: "success",
      data: {
        addedOrder,
      },
    });
    response.code(201);
    return response;
  }

  async putOrderHandler(request, h) {
    const putOrderUseCase = this._container.getInstance(PutOrderUseCase.name);

    const { orderId } = request.params;
    const userId = request.auth.credentials.id;

    const updatedOrder = await putOrderUseCase.execute({
      ...request.payload,
      orderId,
      userId,
    });

    const response = h.response({
      status: "success",
      data: {
        updatedOrder,
      },
    });
    response.code(201);
    return response;
  }

  async deleteOrderHandler(request) {
    const deleteOrderUseCase = this._container.getInstance(
      DeleteOrderUseCase.name
    );

    const { orderId } = request.params;
    const userId = request.auth.credentials.id;

    await deleteOrderUseCase.execute({ orderId, userId });

    return {
      status: "success",
    };
  }

  async getUserOrdersHandler(request) {
    const getUserOrdersUseCase = this._container.getInstance(
      GetUserOrdersUseCase.name
    );

    const userId = request.auth.credentials.id;
    const { orderId } = request.params;

    const orders = await getUserOrdersUseCase.execute({ userId, orderId });

    return {
      status: "success",
      data: {
        orders,
      },
    };
  }
}

module.exports = OrdersHandler;
