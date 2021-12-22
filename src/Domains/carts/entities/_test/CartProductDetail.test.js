const CartProductDetail = require("../CartProductDetail");

describe("a CartProductDetail entities", () => {
  it("should throw error when payload did not contain needed property or empty", () => {
    // Arrange
    const payload = {
      id: "123",
      img: "https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/6/4/2b70d389-f092-4439-9ae0-922f82d89974.jpg.webp?ect=4g",
      title: "EVGA RTX 3080Ti FTW3 ULTRA VGA RTX 3080Ti FTW3 ULTRA GAMING",
      price: 9900000,
      discount: 0,
    };

    // Action and Assert
    expect(() => new CartProductDetail(payload)).toThrowError(
      "CART_PRODUCT_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY"
    );
  });

  it("should throw error when payload did not meet data type specification", () => {
    // Arrange
    const payload = {
      id: "123",
      img: "https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/6/4/2b70d389-f092-4439-9ae0-922f82d89974.jpg.webp?ect=4g",
      title: "EVGA RTX 3080Ti FTW3 ULTRA VGA RTX 3080Ti FTW3 ULTRA GAMING",
      price: "9900000",
      discount: 0,
      quantity: 2,
    };

    // Action and Assert
    expect(() => new CartProductDetail(payload)).toThrowError(
      "CART_PRODUCT_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION"
    );
  });

  it("should create CartProductDetail object correctly", () => {
    // Arrange
    const payload = {
      id: "123",
      img: "https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/6/4/2b70d389-f092-4439-9ae0-922f82d89974.jpg.webp?ect=4g",
      title: "EVGA RTX 3080Ti FTW3 ULTRA VGA RTX 3080Ti FTW3 ULTRA GAMING",
      price: 9900000,
      discount: 0,
      quantity: 2,
    };

    // Action
    const { id, img, title, price, discount, quantity } = new CartProductDetail(
      payload
    );

    // Assert
    expect(id).toEqual(payload.id);
    expect(img).toEqual(payload.img);
    expect(title).toEqual(payload.title);
    expect(price).toEqual(payload.price);
    expect(discount).toEqual(payload.discount);
    expect(quantity).toEqual(payload.quantity);
  });
});
