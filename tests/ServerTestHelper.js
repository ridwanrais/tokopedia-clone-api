/* istanbul ignore file */
const Jwt = require("jsonwebtoken");
const userCollection =
  require("../src/Infrastructures/database/mongodb/db").collection("users");
const UsersCollectionTestHelper = require("./UsersCollectionTestHelper");

const ServerTestHelper = {
  async getAccessToken(_id = "myId") {
    const user = await userCollection.findOne({ _id });
    if (!user) {
      const user = UsersCollectionTestHelper.getUserModel({
        username: "xyz",
        email: "test@abc.com",
        password: "secret",
        fullname: "XYZ",
      });
      id = (await userCollection.insertOne(user)).insertedId;
    } else {
      id = _id;
    }
    return Jwt.sign(
      {
        id,
        username: "xyz",
        email: "test@abc.com",
        password: "secret",
        fullname: "XYZ",
      },
      process.env.ACCESS_TOKEN_KEY
    );
  },
};

module.exports = ServerTestHelper;
