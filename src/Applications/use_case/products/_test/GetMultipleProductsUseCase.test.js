const ProductDetail = require("../../../../Domains/products/entities/ProductDetail");
const ProductRepository = require("../../../../Domains/products/ProductRepository");
const GetMultipleProductsUseCase = require("../GetMultipleProductsUseCase");

describe("GetMultipleProductsUseCase", () => {
  it("should orchestrate the get multiple products by category action correctly", async () => {
    // Arrange
    const useCasePayload = {
      category: "man",
      sortNew: true,
    };

    const expectedProductsByCategory = [
      new ProductDetail({
        id: "123",
        title: "abc",
        desc: "abc",
        img: "abc",
        categories: ["t-shirt", "man"],
        price: 90,
        discount: 0.05,
        cashback: true,
        createdAt: "2021-08-08T07:19:09.660Z",
        sellerId: "user-123",
      }),
      new ProductDetail({
        id: "123",
        title: "abcd",
        desc: "abcd",
        img: "abcd",
        categories: ["pants", "man"],
        price: 80,
        discount: 0.1,
        cashback: true,
        createdAt: "2021-08-09T07:19:09.775Z",
        sellerId: "user-123",
      }),
    ];

    const expectedSortedProductsByCategory = [
      new ProductDetail({
        id: "123",
        title: "abcd",
        desc: "abcd",
        img: "abcd",
        categories: ["pants", "man"],
        price: 80,
        discount: 0.1,
        cashback: true,
        createdAt: "2021-08-09T07:19:09.775Z",
        sellerId: "user-123",
      }),
      new ProductDetail({
        id: "123",
        title: "abc",
        desc: "abc",
        img: "abc",
        categories: ["t-shirt", "man"],
        price: 90,
        discount: 0.05,
        cashback: true,
        createdAt: "2021-08-08T07:19:09.660Z",
        sellerId: "user-123",
      }),
    ];

    /** creating dependency of use case */
    const mockProductRepository = new ProductRepository();

    /** mocking needed function */
    mockProductRepository.getProductsByCategory = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedProductsByCategory));

    /** creating use case instance */
    const getGetMultipleProductsUseCase = new GetMultipleProductsUseCase({
      productRepository: mockProductRepository,
    });

    // Action
    const products = await getGetMultipleProductsUseCase.execute(
      useCasePayload
    );

    // Assert
    expect(products).toStrictEqual(expectedSortedProductsByCategory);
    expect(mockProductRepository.getProductsByCategory).toBeCalledWith(
      useCasePayload.category
    );
  });

  it("should orchestratethe get all products action correctly", async () => {
    // Arrange
    const useCasePayload = {};

    const expectedProducts = [
      new ProductDetail({
        id: "123",
        title: "abc",
        desc: "abc",
        img: "abc",
        categories: ["t-shirt", "man"],
        price: 90,
        discount: 0.05,
        cashback: true,
        createdAt: "2021-08-08T07:19:09.660Z",
        sellerId: "user-123",
      }),
      new ProductDetail({
        id: "123",
        title: "abcd",
        desc: "abcd",
        img: "abcd",
        categories: ["pants", "man"],
        price: 80,
        discount: 0.1,
        cashback: true,
        createdAt: "2021-08-09T07:19:09.775Z",
        sellerId: "user-123",
      }),
      new ProductDetail({
        id: "123",
        title: "abcde",
        desc: "abcde",
        img: "abcde",
        categories: ["Harddisk"],
        price: 60,
        discount: 0,
        cashback: true,
        createdAt: "2021-08-10T07:19:09.775Z",
        sellerId: "user-123",
      }),
    ];

    /** creating dependency of use case */
    const mockProductRepository = new ProductRepository();

    /** mocking needed function */
    mockProductRepository.getAllProducts = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedProducts));

    /** creating use case instance */
    const getGetMultipleProductsUseCase = new GetMultipleProductsUseCase({
      productRepository: mockProductRepository,
    });

    // Action
    const products = await getGetMultipleProductsUseCase.execute(
      useCasePayload
    );

    // Assert
    expect(products).toStrictEqual(expectedProducts);
    expect(mockProductRepository.getAllProducts).toBeCalled();
  });
});
