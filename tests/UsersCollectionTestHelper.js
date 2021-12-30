/* istanbul ignore file */
const User = require("../src/Infrastructures/database/mongodb/models/User");
const userCollection =
  require("../src/Infrastructures/database/mongodb/db").collection("users");

const UsersCollectionTestHelper = {
  async getUserModel({
    username = "xyz",
    email = "test@abc.com",
    password = "secret",
    fullname = "XYZ",
    address,
  }) {
    return new User({
      username,
      email,
      password,
      fullname,
      address,
    });
  },

  async addUser({
    username = "xyz",
    email = "test@abc.com",
    password = "secret",
    fullname = "XYZ",
    address,
  }) {
    const user = await this.getUserModel({
      username,
      email,
      password,
      fullname,
      address,
    });

    const result = await userCollection.insertOne(user);

    return result.insertedId;
  },
};

module.exports = UsersCollectionTestHelper;
