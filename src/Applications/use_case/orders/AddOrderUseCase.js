const AddOrder = require("../../../Domains/orders/entities/AddOrder");

class AddOrderUseCase {
  constructor({ orderRepository }) {
    this._orderRepository = orderRepository;
  }

  async execute(useCasePayload) {
    const addOrder = new AddOrder(useCasePayload);
    return this._orderRepository.addOrder(addOrder);
  }
}

module.exports = AddOrderUseCase;
