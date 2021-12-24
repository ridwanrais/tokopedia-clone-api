/* istanbul ignore file */
const User = require("../src/Infrastructures/database/mongodb/models/User");

const UsersCollectionTestHelper = {
  async getUser({
    _id = "user-123",
    username = "xyz",
    email = "test@abc.com",
    password = "secret",
    fullname = "XYZ",
  }) {
    return new User({
      _id,
      username,
      email,
      password,
      fullname,
    });
  },

  async findUsersById(id) {
    const user = await User.findById(id);

    return user;
  },

  async cleanCollection() {
    await User.deleteMany({});
  },
};

module.exports = UsersCollectionTestHelper;
