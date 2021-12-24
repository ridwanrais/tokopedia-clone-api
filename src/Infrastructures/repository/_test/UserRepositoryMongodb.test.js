const UsersCollectionTestHelper = require("../../../../tests/UsersCollectionTestHelper");
const InvariantError = require("../../../Commons/exceptions/InvariantError");
const RegisterUser = require("../../../Domains/users/entities/RegisterUser");
const RegisteredUser = require("../../../Domains/users/entities/RegisteredUser");
const db = require("../../database/mongodb/db");
const UserRepositoryMongodb = require("../UserRepositoryMongodb");

describe("UserRepositoryMongodb", () => {
  let collection;

  beforeAll(async () => {
    collection = db.collection("users");
  });

  afterEach(async () => {
    await db.collection("users").deleteMany({});
  });

  afterAll(async () => {
    await db.closeConnection();
  });

  describe("addUser function", () => {
    it("should persist register user and return registered user correctly", async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: "dicoding",
        password: "secret_password",
        email: "test@abc.com",
        fullname: "Dicoding Indonesia",
      });
      const userRepositoryMongoDB = new UserRepositoryMongodb(collection);

      // Action
      const result = await userRepositoryMongoDB.addUser(registerUser);

      // Assert
      const user = await collection.findOne({ username: "dicoding" });
      expect(user).toMatchObject(registerUser);
    });

    it("should return registered user correctly", async () => {
      // Arrange
      const registerUser = new RegisterUser({
        username: "dicoding",
        password: "secret_password",
        email: "test@abc.com",
        fullname: "Dicoding Indonesia",
      });
      const userRepositoryMongoDB = new UserRepositoryMongodb(collection);
      // Action
      const registeredUser = await userRepositoryMongoDB.addUser(registerUser);

      // Assert
      expect(registeredUser).toBeInstanceOf(RegisteredUser);
      expect(registeredUser.username).toEqual(registerUser.username);
      expect(registeredUser.fullname).toEqual(registerUser.fullname);
      expect(registeredUser.email).toEqual(registerUser.email);
    });
  });

  describe("verifyAvailableUsername function", () => {
    it("should throw InvariantError when username not available", async () => {
      // Arrange
      const user = await UsersCollectionTestHelper.getUser({
        username: "test123",
      });
      await collection.insertOne(user); // memasukan user baru dengan username dicoding
      const userRepositoryMongoDB = new UserRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        userRepositoryMongoDB.verifyAvailableUsername("test123")
      ).rejects.toThrowError(InvariantError);
    });

    it("should not throw InvariantError when username available", async () => {
      // Arrange
      const userRepositoryMongoDB = new UserRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        userRepositoryMongoDB.verifyAvailableUsername("dicoding")
      ).resolves.not.toThrowError(InvariantError);
    });
  });

  describe("getPasswordByUsername", () => {
    it("should throw InvariantError when user not found", () => {
      // Arrange
      const userRepositoryMongoDB = new UserRepositoryMongodb(collection);

      // Action & Assert
      return expect(
        userRepositoryMongoDB.getPasswordByUsername("dicoding")
      ).rejects.toThrowError(InvariantError);
    });

    it("should return username password when user is found", async () => {
      // Arrange
      const user = await UsersCollectionTestHelper.getUser({
        username: "dicoding",
        password: "secret_password",
      });
      await collection.insertOne(user);
      const userRepositoryMongoDB = new UserRepositoryMongodb(collection);

      // Action & Assert
      const password = await userRepositoryMongoDB.getPasswordByUsername(
        "dicoding"
      );
      expect(password).toBe("secret_password");
    });
  });

  describe("getIdByUsername", () => {
    it("should throw InvariantError when user not found", async () => {
      // Arrange
      const userRepositoryMongoDB = new UserRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        userRepositoryMongoDB.getIdByUsername("dicoding")
      ).rejects.toThrowError(InvariantError);
    });

    it("should return user id correctly", async () => {
      // Arrange
      const user = await UsersCollectionTestHelper.getUser({
        username: "dicoding",
      });
      const result = await collection.insertOne(user);
      const id = result.insertedId.toString();
      const userRepositoryMongoDB = new UserRepositoryMongodb(collection);

      // Action
      const userId = await userRepositoryMongoDB.getIdByUsername("dicoding");

      // Assert
      expect(userId).toEqual(id);
    });
  });

  describe("getUsernameById", () => {
    it("should throw InvariantError when user not found", async () => {
      // Arrange
      const userRepositoryMongoDB = new UserRepositoryMongodb(collection);

      // Action & Assert
      await expect(
        userRepositoryMongoDB.getUsersByIds(["dicoding"])
      ).rejects.toThrowError(InvariantError);
    });

    it("should return user id correctly", async () => {
      // Arrange
      const user1 = await UsersCollectionTestHelper.getUser({
        username: "dicoding",
      });
      const result1 = await collection.insertOne(user1);
      const id1 = result1.insertedId.toString();

      const user2 = await UsersCollectionTestHelper.getUser({
        username: "myUser",
      });
      const result2 = await collection.insertOne(user2);
      const id2 = result2.insertedId.toString();

      const userRepositoryMongoDB = new UserRepositoryMongodb(collection);

      // Action
      const userIds = await userRepositoryMongoDB.getUsersByIds([id1, id2]);

      // Assert
      expect(userIds).toEqual(["dicoding", "myUser"]);
    });
  });
});
