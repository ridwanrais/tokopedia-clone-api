const db = require("../../database/mongodb/db");
const OrdersCollectionTestHelper = require("../../../../tests/OrdersCollectionTestHelper");
const UsersCollectionTestHelper = require("../../../../tests/UsersCollectionTestHelper");
const container = require("../../container");
const createServer = require("../createServer");
const ServerTestHelper = require("../../../../tests/ServerTestHelper");

describe("/orders endpoint", () => {
  afterAll(async () => {
    await db.closeConnection();
  });

  afterEach(async () => {
    await db.collection("orders").deleteMany({});
    await db.collection("users").deleteMany({});
    await db.collection("products").deleteMany({});
  });

  describe("when POST /orders", () => {
    it("should response 201 and persisted order", async () => {
      // Arrange
      const userId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
      });
      const requestPayload = {
        productId: "product-123",
        quantity: 1,
        amount: 70,
        address: "testAddress",
        status: "pending",
      };
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/orders",
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.addedOrder).toBeDefined();
    });

    it("should response 400 when request payload not contain needed property", async () => {
      // Arrange
      const requestPayload = {
        productId: "abc",
      };
      const accessToken = await ServerTestHelper.getAccessToken();
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/orders",
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat order baru karena properti yang dibutuhkan tidak ada"
      );
    });

    it("should response 400 when request payload not meet data type specification", async () => {
      // Arrange
      const userId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
      });
      const requestPayload = {
        productId: "product-123",
        quantity: 1,
        amount: "70",
        address: "testAddress",
        status: "pending",
      };
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/orders",
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat membuat order baru karena tipe data tidak sesuai"
      );
    });
  });

  describe("when PUT /orders", () => {
    it("should response 201 and persisted order", async () => {
      // Arrange
      const userId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
      });
      const orderId = await OrdersCollectionTestHelper.addOrder({
        userId: userId,
        productId: "product-123",
        quantity: 1,
      });
      const requestPayload = {
        productId: "product-123",
        quantity: 2,
        amount: 70,
        address: "testAddress",
        status: "pending",
      };
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "PUT",
        url: `/orders/${orderId}`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.updatedOrder).toBeDefined();
    });

    it("should response 400 when request payload not contain needed property", async () => {
      // Arrange
      const userId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
      });
      const orderId = await OrdersCollectionTestHelper.addOrder({
        userId,
      });
      const requestPayload = {
        productId: "product-123",
      };
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "PUT",
        url: `/orders/${orderId}`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat mengubah order karena properti yang dibutuhkan tidak ada"
      );
    });

    it("should response 400 when request payload not meet data type specification", async () => {
      // Arrange
      const userId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
      });
      const orderId = await OrdersCollectionTestHelper.addOrder({
        userId,
      });
      const requestPayload = {
        productId: "product-123",
        quantity: "2",
        amount: 70,
        address: "testAddress",
        status: "pending",
      };
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "PUT",
        url: `/orders/${orderId}`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "tidak dapat mengubah order karena tipe data tidak sesuai"
      );
    });
  });

  describe("when DELETE /orders/{orderId}", () => {
    it("should response 200 and show order detail", async () => {
      // Arrange
      const userId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
      });
      const orderId = await OrdersCollectionTestHelper.addOrder({
        userId,
      });
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "DELETE",
        url: `/orders/${orderId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
    });

    it("should response 404 when order id is not found", async () => {
      // Arrange
      const userId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
      });
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "DELETE",
        url: "/orders/order-456",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("order yang dicari tidak ditemukan");
    });
  });

  describe("when GET /orders/user/{userId}", () => {
    it("should response 200 and show orders", async () => {
      // Arrange
      const userId = await UsersCollectionTestHelper.addUser({
        username: "abc",
        email: "abc@abc.com",
      });
      // const sellerId = await UsersCollectionTestHelper.addUser({
      //   username: "xyz",
      //   email: "xyz@abc.com",
      //   address: "testAddress",
      // });
      // const productId = await ProductsCollectionTestHelper.addProduct({
      //   sellerId,
      // });
      await OrdersCollectionTestHelper.addOrder({
        userId,
      });
      await OrdersCollectionTestHelper.addOrder({
        userId,
      });
      const accessToken = await ServerTestHelper.getAccessToken(userId);

      // const test = await db.collection("orders").findOne({
      //   _id: orderId,
      //   userId: userId,
      // });
      // console.log(userId, sellerId, productId, orderId);
      // console.log(test);

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/orders/user/${userId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.orders).toBeDefined();
      expect(responseJson.data.orders.length).toStrictEqual(2);
    });

    it("should response 404 when orders are not found", async () => {
      // Arrange
      const server = await createServer(container);
      const accessToken = await ServerTestHelper.getAccessToken();

      // Action
      const response = await server.inject({
        method: "GET",
        url: "/orders/user/user-789",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("order tidak ditemukan");
    });
  });
});
