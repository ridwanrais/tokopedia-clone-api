class OrderRepository {
  async addOrder(addOrder) {
    throw new Error("ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async putOrder(orderId) {
    throw new Error("ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async deleteOrder(orderId) {
    throw new Error("ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async verifyOrderOwner(orderId, userId) {
    throw new Error("ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }

  async getUserOrders(orderId) {
    throw new Error("ORDER_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

module.exports = OrderRepository;
