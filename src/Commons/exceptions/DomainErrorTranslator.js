const InvariantError = require("./InvariantError");

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  "REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada"
  ),
  "REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat user baru karena tipe data tidak sesuai"
  ),
  "REGISTER_USER.USERNAME_LIMIT_CHAR": new InvariantError(
    "tidak dapat membuat user baru karena karakter username melebihi batas limit"
  ),
  "REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER": new InvariantError(
    "tidak dapat membuat user baru karena username mengandung karakter terlarang"
  ),
  "USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "harus mengirimkan username dan password"
  ),
  "USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "username dan password harus string"
  ),
  "REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN":
    new InvariantError("harus mengirimkan token refresh"),
  "REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError("refresh token harus string"),
  "DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN":
    new InvariantError("harus mengirimkan token refresh"),
  "DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION":
    new InvariantError("refresh token harus string"),
  "ADD_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat product baru karena properti yang dibutuhkan tidak ada"
  ),
  "ADD_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat product baru karena tipe data tidak sesuai"
  ),
  "PUT_PRODUCT.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat mengubah product karena properti yang dibutuhkan tidak ada"
  ),
  "PUT_PRODUCT.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat mengubah product karena tipe data tidak sesuai"
  ),
  "PRODUCT_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat menampilkan product karena properti yang dibutuhkan tidak ada"
  ),
  "PRODUCT_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat menampilkan product karena tipe data tidak sesuai"
  ),
  "ADD_CART.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat cart baru karena properti yang dibutuhkan tidak ada"
  ),
  "ADD_CART.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat cart baru karena tipe data tidak sesuai"
  ),
  "PUT_CART.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat mengubah cart karena properti yang dibutuhkan tidak ada"
  ),
  "PUT_CART.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat mengubah cart karena tipe data tidak sesuai"
  ),
  "CART_SELLER_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat menampilkan cart seller karena properti yang dibutuhkan tidak ada"
  ),
  "CART_SELLER_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat menampilkan cart seller karena tipe data tidak sesuai"
  ),
  "CART_PRODUCT_DETAIL.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat menampilkan cart product karena properti yang dibutuhkan tidak ada"
  ),
  "CART_PRODUCT_DETAIL.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat menampilkan cart product karena tipe data tidak sesuai"
  ),
  "ADD_ORDER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat membuat order baru karena properti yang dibutuhkan tidak ada"
  ),
  "ADD_ORDER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat membuat order baru karena tipe data tidak sesuai"
  ),
  "PUT_ORDER.NOT_CONTAIN_NEEDED_PROPERTY": new InvariantError(
    "tidak dapat mengubah order karena properti yang dibutuhkan tidak ada"
  ),
  "PUT_ORDER.NOT_MEET_DATA_TYPE_SPECIFICATION": new InvariantError(
    "tidak dapat mengubah order karena tipe data tidak sesuai"
  ),
};

module.exports = DomainErrorTranslator;
