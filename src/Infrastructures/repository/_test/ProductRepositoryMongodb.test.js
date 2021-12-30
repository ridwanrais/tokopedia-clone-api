const ProductsCollectionTestHelper = require("../../../../tests/ProductsCollectionTestHelper");
const UsersCollectionTestHelper = require("../../../../tests/UsersCollectionTestHelper");
const InvariantError = require("../../../Commons/exceptions/InvariantError");
const AuthorizationError = require("../../../Commons/exceptions/AuthorizationError");
const NotFoundError = require("../../../Commons/exceptions/NotFoundError");
const AddProduct = require("../../../Domains/products/entities/AddProduct");
const PutProduct = require("../../../Domains/products/entities/PutProduct");
const AddedProduct = require("../../../Domains/products/entities/AddedProduct");
const db = require("../../database/mongodb/db");
const ProductRepositoryMongodb = require("../ProductRepositoryMongodb");

describe("ProductRepositoryMongodb", () => {
  let collection;
  let userCollection;

  beforeAll(async () => {
    collection = db.collection("products");
    userCollection = db.collection("users");
  });

  afterEach(async () => {
    await db.collection("products").deleteMany({});
    await db.collection("users").deleteMany({});
  });

  afterAll(async () => {
    await db.closeConnection();
  });

  describe("addProduct function", () => {
    it("should persist add product", async () => {
      // Arrange
      const addProduct = new AddProduct({
        title: "xyz",
        desc: "xyz",
        img: "xyz",
        categories: ["t-shirt"],
        price: 100,
        discount: 0,
        cashback: false,
        sellerId: "user-123",
      });
      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);

      // Action
      await productRepositoryMongodb.addProduct(addProduct);

      // Assert
      const product = await collection.findOne({
        title: "xyz",
      });
      expect(product).toMatchObject(addProduct);
    });

    it("should return added product correctly", async () => {
      // Arrange
      const addProduct = new AddProduct({
        title: "xyz",
        desc: "xyz",
        img: "xyz",
        categories: ["t-shirt"],
        price: 100,
        sellerId: "user-123",
      });
      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);
      // Action
      const addedProduct = await productRepositoryMongodb.addProduct(
        addProduct
      );

      // Assert
      expect(addedProduct).toBeInstanceOf(AddedProduct);
      expect(addedProduct.productname).toEqual(addProduct.productname);
      expect(addedProduct.fullname).toEqual(addProduct.fullname);
      expect(addedProduct.email).toEqual(addProduct.email);
    });
  });

  describe("getProduct", () => {
    it("should throw InvariantError when product not found", async () => {
      // Arrange
      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        productRepositoryMongodb.getProduct("wrongId")
      ).rejects.toThrowError(NotFoundError);
    });

    it("should return product when productId is found", async () => {
      // Arrange
      const expectedProduct =
        await ProductsCollectionTestHelper.getProductModel({});
      // const result = await collection.insertOne(expectedProduct);
      // const id = result.insertedId.toString();
      const idObj = await ProductsCollectionTestHelper.addProduct({});
      const id = idObj.toString();
      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);

      // Action & Assert
      const product = await productRepositoryMongodb.getProduct(id);
      expect(product.title).toEqual(expectedProduct.title);
      expect(product.desc).toEqual(expectedProduct.desc);
      expect(product.img).toEqual(expectedProduct.img);
      expect(product.price).toEqual(expectedProduct.price);
      expect(product.sellerId).toEqual(expectedProduct.sellerId);
    });
  });

  describe("getAllProducts", () => {
    it("should throw InvariantError when product not found", () => {
      // Arrange
      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);

      // Action & Assert
      return expect(
        productRepositoryMongodb.getAllProducts()
      ).rejects.toThrowError(InvariantError);
    });

    it("should return products when products are found", async () => {
      // Arrange
      const product1 = await ProductsCollectionTestHelper.getProductModel({});
      const product2 = await ProductsCollectionTestHelper.getProductModel({});
      await collection.insertOne(product1);
      await collection.insertOne(product2);
      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);

      // Action & Assert
      const products = await productRepositoryMongodb.getAllProducts();
      expect(products).toHaveLength(2);
    });
  });

  describe("getProductsByCategory", () => {
    it("should throw InvariantError when product not found", () => {
      // Arrange
      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);

      // Action & Assert
      return expect(
        productRepositoryMongodb.getProductsByCategory("t-shirt")
      ).rejects.toThrowError(InvariantError);
    });

    it("should return products when products are found", async () => {
      // Arrange
      const product1 = await ProductsCollectionTestHelper.getProductModel({
        categories: ["pants"],
      });
      const product2 = await ProductsCollectionTestHelper.getProductModel({});
      await collection.insertOne(product1);
      await collection.insertOne(product2);
      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);

      // Action & Assert
      const products = await productRepositoryMongodb.getProductsByCategory(
        "pants"
      );
      expect(products).toHaveLength(1);
    });
  });

  describe("getProductsByProductIds", () => {
    it("should throw InvariantError when product not found", () => {
      // Arrange
      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);

      // Action & Assert
      return expect(
        productRepositoryMongodb.getProductsByProductIds(["user-123"])
      ).rejects.toThrowError(InvariantError);
    });

    it("should return products when products are found", async () => {
      // Arrange
      const product1 = await ProductsCollectionTestHelper.getProductModel({
        title: "abc",
      });
      const result1 = await collection.insertOne(product1);
      const id1 = result1.insertedId;

      const product2 = await ProductsCollectionTestHelper.getProductModel({
        title: "xyz",
      });
      const result2 = await collection.insertOne(product2);
      const id2 = result2.insertedId;

      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);

      // Action & Assert
      const products = await productRepositoryMongodb.getProductsByProductIds([
        id1,
        id2,
      ]);
      expect(products).toHaveLength(2);
    });
  });

  describe("putProduct function", () => {
    it("should persist put product", async () => {
      // Arrange
      const product = await ProductsCollectionTestHelper.getProductModel({
        title: "abc",
        desc: "abc",
        img: "abc",
        categories: ["t-shirt", "man"],
        price: 90,
        sellerId: "user-123",
      });
      const result = await collection.insertOne(product);
      const id = result.insertedId;

      const putProduct = new PutProduct({
        sellerId: "user-123",
        productId: id,
        title: "xyz",
        desc: "abc",
        img: "abc",
        categories: ["t-shirt", "man"],
        price: 90,
        discount: 0.05,
        rating: 4.9,
        cashback: true,
        sold: 1,
      });
      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);

      // Action
      await productRepositoryMongodb.putProduct(putProduct);

      // Assert
      const resultProduct = await collection.findOne({
        title: "xyz",
      });
      expect(resultProduct).toMatchObject(putProduct);
      expect(resultProduct._id.toString()).toStrictEqual(id);
    });

    it("should return updated product correctly", async () => {
      // Arrange
      const product = await ProductsCollectionTestHelper.getProductModel({
        title: "abc",
        desc: "abc",
        img: "abc",
        categories: ["t-shirt", "man"],
        price: 90,
        sellerId: "user-123",
      });
      const result = await collection.insertOne(product);
      const id = result.insertedId.toString();

      const putProduct = new PutProduct({
        sellerId: "user-123",
        productId: id,
        title: "xyz",
        desc: "abc",
        img: "abc",
        categories: ["t-shirt", "man"],
        price: 90,
        discount: 0.05,
        rating: 4.9,
        cashback: true,
        sold: 1,
      });
      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);

      // Action
      const updatedProduct = await productRepositoryMongodb.putProduct(
        putProduct
      );

      // Assert
      expect(updatedProduct).toMatchObject(putProduct);
      expect(updatedProduct._id.toString()).toStrictEqual(id);
    });
  });

  describe("verifyProductExistence function", () => {
    it("should throw NotFoundError when product not available", async () => {
      // Arrange
      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        productRepositoryMongodb.verifyProductExistence("test123")
      ).rejects.toThrowError(NotFoundError);
    });

    it("should not throw NotFoundError when product available", async () => {
      // Arrange
      const product = await ProductsCollectionTestHelper.getProductModel({
        productname: "test123",
      });
      await collection.insertOne(product); // memasukan product baru dengan productname test123
      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        productRepositoryMongodb.verifyProductExistence(product._id)
      ).resolves.not.toThrowError(NotFoundError);
    });
  });

  describe("verifyProductOwner function", () => {
    it("should throw AuthorizationError when user is not the product owner", async () => {
      // Arrange
      const user = await UsersCollectionTestHelper.getUserModel({
        username: "myUser",
      });
      await userCollection.insertOne(user);

      const product = await ProductsCollectionTestHelper.getProductModel({
        productname: "test123",
        sellerId: "wrongId",
      });
      await collection.insertOne(product);

      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        productRepositoryMongodb.verifyProductOwner(
          product._id.toString(),
          user._id.toString()
        )
      ).rejects.toThrowError(AuthorizationError);
    });

    it("should not throw AuthorizationError when user is the product owner", async () => {
      // Arrange
      const user = await UsersCollectionTestHelper.getUserModel({
        username: "myUser",
      });
      await userCollection.insertOne(user);

      const product = await ProductsCollectionTestHelper.getProductModel({
        productname: "test123",
        sellerId: user._id,
      });
      await collection.insertOne(product);

      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        productRepositoryMongodb.verifyProductOwner(
          product._id.toString(),
          user._id.toString()
        )
      ).resolves.not.toThrowError(AuthorizationError);
    });
  });

  describe("deleteProduct", () => {
    it("should throw NotFoundError when product not found", async () => {
      // Arrange
      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        productRepositoryMongodb.deleteProduct("wrongId")
      ).rejects.toThrowError(NotFoundError);
    });

    it("should delete product when productId is found", async () => {
      // Arrange
      const product = await ProductsCollectionTestHelper.getProductModel({});
      await collection.insertOne(product);
      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);

      // Action
      await productRepositoryMongodb.deleteProduct(product._id);

      // Assert
      const resultProduct = await collection.findOne({
        _id: product._id,
      });
      expect(resultProduct).toBeNull();
    });

    it("should return deleted product when productId is found", async () => {
      // Arrange
      const product = await ProductsCollectionTestHelper.getProductModel({});
      await collection.insertOne(product);
      const productRepositoryMongodb = new ProductRepositoryMongodb(collection);

      // Action
      const resultProduct = await productRepositoryMongodb.deleteProduct(
        product._id
      );

      // Assert
      expect(resultProduct).toMatchObject(product._doc);
    });
  });
});
