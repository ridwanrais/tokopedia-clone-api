const InvariantError = require("../../Commons/exceptions/InvariantError");
const RegisteredUser = require("../../Domains/users/entities/RegisteredUser");
const UserRepository = require("../../Domains/users/UserRepository");
const User = require("../database/mongodb/models/User");

class UserRepositoryMongodb extends UserRepository {
  constructor(collection) {
    super();
    this._collection = collection;
  }

  async addUser(registerUser) {
    const newUser = new User({
      ...registerUser,
    });

    const result = await this._collection.insertOne(newUser);
    const id = result.insertedId.toString();

    return new RegisteredUser({ id, ...registerUser });
  }

  async verifyAvailableUsername(username) {
    const result = await this._collection.findOne({ username });

    if (result) {
      throw new InvariantError("username tidak tersedia");
    }
  }

  async getPasswordByUsername(username) {
    const result = await this._collection.findOne({ username });

    if (!result) {
      throw new InvariantError("username tidak ditemukan");
    }

    return result.password;
  }

  async getIdByUsername(username) {
    const result = await this._collection.findOne({ username });

    if (!result) {
      throw new InvariantError("user tidak ditemukan");
    }

    return result._id.toString();
  }

  async getUsersByIds(ids) {
    const userArray = await this._collection
      .find({ _id: { $in: ids } })
      .toArray();

    if (!userArray.length) {
      throw new InvariantError("users tidak ditemukan");
    }

    return userArray;
  }
}

module.exports = UserRepositoryMongodb;
