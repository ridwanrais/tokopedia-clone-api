class RegisterUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { username, password, email, fullname } = payload;

    this.username = username;
    this.password = password;
    this.email = email;
    this.fullname = fullname;
  }

  _verifyPayload({ username, password, email, fullname }) {
    if (!username || !password || !email || !fullname) {
      throw new Error("REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof email !== "string" ||
      typeof fullname !== "string"
    ) {
      throw new Error("REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION");
    }

    if (username.length > 50) {
      throw new Error("REGISTER_USER.USERNAME_LIMIT_CHAR");
    }

    if (!username.match(/^[\w]+$/)) {
      throw new Error("REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER");
    }
  }
}

module.exports = RegisterUser;
