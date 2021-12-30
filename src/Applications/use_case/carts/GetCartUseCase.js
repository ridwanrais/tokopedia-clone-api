const CartSellerDetail = require("../../../Domains/carts/entities/CartSellerDetail");
const CartProductDetail = require("../../../Domains/carts/entities/CartProductDetail");

class GetCartUseCase {
  constructor({ cartRepository, userRepository, productRepository }) {
    this._cartRepository = cartRepository;
    this._userRepository = userRepository;
    this._productRepository = productRepository;
  }

  async execute(useCasePayload) {
    const { userId, cartId } = useCasePayload;
    await this._cartRepository.verifyCartExistence(cartId);
    await this._cartRepository.verifyCartOwner(cartId, userId);
    const cart = await this._cartRepository.getCart(cartId);

    const productIds = cart.products.map((product) => product.productId);
    const cartProducts = await this._productRepository.getProductsByProductIds(
      productIds
    );

    cartProducts.forEach((cartProduct) => {
      cartProduct.quantity = this.getCartProductQuantity(cart, cartProduct._id);
    });

    const rawSellerIds = cartProducts.map((product) => product.sellerId);
    const sellerIds = [...new Set(rawSellerIds)];
    const cartSellers = await this._userRepository.getUsersByIds(sellerIds);

    return cartSellers.map(
      (cartSeller) =>
        new CartSellerDetail({
          id: cartSeller._id,
          sellerName: cartSeller.username,
          sellerAddress: cartSeller.address,
          ...cartSeller,
          products: this.getCartSellerProducts(cartProducts, cartSeller._id),
        })
    );
  }

  getCartSellerProducts(cartProducts, sellerId) {
    return cartProducts
      .filter((product) => product.sellerId === sellerId)
      .map(
        (cartProduct) =>
          new CartProductDetail({
            id: cartProduct._id,
            ...cartProduct,
          })
      );
  }

  getCartProductQuantity(cart, productId) {
    const product = cart.products.find(
      (product) => product.productId === productId
    );

    return product.quantity;
  }
}

module.exports = GetCartUseCase;
