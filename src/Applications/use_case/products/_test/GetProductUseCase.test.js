const ProductDetail = require("../../../../Domains/products/entities/ProductDetail");
const ProductRepository = require("../../../../Domains/products/ProductRepository");
const GetProductUseCase = require("../GetProductUseCase");

describe("GetProductUseCase", () => {
  it("should orchestrating the get product action correctly", async () => {
    // Arrange
    const useCasePayload = {
      productId: "product-123",
    };

    const expectedProductDetail = new ProductDetail({
      id: "123",
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

    /** creating dependency of use case */
    const mockProductRepository = new ProductRepository();

    /** mocking needed function */
    mockProductRepository.getProduct = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedProductDetail));

    /** creating use case instance */
    const getGetProductUseCase = new GetProductUseCase({
      productRepository: mockProductRepository,
    });

    // Action
    const productDetail = await getGetProductUseCase.execute(useCasePayload);

    // Assert
    expect(productDetail).toStrictEqual(expectedProductDetail);
    expect(mockProductRepository.getProduct).toBeCalledWith(
      useCasePayload.productId
    );
  });
});
