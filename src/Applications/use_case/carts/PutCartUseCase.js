class PutCartUseCase {
  constructor({ cartRepository }) {
    this._cartRepository = cartRepository;
  }

  async execute(useCasePayload) {
    const { userId, cartId } = useCasePayload;
    await this._cartRepository.verifyCartOwner(cartId, userId);
    await this._cartRepository.putCart(cartId);
  }
}

module.exports = PutCartUseCase;
