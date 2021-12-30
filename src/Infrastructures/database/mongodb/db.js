/* istanbul ignore file */
const { MongoClient } = require("mongodb");

const DBUrl =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URL_TEST
    : process.env.MONGO_URL;

const client = new MongoClient(DBUrl);
// console.log("Connected successfully to server");

(async () => {
  await client.connect();
})();

const dbName = "tokopedia-clone";
const db = client.db(dbName);

// add closing connection functionality to db variable
db.closeConnection = async () => {
  await client.close();
};
// db.openConnection = async () => {
//   await client.connect();
// };

module.exports = db;
