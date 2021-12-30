const db = require("../../database/mongodb/db");
const ProductsCollectionTestHelper = require("../../../../tests/ProductsCollectionTestHelper");
const CartsCollectionTestHelper = require("../../../../tests/CartsCollectionTestHelper");
const UsersCollectionTestHelper = require("../../../../tests/UsersCollectionTestHelper");
const container = require("../../container");
const createServer = require("../createServer");
const ServerTestHelper = require("../../../../tests/ServerTestHelper");

describe("/carts endpoint", () => {
  afterAll(async () => {
    await db.closeConnection();
  });

  afterEach(async () => {
    await db.collection("carts").deleteMany({});
    await db.collection("users").deleteMany({});
    await db.collection("products").deleteMany({});
  });

  describe("when POST /carts", () => {
    it("should response 201 and persisted cart", async () => {
      // Arrange
      const userId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
      });
      const requestPayload = {
        productId: "product-123",
        quantity: 1,
      };
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/carts",
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.addedCart).toBeDefined();
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
        url: "/carts",
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
        "tidak dapat membuat cart baru karena properti yang dibutuhkan tidak ada"
      );
    });

    it("should response 400 when request payload not meet data type specification", async () => {
      // Arrange
      const userId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
      });
      const requestPayload = {
        productId: "product-123",
        quantity: "1",
      };
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/carts",
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
        "tidak dapat membuat cart baru karena tipe data tidak sesuai"
      );
    });
  });

  describe("when PUT /carts", () => {
    it("should response 201 and persisted cart", async () => {
      // Arrange
      const userId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
      });
      const cartId = await CartsCollectionTestHelper.addCart({
        userId: userId,
        productId: "product-123",
        quantity: 1,
      });
      const requestPayload = {
        productId: "product-123",
        quantity: 2,
      };
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "PUT",
        url: `/carts/${cartId}`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.updatedCart).toBeDefined();
    });

    it("should response 400 when request payload not contain needed property", async () => {
      // Arrange
      const userId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
      });
      const cartId = await CartsCollectionTestHelper.addCart({
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
        url: `/carts/${cartId}`,
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
        "tidak dapat mengubah cart karena properti yang dibutuhkan tidak ada"
      );
    });

    it("should response 400 when request payload not meet data type specification", async () => {
      // Arrange
      const userId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
      });
      const cartId = await CartsCollectionTestHelper.addCart({
        userId,
      });
      const requestPayload = {
        productId: "product-123",
        quantity: "2",
      };
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "PUT",
        url: `/carts/${cartId}`,
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
        "tidak dapat mengubah cart karena tipe data tidak sesuai"
      );
    });
  });

  describe("when DELETE /carts/{cartId}", () => {
    it("should response 200 and show cart detail", async () => {
      // Arrange
      const userId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
      });
      const cartId = await CartsCollectionTestHelper.addCart({
        userId,
      });
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "DELETE",
        url: `/carts/${cartId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
    });

    it("should response 404 when cart id is not found", async () => {
      // Arrange
      const userId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
      });
      const accessToken = await ServerTestHelper.getAccessToken(userId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "DELETE",
        url: "/carts/cart-456",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("cart yang dicari tidak ditemukan");
    });
  });

  describe("when GET /carts/{cartId}", () => {
    it("should response 200 and show cart detail", async () => {
      // Arrange
      const userId = await UsersCollectionTestHelper.addUser({
        username: "abc",
        email: "abc@abc.com",
      });
      const sellerId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
        email: "xyz@abc.com",
        address: "testAddress",
      });
      const productId = await ProductsCollectionTestHelper.addProduct({
        sellerId,
      });
      const cartId = await CartsCollectionTestHelper.addCart({
        userId,
        productId,
      });
      const accessToken = await ServerTestHelper.getAccessToken(userId);

      // const test = await db.collection("carts").findOne({
      //   _id: cartId,
      //   userId: userId,
      // });
      // console.log(userId, sellerId, productId, cartId);
      // console.log(test);

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/carts/${cartId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.cart).toBeDefined();
    });

    it("should response 404 when cart id is not found", async () => {
      // Arrange

      const server = await createServer(container);
      const accessToken = await ServerTestHelper.getAccessToken();

      // Action
      const response = await server.inject({
        method: "GET",
        url: "/carts/cart-456",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual("cart yang dicari tidak ditemukan");
    });

    it("should response 403 when user is not the cart owner", async () => {
      // Arrange
      const userId = await UsersCollectionTestHelper.addUser({
        username: "abc",
        email: "abc@abc.com",
      });
      const cartId = await CartsCollectionTestHelper.addCart({
        userId,
      });
      const accessToken = await ServerTestHelper.getAccessToken();

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/carts/${cartId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "Anda tidak berhak melakukan perintah ini"
      );
    });
  });
});
