class DeleteOrderUseCase {
  constructor({ orderRepository }) {
    this._orderRepository = orderRepository;
  }

  async execute(useCasePayload) {
    const { userId, orderId } = useCasePayload;
    await this._orderRepository.verifyOrderExistence(orderId);
    await this._orderRepository.verifyOrderOwner(orderId, userId);
    await this._orderRepository.deleteOrder(orderId);
  }
}

module.exports = DeleteOrderUseCase;
