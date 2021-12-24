const CryptoJS = require("crypto-js");
const AuthenticationError = require("../../../Commons/exceptions/AuthenticationError");
const CryptoJSEncryptionHelper = require("../CryptoJSPasswordHash");

describe("CryptoJSEncryptionHelper", () => {
  describe("hash function", () => {
    it("should encrypt password correctly", async () => {
      // Arrange
      const spyHash = jest.spyOn(CryptoJS.AES, "encrypt");
      const cryptoJSEncryptionHelper = new CryptoJSEncryptionHelper(CryptoJS);

      // Action
      const encryptedPassword = await cryptoJSEncryptionHelper.hash(
        "plain_password"
      );

      // Assert
      expect(typeof encryptedPassword).toEqual("string");
      expect(encryptedPassword).not.toEqual("plain_password");
      expect(spyHash).toBeCalledWith(
        "plain_password",
        process.env.PASSWORD_KEY
      );
    });
  });

  describe("comparePassword function", () => {
    it("should throw AuthenticationError if password not match", async () => {
      // Arrange
      const cryptoJSEncryptionHelper = new CryptoJSEncryptionHelper(CryptoJS);

      // Act & Assert
      await expect(
        cryptoJSEncryptionHelper.comparePassword(
          "plain_password",
          "encrypted_password"
        )
      ).rejects.toThrow(AuthenticationError);
    });

    it("should not return AuthenticationError if password match", async () => {
      // Arrange
      const cryptoJSEncryptionHelper = new CryptoJSEncryptionHelper(CryptoJS);
      const plainPassword = "secret";
      const encryptedPassword = await cryptoJSEncryptionHelper.hash(
        plainPassword
      );

      // Act & Assert
      await expect(
        cryptoJSEncryptionHelper.comparePassword(
          plainPassword,
          encryptedPassword
        )
      ).resolves.not.toThrow(AuthenticationError);
    });
  });
});
