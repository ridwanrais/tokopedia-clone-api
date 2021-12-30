const InvariantError = require("../../../Commons/exceptions/InvariantError");
// const AuthenticationsTableTestHelper = require("../../../../tests/AuthenticationsTableTestHelper");
const db = require("../../database/mongodb/db");
const AuthenticationRepositoryMongodb = require("../AuthenticationRepositoryMongodb");
const Auth = require("../../database/mongodb/models/Auth");

describe("AuthenticationRepository mongodb", () => {
  let collection;

  beforeAll(async () => {
    collection = db.collection("authentications");
  });

  afterEach(async () => {
    await db.collection("authentications").deleteMany({});
  });

  afterAll(async () => {
    await db.closeConnection();
  });

  describe("addToken function", () => {
    it("should add token to database", async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryMongodb(
        collection
      );
      const refreshToken = "token";

      // Action
      await authenticationRepository.addToken(refreshToken);

      // Assert
      const tokenDoc = await collection.findOne({ refreshToken });
      expect(tokenDoc.refreshToken).toStrictEqual(refreshToken);
    });
  });

  describe("checkTokenAvailability function", () => {
    it("should throw InvariantError if token not available", async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryMongodb(
        collection
      );
      const refreshToken = "token";

      // Action & Assert
      await expect(
        authenticationRepository.checkTokenAvailability(refreshToken)
      ).rejects.toThrow(InvariantError);
    });

    it("should not throw InvariantError if token available", async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryMongodb(
        collection
      );
      const refreshToken = "token";
      await collection.insertOne(new Auth({ refreshToken }));

      // Action & Assert
      await expect(
        authenticationRepository.checkTokenAvailability(refreshToken)
      ).resolves.not.toThrow(InvariantError);
    });
  });

  describe("deleteToken", () => {
    it("should delete token from database", async () => {
      // Arrange
      const authenticationRepository = new AuthenticationRepositoryMongodb(
        collection
      );
      const refreshToken = "token";
      await collection.insertOne(new Auth({ refreshToken }));

      // Action
      await authenticationRepository.deleteToken(refreshToken);

      // Assert
      const tokenDoc = await collection.findOne({ refreshToken });
      expect(tokenDoc).toBeNull();
    });
  });
});
