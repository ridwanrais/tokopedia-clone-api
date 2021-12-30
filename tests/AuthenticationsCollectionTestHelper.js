/* istanbul ignore file */
const Auth = require("../src/Infrastructures/database/mongodb/models/Auth");

const AuthenticationsCollectionTestHelper = {
  async getAuthModel(token) {
    return new Auth({
      refreshToken: token,
    });
  },
};

module.exports = AuthenticationsCollectionTestHelper;
