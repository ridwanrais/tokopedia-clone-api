const CartsHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "carts",
  register: async (server, { container }) => {
    const cartsHandler = new CartsHandler(container);
    server.route(routes(cartsHandler));
  },
};
