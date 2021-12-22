class PutOrderUseCase {
  constructor({ orderRepository }) {
    this._orderRepository = orderRepository;
  }

  async execute(useCasePayload) {
    const { userId, orderId } = useCasePayload;
    await this._orderRepository.verifyOrderOwner(orderId, userId);
    await this._orderRepository.putOrder(orderId);
  }
}

module.exports = PutOrderUseCase;
