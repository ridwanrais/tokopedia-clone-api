const CartsCollectionTestHelper = require("../../../../tests/CartsCollectionTestHelper");
const UsersCollectionTestHelper = require("../../../../tests/UsersCollectionTestHelper");
const NotFoundError = require("../../../Commons/exceptions/NotFoundError");
const AuthorizationError = require("../../../Commons/exceptions/AuthorizationError");
const AddCart = require("../../../Domains/carts/entities/AddCart");
const PutCart = require("../../../Domains/carts/entities/PutCart");
const db = require("../../database/mongodb/db");
const CartRepositoryMongodb = require("../CartRepositoryMongodb");

describe("CartRepositoryMongodb", () => {
  let collection;
  let userCollection;

  beforeAll(async () => {
    collection = db.collection("carts");
    userCollection = db.collection("users");
  });

  afterEach(async () => {
    await db.collection("carts").deleteMany({});
    await db.collection("users").deleteMany({});
  });

  afterAll(async () => {
    await db.closeConnection();
  });

  describe("addCart function", () => {
    it("should persist add cart", async () => {
      // Arrange
      const addCart = new AddCart({
        userId: "user-123",
        productId: "product-123",
        quantity: 1,
      });
      const cartRepositoryMongodb = new CartRepositoryMongodb(collection);

      // Action
      const cartId = await cartRepositoryMongodb.addCart(addCart);

      // Assert
      const cart = await collection.findOne({
        _id: cartId,
      });
      expect(cart.userId).toStrictEqual(addCart.userId);
      expect(cart.products[0].productId).toStrictEqual(addCart.productId);
      expect(cart.products[0].quantity).toStrictEqual(addCart.quantity);
    });

    it("should return added cart id correctly", async () => {
      // Arrange
      const addCart = new AddCart({
        userId: "user-123",
        productId: "product-123",
        quantity: 1,
      });
      const cartRepositoryMongodb = new CartRepositoryMongodb(collection);
      // Action
      const cartId = await cartRepositoryMongodb.addCart(addCart);

      // Assert
      const cart = await collection.findOne({
        userId: "user-123",
      });
      expect(cartId).toStrictEqual(cart._id.toString());
    });
  });

  describe("getCart", () => {
    it("should throw NotFoundError when cart not found", async () => {
      // Arrange
      const cartRepositoryMongodb = new CartRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        cartRepositoryMongodb.getCart("wrongId")
      ).rejects.toThrowError(NotFoundError);
    });

    it("should return cart when cartId is found", async () => {
      // Arrange
      const testCart = await CartsCollectionTestHelper.getCartModel({});
      const result = await collection.insertOne(testCart);
      const id = result.insertedId;

      const cartRepositoryMongodb = new CartRepositoryMongodb(collection);

      // Action & Assert
      const cart = await cartRepositoryMongodb.getCart(id);
      expect(cart._id).toEqual(testCart._id);
    });
  });

  describe("putCart function", () => {
    it("should persist put cart", async () => {
      // Arrange
      const testCart = await CartsCollectionTestHelper.getCartModel({});
      const cartId = (await collection.insertOne(testCart)).insertedId;
      const id = testCart._id;

      const putCart = new PutCart({
        userId: "user-123",
        cartId,
        productId: "product-123",
        quantity: 3,
      });
      const cartRepositoryMongodb = new CartRepositoryMongodb(collection);

      // Action
      await cartRepositoryMongodb.putCart(putCart);

      // Assert
      const resultCart = await collection.findOne({
        _id: testCart._id,
      });

      expect(resultCart).toMatchObject(putCart);
      expect(resultCart._id.toString()).toStrictEqual(id);
    });

    it("should return updated cart correctly", async () => {
      // Arrange
      const testCart = await CartsCollectionTestHelper.getCartModel({});
      await collection.insertOne(testCart);
      const id = testCart._id.toString();

      const putCart = new PutCart({
        userId: "user-123",
        cartId: id,
        productId: "product-123",
        quantity: 3,
      });
      const cartRepositoryMongodb = new CartRepositoryMongodb(collection);

      // Action
      const updatedCart = await cartRepositoryMongodb.putCart(putCart);

      // Assert
      expect(updatedCart).toMatchObject(putCart);
      expect(updatedCart._id.toString()).toStrictEqual(id);
    });
  });

  describe("verifyCartExistence function", () => {
    it("should throw NotFoundError when cart not available", async () => {
      // Arrange
      const cartRepositoryMongodb = new CartRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        cartRepositoryMongodb.verifyCartExistence("test123")
      ).rejects.toThrowError(NotFoundError);
    });

    it("should not throw NotFoundError when cart available", async () => {
      // Arrange
      const cart = await CartsCollectionTestHelper.getCartModel({});
      await collection.insertOne(cart); // memasukan cart baru dengan cartname test123
      const cartRepositoryMongodb = new CartRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        cartRepositoryMongodb.verifyCartExistence(cart._id)
      ).resolves.not.toThrowError(NotFoundError);
    });
  });

  describe("verifyCartOwner function", () => {
    it("should throw AuthorizationError when user is not the cart owner", async () => {
      // Arrange
      const user = await UsersCollectionTestHelper.getUserModel({
        username: "myUser",
      });
      await userCollection.insertOne(user);

      const cart = await CartsCollectionTestHelper.getCartModel({});
      await collection.insertOne(cart);

      const cartRepositoryMongodb = new CartRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        cartRepositoryMongodb.verifyCartOwner(cart._id, user._id)
      ).rejects.toThrowError(AuthorizationError);
    });

    it("should not throw AuthorizationError when user is the cart owner", async () => {
      // Arrange
      const user = await UsersCollectionTestHelper.getUserModel({
        username: "myUser",
      });
      await userCollection.insertOne(user);

      const cart = await CartsCollectionTestHelper.getCartModel({
        userId: user._id,
      });
      await collection.insertOne(cart);

      const cartRepositoryMongodb = new CartRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        cartRepositoryMongodb.verifyCartOwner(cart._id, user._id)
      ).resolves.not.toThrowError(AuthorizationError);
    });
  });

  describe("deleteCart", () => {
    it("should throw NotFoundError when cart not found", async () => {
      // Arrange
      const cartRepositoryMongodb = new CartRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        cartRepositoryMongodb.deleteCart("wrongId")
      ).rejects.toThrowError(NotFoundError);
    });

    it("should delete cart when cartId is found", async () => {
      // Arrange
      const cart = await CartsCollectionTestHelper.getCartModel({});
      await collection.insertOne(cart);
      const cartRepositoryMongodb = new CartRepositoryMongodb(collection);

      // Action
      await cartRepositoryMongodb.deleteCart(cart._id);

      // Assert
      const resultCart = await collection.findOne({
        _id: cart._id,
      });
      expect(resultCart).toBeNull();
    });

    it("should return deleted cart when cartId is found", async () => {
      // Arrange
      const cart = await CartsCollectionTestHelper.getCartModel({});
      await collection.insertOne(cart);
      const cartRepositoryMongodb = new CartRepositoryMongodb(collection);

      // Action
      const resultCart = await cartRepositoryMongodb.deleteCart(cart._id);

      // Assert
      expect(resultCart._id).toStrictEqual(cart._id);
      expect(resultCart.userId).toStrictEqual(cart.userId);
      expect(resultCart.products[0].productId).toStrictEqual(
        cart.products[0].productId
      );
      expect(resultCart.products[0].quantity).toStrictEqual(
        cart.products[0].quantity
      );
    });
  });
});
