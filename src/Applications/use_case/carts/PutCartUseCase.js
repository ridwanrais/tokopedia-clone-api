const PutCart = require("../../../Domains/carts/entities/PutCart");

class PutCartUseCase {
  constructor({ cartRepository }) {
    this._cartRepository = cartRepository;
  }

  async execute(useCasePayload) {
    const { userId, cartId } = useCasePayload;
    await this._cartRepository.verifyCartOwner(cartId, userId);

    const putCart = new PutCart({ ...useCasePayload });
    return this._cartRepository.putCart(putCart);
  }
}

module.exports = PutCartUseCase;
