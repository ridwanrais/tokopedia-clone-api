const AddCart = require("../../../Domains/carts/entities/AddCart");

class AddCartUseCase {
  constructor({ cartRepository }) {
    this._cartRepository = cartRepository;
  }

  async execute(useCasePayload) {
    const addCart = new AddCart(useCasePayload);
    return this._cartRepository.addCart(addCart);
  }
}

module.exports = AddCartUseCase;
