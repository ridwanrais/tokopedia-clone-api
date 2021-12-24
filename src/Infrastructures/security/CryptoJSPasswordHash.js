const EncryptionHelper = require("../../Applications/security/PasswordHash");
const AuthenticationError = require("../../Commons/exceptions/AuthenticationError");

class CryptoJSPasswordHash extends EncryptionHelper {
  constructor(cryptoJS) {
    super();
    this._cryptoJS = cryptoJS;
  }

  async hash(password) {
    const hashedPassword = this._cryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_KEY
    );

    return hashedPassword.toString();
  }

  async comparePassword(password, hashedPassword) {
    const decryptedPassword = this._cryptoJS.AES.decrypt(
      hashedPassword,
      process.env.PASSWORD_KEY
    );

    const originalPassword = decryptedPassword.toString(
      this._cryptoJS.enc.Utf8
    );

    const result = password === originalPassword;

    if (!result) {
      throw new AuthenticationError("kredensial yang Anda masukkan salah");
    }
  }
}

module.exports = CryptoJSPasswordHash;
