const InvariantError = require("../../Commons/exceptions/InvariantError");
const AuthenticationRepository = require("../../Domains/authentications/AuthenticationRepository");
const Auth = require("../database/mongodb/models/Auth");

class AuthenticationRepositoryMongodb extends AuthenticationRepository {
  constructor(collection) {
    super();
    this._collection = collection;
  }

  async addToken(token) {
    const newAuth = new Auth({ refreshToken: token });

    await this._collection.insertOne(newAuth);
  }

  async checkTokenAvailability(refreshToken) {
    const result = await this._collection.findOne({ refreshToken });

    if (!result) {
      throw new InvariantError("refresh token tidak ditemukan di database");
    }
  }

  async deleteToken(refreshToken) {
    await this._collection.deleteOne({ refreshToken });
  }
}

module.exports = AuthenticationRepositoryMongodb;
