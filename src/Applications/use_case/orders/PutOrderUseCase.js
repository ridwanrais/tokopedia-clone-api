const PutOrder = require("../../../Domains/orders/entities/PutOrder");

class PutOrderUseCase {
  constructor({ orderRepository }) {
    this._orderRepository = orderRepository;
  }

  async execute(useCasePayload) {
    const { userId, orderId } = useCasePayload;
    await this._orderRepository.verifyOrderOwner(orderId, userId);
    return this._orderRepository.putOrder(new PutOrder({ ...useCasePayload }));
  }
}

module.exports = PutOrderUseCase;
