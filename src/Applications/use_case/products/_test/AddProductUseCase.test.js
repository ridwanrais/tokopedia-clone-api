const AddProduct = require("../../../../Domains/products/entities/AddProduct");
const AddedProduct = require("../../../../Domains/products/entities/AddedProduct");
const ProductRepository = require("../../../../Domains/products/ProductRepository");
const AddProductUseCase = require("../AddProductUseCase");

describe("AddProductUseCase", () => {
  it("should orchestrating the add product action correctly", async () => {
    // Arrange
    const useCasePayload = {
      title: "abc",
      desc: "abc",
      img: "abc",
      categories: ["t-shirt", "man"],
      price: 90,
      discount: 0.05,
      cashback: true,
      sellerId: "user-123",
    };
    const expectedAddedProduct = new AddedProduct({
      id: "product-123",
      title: useCasePayload.title,
      sellerId: useCasePayload.sellerId,
    });

    /** creating dependency of use case */
    const mockProductRepository = new ProductRepository();

    /** mocking needed function */
    mockProductRepository.addProduct = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedAddedProduct));

    /** creating use case instance */
    const getAddProductUseCase = new AddProductUseCase({
      productRepository: mockProductRepository,
    });

    // Action
    const addedProduct = await getAddProductUseCase.execute(useCasePayload);

    // Assert
    expect(addedProduct).toStrictEqual(expectedAddedProduct);
    expect(mockProductRepository.addProduct).toBeCalledWith(
      new AddProduct({
        title: useCasePayload.title,
        desc: useCasePayload.desc,
        img: useCasePayload.img,
        categories: useCasePayload.categories,
        price: useCasePayload.price,
        discount: useCasePayload.discount,
        cashback: useCasePayload.cashback,
        createdAt: "2021-08-08T07:19:09.775Z",
        sellerId: useCasePayload.sellerId,
      })
    );
  });
});
