/* istanbul ignore file */

const { createContainer } = require("instances-container");

// external agency
const CryptoJS = require("crypto-js");
const Jwt = require("jsonwebtoken");
const db = require("./database/mongodb/db");

// create mongodb collections
const authCollection = db.collection("authentications");
const userCollection = db.collection("users");
const productCollection = db.collection("products");
const cartCollection = db.collection("carts");
const orderCollection = db.collection("orders");

// service (repository, helper, manager, etc)
const UserRepository = require("../Domains/users/UserRepository");
const UserRepositoryMongodb = require("./repository/UserRepositoryMongodb");
const AuthenticationRepository = require("../Domains/authentications/AuthenticationRepository");
const AuthenticationRepositoryMongodb = require("./repository/AuthenticationRepositoryMongodb");
const ProductRepository = require("../Domains/products/ProductRepository");
const ProductRepositoryMongodb = require("./repository/ProductRepositoryMongodb");
const CartRepository = require("../Domains/carts/CartRepository");
const CartRepositoryMongodb = require("./repository/CartRepositoryMongodb");
const OrderRepository = require("../Domains/orders/OrderRepository");
const OrderRepositoryMongodb = require("./repository/OrderRepositoryMongodb");
const PasswordHash = require("../Applications/security/PasswordHash");
const CryptoJSPasswordHash = require("./security/CryptoJSPasswordHash");
const AuthenticationTokenManager = require("../Applications/security/AuthenticationTokenManager");
const JwtTokenManager = require("./security/JwtTokenManager");

// use case
const AddUserUseCase = require("../Applications/use_case/users/AddUserUseCase");
const LoginUserUseCase = require("../Applications/use_case/users/LoginUserUseCase");
const LogoutUserUseCase = require("../Applications/use_case/users/LogoutUserUseCase");
const RefreshAuthenticationUseCase = require("../Applications/use_case/authentications/RefreshAuthenticationUseCase");
const AddProductUseCase = require("../Applications/use_case/products/AddProductUseCase");
const DeleteProductUseCase = require("../Applications/use_case/products/DeleteProductUseCase");
const GetMultipleProductsUseCase = require("../Applications/use_case/products/GetMultipleProductsUseCase");
const GetProductUseCase = require("../Applications/use_case/products/GetProductUseCase");
const PutProductUseCase = require("../Applications/use_case/products/PutProductUseCase");
const AddCartUseCase = require("../Applications/use_case/carts/AddCartUseCase");
const DeleteCartUseCase = require("../Applications/use_case/carts/DeleteCartUseCase");
const GetCartUseCase = require("../Applications/use_case/carts/GetCartUseCase");
const PutCartUseCase = require("../Applications/use_case/carts/PutCartUseCase");
const AddOrderUseCase = require("../Applications/use_case/orders/AddOrderUseCase");
const DeleteOrderUseCase = require("../Applications/use_case/orders/DeleteOrderUseCase");
const GetUserOrdersUseCase = require("../Applications/use_case/orders/GetUserOrdersUseCase");
const PutOrderUseCase = require("../Applications/use_case/orders/PutOrderUseCase");

// creating container
const container = createContainer();

// registering services and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryMongodb,
    parameter: {
      dependencies: [
        {
          concrete: userCollection,
        },
      ],
    },
  },
  {
    key: AuthenticationRepository.name,
    Class: AuthenticationRepositoryMongodb,
    parameter: {
      dependencies: [
        {
          concrete: authCollection,
        },
      ],
    },
  },
  {
    key: ProductRepository.name,
    Class: ProductRepositoryMongodb,
    parameter: {
      dependencies: [
        {
          concrete: productCollection,
        },
      ],
    },
  },
  {
    key: CartRepository.name,
    Class: CartRepositoryMongodb,
    parameter: {
      dependencies: [
        {
          concrete: cartCollection,
        },
      ],
    },
  },
  {
    key: OrderRepository.name,
    Class: OrderRepositoryMongodb,
    parameter: {
      dependencies: [
        {
          concrete: orderCollection,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: CryptoJSPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: CryptoJS,
        },
      ],
    },
  },
  {
    key: AuthenticationTokenManager.name,
    Class: JwtTokenManager,
    parameter: {
      dependencies: [
        {
          concrete: Jwt,
        },
      ],
    },
  },
]);

// registering use cases
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
        {
          name: "passwordHash",
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LoginUserUseCase.name,
    Class: LoginUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
        {
          name: "authenticationTokenManager",
          internal: AuthenticationTokenManager.name,
        },
        {
          name: "passwordHash",
          internal: PasswordHash.name,
        },
      ],
    },
  },
  {
    key: LogoutUserUseCase.name,
    Class: LogoutUserUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
      ],
    },
  },
  {
    key: RefreshAuthenticationUseCase.name,
    Class: RefreshAuthenticationUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "authenticationRepository",
          internal: AuthenticationRepository.name,
        },
        {
          name: "authenticationTokenManager",
          internal: AuthenticationTokenManager.name,
        },
      ],
    },
  },
  {
    key: AddProductUseCase.name,
    Class: AddProductUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "productRepository",
          internal: ProductRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteProductUseCase.name,
    Class: DeleteProductUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "productRepository",
          internal: ProductRepository.name,
        },
      ],
    },
  },
  {
    key: GetMultipleProductsUseCase.name,
    Class: GetMultipleProductsUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "productRepository",
          internal: ProductRepository.name,
        },
      ],
    },
  },
  {
    key: GetProductUseCase.name,
    Class: GetProductUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "productRepository",
          internal: ProductRepository.name,
        },
      ],
    },
  },
  {
    key: PutProductUseCase.name,
    Class: PutProductUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "productRepository",
          internal: ProductRepository.name,
        },
      ],
    },
  },
  {
    key: AddCartUseCase.name,
    Class: AddCartUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "cartRepository",
          internal: CartRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteCartUseCase.name,
    Class: DeleteCartUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "cartRepository",
          internal: CartRepository.name,
        },
      ],
    },
  },
  {
    key: GetCartUseCase.name,
    Class: GetCartUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "cartRepository",
          internal: CartRepository.name,
        },
        {
          name: "userRepository",
          internal: UserRepository.name,
        },
        {
          name: "productRepository",
          internal: ProductRepository.name,
        },
      ],
    },
  },
  {
    key: PutCartUseCase.name,
    Class: PutCartUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "cartRepository",
          internal: CartRepository.name,
        },
      ],
    },
  },
  {
    key: AddOrderUseCase.name,
    Class: AddOrderUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "orderRepository",
          internal: OrderRepository.name,
        },
      ],
    },
  },
  {
    key: DeleteOrderUseCase.name,
    Class: DeleteOrderUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "orderRepository",
          internal: OrderRepository.name,
        },
      ],
    },
  },
  {
    key: GetUserOrdersUseCase.name,
    Class: GetUserOrdersUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "orderRepository",
          internal: OrderRepository.name,
        },
      ],
    },
  },
  {
    key: PutOrderUseCase.name,
    Class: PutOrderUseCase,
    parameter: {
      injectType: "destructuring",
      dependencies: [
        {
          name: "orderRepository",
          internal: OrderRepository.name,
        },
      ],
    },
  },
]);

module.exports = container;
