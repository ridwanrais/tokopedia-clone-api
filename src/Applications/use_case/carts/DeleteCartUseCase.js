class DeleteCartUseCase {
  constructor({ cartRepository }) {
    this._cartRepository = cartRepository;
  }

  async execute(useCasePayload) {
    const { userId, cartId } = useCasePayload;
    await this._cartRepository.verifyCartExistence(cartId);
    await this._cartRepository.verifyCartOwner(cartId, userId);
    await this._cartRepository.deleteCart(cartId);
  }
}

module.exports = DeleteCartUseCase;
