const routes = (handler) => [
  {
    method: "POST",
    path: "/products",
    handler: handler.postProductHandler,
    options: {
      auth: "forumapi_jwt",
    },
  },
  {
    method: "PUT",
    path: "/products/{productId}",
    handler: handler.putProductHandler,
    options: {
      auth: "forumapi_jwt",
    },
  },
  {
    method: "DELETE",
    path: "/products/{productId}",
    handler: handler.deleteProductHandler,
    options: {
      auth: "forumapi_jwt",
    },
  },
  {
    method: "GET",
    path: "/products/{productId}",
    handler: handler.getProductHandler,
  },
  {
    method: "GET",
    path: "/products",
    handler: handler.getMultipleProductsHandler,
  },
];

module.exports = routes;
