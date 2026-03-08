import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../middlewares/applicationError.middleware.js";
import UserRepository from "../user/user.repository.js";

class ProductRepository {
  constructor() {
    this.collection = "products";
    this.userRepository = new UserRepository();
  }

  async getAll() {
    const db = getDB();
    const cursor = db.collection(this.collection).find({});

    const products = [];

    for await (const doc of cursor) {
      products.push(doc);
    }

    if (products.length === 0) {
      throw new ApplicationError("No products!", 404);
    }

    return products;
  }

  async addProduct(product) {
    const db = getDB();
    let collection = db.collection(this.collection);
    const insert = await collection.insertOne({ ...product });
    const savedProduct = {
      ...insert,
      _id: insert.insertedId,
    };
    const { password, ...userWithoutPassword } = savedProduct;
    return userWithoutPassword;
  }

  async get(id) {
    const db = getDB();
    let product = await db
      .collection(this.collection)
      .findOne({ _id: new ObjectId(id) });
    if (product) {
      return product;
    } else {
      throw new ApplicationError(`No product with ${id} found!`, 404);
    }
  }

  async filter(minPrice, maxPrice, category) {
    const db = getDB();

    minPrice = minPrice ? parseFloat(minPrice) : null;
    maxPrice = maxPrice ? parseFloat(maxPrice) : null;
    category = category ? category : null;

    let query = {};

    if (minPrice !== null || maxPrice !== null) {
      query.price = {};

      if (minPrice !== null) {
        query.price.$gte = minPrice;
      }

      if (maxPrice !== null) {
        query.price.$lte = maxPrice;
      }
    }

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    const filteredProducts = await db
      .collection(this.collection)
      .find(query)
      .toArray();

    if (filteredProducts.length > 0) {
      return filteredProducts;
    } else {
      throw new ApplicationError("No Products found!", 404);
    }
  }

  async rateProducts(userId, productId, rating) {
    const db = getDB();
    const collection = db.collection(this.collection);
    if (rating < 1 || rating > 5) {
      throw new ApplicationError("Rating must be between 1 and 5", 400);
    }
    const result = await collection.updateOne(
      { _id: new ObjectId(productId), "ratings.userId": userId },
      { $set: { "ratings.$.rating": rating } },
    );

    if (result.matchedCount === 0) {
      const pushResult = await collection.updateOne(
        { _id: new ObjectId(productId) },
        { $push: { ratings: { userId: new ObjectId(userId), rating } } },
      );

      if (pushResult.matchedCount === 0) {
        throw new ApplicationError("Product not found", 404);
      }
    }
  }
}

export default ProductRepository;
