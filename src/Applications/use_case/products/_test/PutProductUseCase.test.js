const ProductDetail = require("../../../../Domains/products/entities/ProductDetail");
const PutProduct = require("../../../../Domains/products/entities/PutProduct");
const ProductRepository = require("../../../../Domains/products/ProductRepository");
const PutProductUseCase = require("../PutProductUseCase");

describe("PutProductUseCase", () => {
  it("should orchestrating the put product action correctly", async () => {
    // Arrange
    const useCasePayload = {
      sellerId: "user-123",
      productId: "product-123",
      title: "xyz",
      rating: 5,
      sold: 1,
    };

    const oldProductDetail = new ProductDetail({
      id: "product-123",
      title: "abc",
      desc: "abc",
      img: "abc",
      categories: ["t-shirt", "man"],
      price: 90,
      discount: 0.05,
      cashback: true,
      createdAt: "2021-08-08T07:19:09.775Z",
      sellerId: "user-123",
    });

    const expectedUpdatedProductDetail = new ProductDetail({
      id: "product-123",
      title: "xyz",
      desc: "abc",
      img: "abc",
      categories: ["t-shirt", "man"],
      price: 90,
      discount: 0.05,
      cashback: true,
      createdAt: "2021-08-08T07:19:09.775Z",
      sellerId: "user-123",
    });

    /** creating dependency of use case */
    const mockProductRepository = new ProductRepository();

    /** mocking needed function */
    mockProductRepository.verifyProductOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockProductRepository.getProduct = jest
      .fn()
      .mockImplementation(() => Promise.resolve(oldProductDetail));
    mockProductRepository.putProduct = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedUpdatedProductDetail));

    /** creating use case instance */
    const getPutProductUseCase = new PutProductUseCase({
      productRepository: mockProductRepository,
    });

    // Action
    const updatedProductDetail = await getPutProductUseCase.execute(
      useCasePayload
    );

    // Assert
    expect(updatedProductDetail).toStrictEqual(expectedUpdatedProductDetail);
    expect(mockProductRepository.verifyProductOwner).toBeCalledWith(
      useCasePayload.productId,
      useCasePayload.sellerId
    );
    expect(mockProductRepository.getProduct).toBeCalledWith("product-123");
    expect(mockProductRepository.putProduct).toBeCalledWith(
      new PutProduct({
        sellerId: "user-123",
        productId: "product-123",
        title: "xyz",
        desc: "abc",
        img: "abc",
        categories: ["t-shirt", "man"],
        price: 90,
        discount: 0.05,
        cashback: true,
        rating: 5,
        sold: 1,
      })
    );
  });
});
