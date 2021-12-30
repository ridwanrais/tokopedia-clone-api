const db = require("../../database/mongodb/db");
const ProductsCollectionTestHelper = require("../../../../tests/ProductsCollectionTestHelper");
const container = require("../../container");
const createServer = require("../createServer");
const UsersCollectionTestHelper = require("../../../../tests/UsersCollectionTestHelper");
const ServerTestHelper = require("../../../../tests/ServerTestHelper");

describe("/products endpoint", () => {
  afterAll(async () => {
    await db.closeConnection();
  });

  afterEach(async () => {
    await db.collection("products").deleteMany({});
    await db.collection("users").deleteMany({});
  });

  describe("when POST /products", () => {
    it("should response 201 and persisted product", async () => {
      // Arrange
      const sellerId = (
        await UsersCollectionTestHelper.addUser({
          username: "xyz",
        })
      ).toString();
      const requestPayload = {
        title: "xyz",
        desc: "xyz",
        img: "xyz",
        categories: ["t-shirt"],
        price: 100,
      };
      const accessToken = await ServerTestHelper.getAccessToken(sellerId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/products",
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.addedProduct).toBeDefined();
    });

    it("should response 400 when request payload not contain needed property", async () => {
      // Arrange
      const requestPayload = {
        title: "abc",
      };
      const accessToken = await ServerTestHelper.getAccessToken();
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/products",
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
        "tidak dapat membuat product baru karena properti yang dibutuhkan tidak ada"
      );
    });

    it("should response 400 when request payload not meet data type specification", async () => {
      // Arrange
      const sellerId = (
        await UsersCollectionTestHelper.addUser({
          username: "xyz",
        })
      ).toString();
      const requestPayload = {
        title: "xyz",
        desc: "xyz",
        img: "xyz",
        categories: ["t-shirt"],
        price: "100",
      };
      const accessToken = await ServerTestHelper.getAccessToken(sellerId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "POST",
        url: "/products",
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
        "tidak dapat membuat product baru karena tipe data tidak sesuai"
      );
    });
  });

  describe("when PUT /products", () => {
    it("should response 201 and persisted product", async () => {
      // Arrange
      const sellerId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
      });
      const productId = await ProductsCollectionTestHelper.addProduct({
        sellerId: sellerId,
      });
      const requestPayload = {
        sold: 2,
      };
      const accessToken = await ServerTestHelper.getAccessToken(sellerId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "PUT",
        url: `/products/${productId}`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.updatedProduct).toBeDefined();
    });

    // it("should response 400 when request payload not contain needed property", async () => {
    //   // Arrange
    //   const requestPayload = {
    //     title: "abc",
    //   };
    //   const accessToken = await ServerTestHelper.getAccessToken();
    //   const server = await createServer(container);

    //   // Action
    //   const response = await server.inject({
    //     method: "POST",
    //     url: "/products",
    //     payload: requestPayload,
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   });

    //   // Assert
    //   const responseJson = JSON.parse(response.payload);
    //   expect(response.statusCode).toEqual(400);
    //   expect(responseJson.status).toEqual("fail");
    //   expect(responseJson.message).toEqual(
    //     "tidak dapat membuat product baru karena properti yang dibutuhkan tidak ada"
    //   );
    // });

    it("should response 400 when request payload not meet data type specification", async () => {
      // Arrange
      const sellerId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
      });
      const productId = await ProductsCollectionTestHelper.addProduct({
        sellerId,
      });
      const requestPayload = {
        title: "xyz",
        desc: "xyz",
        img: "xyz",
        categories: ["t-shirt"],
        price: "100",
        sellerId,
      };
      const accessToken = await ServerTestHelper.getAccessToken(sellerId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "PUT",
        url: `/products/${productId}`,
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
        "tidak dapat membuat mengubah product karena tipe data tidak sesuai"
      );
    });
  });

  describe("when DELETE /products/{productId}", () => {
    it("should response 200 and show product detail", async () => {
      // Arrange
      const sellerId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
      });
      const productId = await ProductsCollectionTestHelper.addProduct({
        sellerId,
      });
      const accessToken = await ServerTestHelper.getAccessToken(sellerId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "DELETE",
        url: `/products/${productId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
    });

    it("should response 404 when product id is not found", async () => {
      // Arrange
      const sellerId = await UsersCollectionTestHelper.addUser({
        username: "xyz",
      });
      const accessToken = await ServerTestHelper.getAccessToken(sellerId);
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "DELETE",
        url: "/products/product-456",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "product yang dicari tidak ditemukan"
      );
    });
  });

  describe("when GET /products/{productId}", () => {
    it("should response 200 and show product detail", async () => {
      // Arrange
      const id = await ProductsCollectionTestHelper.addProduct({});

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/products/${id}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.product).toBeDefined();
    });

    it("should response 404 when product id is not found", async () => {
      // Arrange
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "GET",
        url: "/products/product-456",
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual("fail");
      expect(responseJson.message).toEqual(
        "product yang dicari tidak ditemukan"
      );
    });
  });

  describe("when GET /products", () => {
    it("should response 200 and show products detail", async () => {
      // Arrange
      await ProductsCollectionTestHelper.addProduct({});
      await ProductsCollectionTestHelper.addProduct({});
      await ProductsCollectionTestHelper.addProduct({});

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "GET",
        url: `/products`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.products).toBeDefined();
      expect(responseJson.data.products.length).toStrictEqual(3);
    });

    it("should show correct products according to queries", async () => {
      // Arrange
      await ProductsCollectionTestHelper.addProduct({
        categories: ["t-shirt"],
      });
      await ProductsCollectionTestHelper.addProduct({
        categories: ["t-shirt"],
      });
      await ProductsCollectionTestHelper.addProduct({
        categories: ["pants"],
      });

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: "GET",
        url: "/products?category=t-shirt&sortNew=true",
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual("success");
      expect(responseJson.data.products).toBeDefined();
      expect(responseJson.data.products.length).toStrictEqual(2);
    });
  });
});
