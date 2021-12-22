const mongoose = require("mongoose");

const DBUrl =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URL_TEST
    : process.env.MONGO_URL;

const connectToDB = () => {
  mongoose
    .connect(DBUrl)
    .then(() => console.log("DB Connection succesful"))
    .catch((err) => console.log(err));
};

module.exports = connectToDB;
