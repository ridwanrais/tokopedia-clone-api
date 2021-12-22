const CartSellerDetail = require("../../../../Domains/carts/entities/CartSellerDetail");
const CartProductDetail = require("../../../../Domains/carts/entities/CartProductDetail");
const CartRepository = require("../../../../Domains/carts/CartRepository");
const UserRepository = require("../../../../Domains/users/UserRepository");
const ProductRepository = require("../../../../Domains/products/ProductRepository");
const GetCartUseCase = require("../GetCartUseCase");
const Cart = require("../../../../../models/Cart");

describe("GetCartUseCase", () => {
  it("should orchestrating the get cart action correctly", async () => {
    // Arrange
    const useCasePayload = {
      userId: "user-123",
      cartId: "cart-123",
    };

    expectedCart = new Cart({
      userId: "user-123",
      products: [
        { productId: "product-123", quantity: 2 },
        { productId: "product-456", quantity: 1 },
        { productId: "product-789", quantity: 1 },
      ],
    });

    const product1 = {
      id: "product-123",
      img: "https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/6/4/2b70d389-f092-4439-9ae0-922f82d89974.jpg.webp?ect=4g",
      title: "EVGA RTX 3080Ti FTW3 ULTRA VGA RTX 3080Ti FTW3 ULTRA GAMING",
      price: 9900000,
      discount: 0,
      sellerId: "user-456",
    };

    const product2 = {
      id: "product-456",
      img: "https://images.tokopedia.net/img/cache/200-square/VqbcmM/2021/7/22/a707cca9-da2a-4c8b-8156-8eaf785b09c5.jpg.webp?ect=4g",
      title:
        'ASUS ROG Flow X13 GV301QE R9-5900HS 16GB 1TB RTX 3050Ti 13.4" W10 OHS',
      price: 8499000,
      discount: 0.05,
      sellerId: "user-456",
    };

    const product3 = {
      id: "product-789",
      img: "https://images.tokopedia.net/img/cache/200-square/product-1/2020/1/3/5373285/5373285_0f8a708c-4e75-4f49-8ee5-844e0336a92d_800_800.webp?ect=4g",
      title:
        "Memory G.SKILL - F4-3600C19D-16GTZRB Trident Z RGB 2x8GB DDR4 3600",
      price: 1499000,
      discount: 0,
      sellerId: "user-789",
    };

    const seller1 = {
      id: "user-456",
      sellerName: "AnerStore",
      merchantLevel:
        "https://images.tokopedia.net/img/goldmerchant/pm_activation/badge/Power%20Merchant%20Pro.png",
      sellerAddress: "Jakarta Barat",
    };

    const seller2 = {
      id: "user-789",
      sellerName: "IT-SHOP-ONLINE",
      merchantLevel:
        "https://images.tokopedia.net/img/goldmerchant/pm_activation/badge/Power%20Merchant%20Pro.png",
      sellerAddress: "Kota Surabaya",
    };

    const expectedCartProductDetail1 = new CartProductDetail({
      ...product1,
      quantity: 2,
    });

    const expectedCartProductDetail2 = new CartProductDetail({
      ...product2,
      quantity: 1,
    });

    const expectedCartProductDetail3 = new CartProductDetail({
      ...product3,
      quantity: 1,
    });

    const expectedCartSellerDetail1 = new CartSellerDetail({
      ...seller1,
      products: [],
    });

    const expectedCartSellerDetail2 = new CartSellerDetail({
      ...seller2,
      products: [],
    });

    const expectedCartDetail = [
      new CartSellerDetail({
        ...seller1,
        products: [expectedCartProductDetail1, expectedCartProductDetail2],
      }),
      new CartSellerDetail({
        ...seller2,
        products: [expectedCartProductDetail3],
      }),
    ];

    /** creating dependency of use case */
    const mockCartRepository = new CartRepository();
    const mockUserRepository = new UserRepository();
    const mockProductRepository = new ProductRepository();

    /** mocking needed function */
    mockCartRepository.verifyCartOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCartRepository.getCart = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedCart));
    mockProductRepository.getProductsByProductIds = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve([product1, product2, product3])
      );
    mockUserRepository.getUsersByIds = jest
      .fn()
      .mockImplementation(() => Promise.resolve([seller1, seller2]));

    /** creating use case instance */
    const getGetCartUseCase = new GetCartUseCase({
      cartRepository: mockCartRepository,
      userRepository: mockUserRepository,
      productRepository: mockProductRepository,
    });

    // Action
    const cartDetail = await getGetCartUseCase.execute(useCasePayload);

    // Assert
    expect(mockCartRepository.verifyCartOwner).toBeCalledWith(
      useCasePayload.cartId,
      useCasePayload.userId
    );
    expect(cartDetail).toStrictEqual(expectedCartDetail);
    expect(mockCartRepository.getCart).toBeCalledWith(useCasePayload.cartId);
    expect(mockProductRepository.getProductsByProductIds).toBeCalledWith([
      "product-123",
      "product-456",
      "product-789",
    ]);
    expect(mockUserRepository.getUsersByIds).toBeCalledWith([
      "user-456",
      "user-789",
    ]);
  });
});
