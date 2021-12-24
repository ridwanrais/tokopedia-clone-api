const Jwt = require("jsonwebtoken");
const InvariantError = require("../../../Commons/exceptions/InvariantError");
const JwtTokenManager = require("../JwtTokenManager");

describe("JwtTokenManager", () => {
  describe("createAccessToken function", () => {
    it("should create accessToken correctly", async () => {
      // Arrange
      const payload = {
        id: "user-123",
        isAdmin: false,
      };
      const mockJwtToken = {
        sign: jest.fn().mockImplementation(() => "mock_token"),
      };
      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      // Action
      const accessToken = await jwtTokenManager.createAccessToken(payload);

      // Assert
      expect(mockJwtToken.sign).toBeCalledWith(
        payload,
        process.env.ACCESS_TOKEN_KEY
      );
      expect(accessToken).toEqual("mock_token");
    });
  });

  describe("createRefreshToken function", () => {
    it("should create refreshToken correctly", async () => {
      // Arrange
      const payload = {
        id: "user-123",
        isAdmin: true,
      };
      const mockJwtToken = {
        sign: jest.fn().mockImplementation(() => "mock_token"),
      };
      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      // Action
      const refreshToken = await jwtTokenManager.createRefreshToken(payload);

      // Assert
      expect(mockJwtToken.sign).toBeCalledWith(
        payload,
        process.env.REFRESH_TOKEN_KEY
      );
      expect(refreshToken).toEqual("mock_token");
    });
  });

  describe("verifyRefreshToken function", () => {
    it("should throw InvariantError when verification failed", async () => {
      // Arrange
      const jwtTokenManager = new JwtTokenManager(Jwt);
      const accessToken = await jwtTokenManager.createAccessToken({
        id: "user-123",
        isAdmin: false,
      });

      // Action & Assert
      await expect(
        jwtTokenManager.verifyRefreshToken(accessToken)
      ).rejects.toThrow(InvariantError);
    });

    it("should not throw InvariantError when refresh token verified", async () => {
      // Arrange
      const jwtTokenManager = new JwtTokenManager(Jwt);
      const refreshToken = await jwtTokenManager.createRefreshToken({
        id: "user-123",
        isAdmin: true,
      });

      // Action & Assert
      await expect(
        jwtTokenManager.verifyRefreshToken(refreshToken)
      ).resolves.not.toThrow(InvariantError);
    });
  });

  describe("decodePayload function", () => {
    it("should decode payload correctly", async () => {
      // Arrange
      const jwtTokenManager = new JwtTokenManager(Jwt);
      const accessToken = await jwtTokenManager.createAccessToken({
        id: "user-123",
        isAdmin: true,
      });

      // Action
      const { id: expectedId, isAdmin: expectedisAdmin } =
        await jwtTokenManager.decodePayload(accessToken);

      // Action & Assert
      expect(expectedId).toEqual("user-123");
      expect(expectedisAdmin).toEqual(true);
    });
  });
});
