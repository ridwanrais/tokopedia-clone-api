/* istanbul ignore file */
const connectToDB = require("../src/Infrastructures/database/mongodb/mongoose");
const User = require("../models/User");

connectToDB();

const UsersCollectionTestHelper = {
  async addUser(
    username = "xyz",
    email = "test@abc.com",
    password = "secret",
    fullname = "XYZ"
  ) {
    const newUser = new User({
      username,
      email,
      password,
      fullname,
    });

    await newUser.save();
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
