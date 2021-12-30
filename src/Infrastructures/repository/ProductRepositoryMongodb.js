const InvariantError = require("../../Commons/exceptions/InvariantError");
const AuthorizationError = require("../../Commons/exceptions/AuthorizationError");
const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const AddedProduct = require("../../Domains/products/entities/AddedProduct");
const ProductDetail = require("../../Domains/products/entities/ProductDetail");
const ProductRepository = require("../../Domains/products/ProductRepository");
const Product = require("../database/mongodb/models/Product");
const ObjectId = require("mongodb").ObjectId;

class ProductRepositoryMongodb extends ProductRepository {
  constructor(collection) {
    super();
    this._collection = collection;
  }

  async addProduct(addProduct) {
    const newProduct = new Product({
      ...addProduct,
    });

    const result = await this._collection.insertOne(newProduct);
    const id = result.insertedId.toString();

    return new AddedProduct({ id, ...addProduct });
  }

  async getProduct(productId) {
    const result = await this._collection.findOne({
      _id: productId,
    });

    if (!result) {
      throw new NotFoundError("product yang dicari tidak ditemukan");
    }

    const id = result._id.toString();

    return new ProductDetail({
      ...result,
      id,
      createdAt: ObjectId(result._id).getTimestamp().toString(),
    });
  }

  async getAllProducts() {
    const productArray = await this._collection.find({}).toArray();

    if (!productArray.length) {
      throw new InvariantError("product tidak ditemukan");
    }

    return productArray;
  }

  async getProductsByCategory(category) {
    const productArray = await this._collection
      .find({ categories: { $all: [category] } })
      .toArray();

    if (!productArray.length) {
      throw new InvariantError("product tidak ditemukan");
    }

    return productArray;
  }

  async getProductsByProductIds(productIds) {
    const productArray = await this._collection
      .find({ _id: { $in: productIds } })
      .toArray();

    if (!productArray.length) {
      throw new InvariantError("product tidak ditemukan");
    }

    return productArray;
  }

  async putProduct(putProduct) {
    const productId = putProduct.productId;

    const result = await this._collection.findOneAndUpdate(
      { _id: productId },
      {
        $set: putProduct,
      },
      { returnDocument: "after" }
    );

    return result.value;
  }

  async verifyProductExistence(productId) {
    const result = await this._collection.findOne({ _id: productId });

    if (!result) {
      throw new NotFoundError("product yang dicari tidak ditemukan");
    }
  }

  async verifyProductOwner(productId, userId) {
    const result = await this._collection.findOne({
      _id: productId,
      sellerId: userId,
    });

    if (!result) {
      throw new AuthorizationError("Anda tidak berhak melakukan perintah ini");
    }
  }

  async deleteProduct(productId) {
    const result = await this._collection.findOneAndDelete({ _id: productId });

    if (!result.value) {
      throw new NotFoundError("product tidak ditemukan");
    }

    return result.value;
  }
}

module.exports = ProductRepositoryMongodb;
