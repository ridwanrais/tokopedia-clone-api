const routes = (handler) => [
  {
    method: "POST",
    path: "/carts",
    handler: handler.postCartHandler,
    options: {
      auth: "forumapi_jwt",
    },
  },
  {
    method: "PUT",
    path: "/carts/{cartId}",
    handler: handler.putCartHandler,
    options: {
      auth: "forumapi_jwt",
    },
  },
  {
    method: "DELETE",
    path: "/carts/{cartId}",
    handler: handler.deleteCartHandler,
    options: {
      auth: "forumapi_jwt",
    },
  },
  {
    method: "GET",
    path: "/carts/{cartId}",
    handler: handler.getCartHandler,
    options: {
      auth: "forumapi_jwt",
    },
  },
];

module.exports = routes;
