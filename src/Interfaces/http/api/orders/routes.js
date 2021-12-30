const routes = (handler) => [
  {
    method: "POST",
    path: "/orders",
    handler: handler.postOrderHandler,
    options: {
      auth: "forumapi_jwt",
    },
  },
  {
    method: "PUT",
    path: "/orders/{orderId}",
    handler: handler.putOrderHandler,
    options: {
      auth: "forumapi_jwt",
    },
  },
  {
    method: "DELETE",
    path: "/orders/{orderId}",
    handler: handler.deleteOrderHandler,
    options: {
      auth: "forumapi_jwt",
    },
  },
  {
    method: "GET",
    path: "/orders/user/{userId}",
    handler: handler.getUserOrdersHandler,
    options: {
      auth: "forumapi_jwt",
    },
  },
];

module.exports = routes;
