const OrdersCollectionTestHelper = require("../../../../tests/OrdersCollectionTestHelper");
const UsersCollectionTestHelper = require("../../../../tests/UsersCollectionTestHelper");
const InvariantError = require("../../../Commons/exceptions/InvariantError");
const NotFoundError = require("../../../Commons/exceptions/NotFoundError");
const AuthorizationError = require("../../../Commons/exceptions/AuthorizationError");
const AddOrder = require("../../../Domains/orders/entities/AddOrder");
const PutOrder = require("../../../Domains/orders/entities/PutOrder");
const db = require("../../database/mongodb/db");
const OrderRepositoryMongodb = require("../OrderRepositoryMongodb");

describe("OrderRepositoryMongodb", () => {
  let collection;
  let userCollection;

  beforeAll(async () => {
    collection = db.collection("orders");
    userCollection = db.collection("users");
  });

  afterEach(async () => {
    await db.collection("orders").deleteMany({});
    await db.collection("users").deleteMany({});
  });

  afterAll(async () => {
    await db.closeConnection();
  });

  describe("addOrder function", () => {
    it("should persist add order", async () => {
      // Arrange
      const addOrder = new AddOrder({
        userId: "user-123",
        productId: "product-123",
        quantity: 1,
        amount: 90,
        address: "test",
        status: "pending",
      });
      const orderRepositoryMongodb = new OrderRepositoryMongodb(collection);

      // Action
      const orderId = await orderRepositoryMongodb.addOrder(addOrder);

      // Assert
      const order = await collection.findOne({
        _id: orderId,
      });
      expect(order.userId).toStrictEqual(addOrder.userId);
      expect(order.products[0].productId).toStrictEqual(addOrder.productId);
      expect(order.products[0].quantity).toStrictEqual(addOrder.quantity);
      expect(order.amount).toStrictEqual(addOrder.amount);
      expect(order.address).toStrictEqual(addOrder.address);
      expect(order.status).toStrictEqual(addOrder.status);
    });

    it("should return added order id correctly", async () => {
      // Arrange
      const addOrder = new AddOrder({
        userId: "user-123",
        productId: "product-123",
        quantity: 1,
        amount: 90,
        address: "test",
        status: "pending",
      });
      const orderRepositoryMongodb = new OrderRepositoryMongodb(collection);

      // Action
      const orderId = await orderRepositoryMongodb.addOrder(addOrder);

      // Assert
      const order = await collection.findOne({
        userId: "user-123",
      });
      expect(orderId).toStrictEqual(order._id.toString());
    });
  });

  describe("putOrder function", () => {
    it("should persist put order", async () => {
      // Arrange
      const testOrder = await OrdersCollectionTestHelper.getOrderModel({});
      await collection.insertOne(testOrder);
      const id = testOrder._id.toString();

      const putOrder = new PutOrder({
        userId: "user-123",
        orderId: id,
        productId: "product-123",
        quantity: 3,
        amount: 90,
        address: "test",
        status: "pending",
      });
      const orderRepositoryMongodb = new OrderRepositoryMongodb(collection);

      // Action
      await orderRepositoryMongodb.putOrder(putOrder);

      // Assert
      const resultOrder = await collection.findOne({
        _id: testOrder._id,
      });

      expect(resultOrder).toMatchObject(putOrder);
      expect(resultOrder._id.toString()).toStrictEqual(id);
    });

    it("should return updated order correctly", async () => {
      // Arrange
      const testOrder = await OrdersCollectionTestHelper.getOrderModel({});
      await collection.insertOne(testOrder);
      const id = testOrder._id.toString();

      const putOrder = new PutOrder({
        userId: "user-123",
        orderId: id,
        productId: "product-123",
        quantity: 3,
        amount: 90,
        address: "test",
        status: "pending",
      });
      const orderRepositoryMongodb = new OrderRepositoryMongodb(collection);

      // Action
      const updatedOrder = await orderRepositoryMongodb.putOrder(putOrder);

      // Assert
      expect(updatedOrder).toMatchObject(putOrder);
      expect(updatedOrder._id.toString()).toStrictEqual(id);
    });
  });

  describe("deleteOrder", () => {
    it("should throw InvariantError when order not found", async () => {
      // Arrange
      const orderRepositoryMongodb = new OrderRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        orderRepositoryMongodb.deleteOrder("wrongId")
      ).rejects.toThrowError(InvariantError);
    });

    it("should delete order when orderId is found", async () => {
      // Arrange
      const order = await OrdersCollectionTestHelper.getOrderModel({});
      await collection.insertOne(order);
      const orderRepositoryMongodb = new OrderRepositoryMongodb(collection);

      // Action
      await orderRepositoryMongodb.deleteOrder(order._id);

      // Assert
      const resultOrder = await collection.findOne({
        _id: order._id,
      });
      expect(resultOrder).toBeNull();
    });

    it("should return deleted order when orderId is found", async () => {
      // Arrange
      const order = await OrdersCollectionTestHelper.getOrderModel({});
      await collection.insertOne(order);
      const orderRepositoryMongodb = new OrderRepositoryMongodb(collection);

      // Action
      const resultOrder = await orderRepositoryMongodb.deleteOrder(order._id);

      // Assert
      expect(resultOrder._id).toStrictEqual(order._id);
      expect(resultOrder.userId).toStrictEqual(order.userId);
      expect(resultOrder.products[0].productId).toStrictEqual(
        order.products[0].productId
      );
      expect(resultOrder.products[0].quantity).toStrictEqual(
        order.products[0].quantity
      );
      expect(resultOrder.amount).toStrictEqual(order.amount);
      expect(resultOrder.address).toStrictEqual(order.address);
      expect(resultOrder.status).toStrictEqual(order.status);
    });
  });

  describe("verifyOrderOwner function", () => {
    it("should throw AuthorizationError when user is not the order owner", async () => {
      // Arrange
      const user = await UsersCollectionTestHelper.getUserModel({
        username: "myUser",
      });
      await userCollection.insertOne(user);

      const order = await OrdersCollectionTestHelper.getOrderModel({});
      await collection.insertOne(order);

      const orderRepositoryMongodb = new OrderRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        orderRepositoryMongodb.verifyOrderOwner(order._id, user._id)
      ).rejects.toThrowError(AuthorizationError);
    });

    it("should not throw AuthorizationError when user is the order owner", async () => {
      // Arrange
      const user = await UsersCollectionTestHelper.getUserModel({
        username: "myUser",
      });
      await userCollection.insertOne(user);

      const order = await OrdersCollectionTestHelper.getOrderModel({
        userId: user._id,
      });
      await collection.insertOne(order);

      const orderRepositoryMongodb = new OrderRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        orderRepositoryMongodb.verifyOrderOwner(order._id, user._id)
      ).resolves.not.toThrowError(AuthorizationError);
    });
  });

  describe("getUserOrders", () => {
    it("should throw NotFoundError when order not found", async () => {
      // Arrange
      const orderRepositoryMongodb = new OrderRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        orderRepositoryMongodb.getUserOrders("wrongId")
      ).rejects.toThrowError(NotFoundError);
    });

    it("should return order when orderId is found", async () => {
      // Arrange
      const user = await UsersCollectionTestHelper.getUserModel({
        username: "myUser",
      });
      await userCollection.insertOne(user);

      const testOrder1 = await OrdersCollectionTestHelper.getOrderModel({
        userId: user._id.toString(),
      });
      await collection.insertOne(testOrder1);

      const testOrder2 = await OrdersCollectionTestHelper.getOrderModel({
        userId: user._id.toString(),
      });
      await collection.insertOne(testOrder2);

      const orderRepositoryMongodb = new OrderRepositoryMongodb(collection);

      // Action & Assert
      const orders = await orderRepositoryMongodb.getUserOrders(
        user._id.toString()
      );
      expect(orders[0]._id).toEqual(testOrder1._id);
      expect(orders[1]._id).toEqual(testOrder2._id);
    });
  });
});
