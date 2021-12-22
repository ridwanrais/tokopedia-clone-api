const CartSellerDetail = require("../CartSellerDetail");

describe("a CartSellerDetail entities", () => {
  it("should throw error when payload did not contain needed property or empty", () => {
    // Arrange
    const payload = {
      id: "123",
      sellerName: "AnerStore",
      merchantLevel:
        "https://images.tokopedia.net/img/goldmerchant/pm_activation/badge/Power%20Merchant%20Pro.png",
      sellerAddress: "Jakarta Barat",
    };

    // Action and Assert
    expect(() => new CartSellerDetail(payload)).toThrowError(
      "CART_SELLER_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: "123",
      sellerName: "AnerStore",
      merchantLevel:
        "https://images.tokopedia.net/img/goldmerchant/pm_activation/badge/Power%20Merchant%20Pro.png",
      sellerAddress: "Jakarta Barat",
      products: "abc",
    };

    // Action and Assert
    expect(() => new CartSellerDetail(payload)).toThrowError(
      "CART_SELLER_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create CartSellerDetail object correctly", () => {
    // Arrange
    const payload = {
      id: "123",
      sellerName: "AnerStore",
      merchantLevel:
        "https://images.tokopedia.net/img/goldmerchant/pm_activation/badge/Power%20Merchant%20Pro.png",
      sellerAddress: "Jakarta Barat",
      products: [],
    };

    // Action
    const { id, sellerName, merchantLevel, sellerAddress, products } =
      new CartSellerDetail(payload);

    // Assert
    expect(id).toEqual(payload.id);
    expect(sellerName).toEqual(payload.sellerName);
    expect(merchantLevel).toEqual(payload.merchantLevel);
    expect(sellerAddress).toEqual(payload.sellerAddress);
    expect(products).toEqual(payload.products);
  });
});
