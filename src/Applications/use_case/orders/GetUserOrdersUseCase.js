class GetUserOrdersUseCase {
  constructor({ orderRepository }) {
    this._orderRepository = orderRepository;
  }

  async execute(useCasePayload) {
    const { userId } = useCasePayload;
    return this._orderRepository.getUserOrders(userId);
  }
}

module.exports = GetUserOrdersUseCase;
