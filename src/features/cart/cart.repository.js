import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../../middlewares/applicationError.middleware.js";
import { ObjectId } from "mongodb";

export default class CartRepository {
  constructor() {
    this.collectionName = "cart";
  }
  async getAllCartItems() {
    const db = getDB();
    const collection = db.collection(this.collectionName);
    const cart = await collection.find();
    let doc = [];
    let item;
    for await (item of cart) {
      doc.push(item);
    }
    if (doc.length > 0) {
      return doc;
    } else {
      throw new ApplicationError("No items in the cart", 404);
    }
  }

  async addTocart(item) {
    try {
      const db = getDB();
      let collection = db.collection(this.collectionName);
      const id = await this.getNextCounter(db);
      console.log("Generated ID:", id);

      await collection.updateOne(
        {
          productId: new ObjectId(item.productId),
          userId: new ObjectId(item.userId),
        },
        {
          $inc: { quantity: item.quantity },
          $setOnInsert: {
            _id: id,
            productId: new ObjectId(item.productId),
            userId: new ObjectId(item.userId),
          },
        },
        { upsert: true },
      );
      return {
        msg: "Added to cart successfully",
        ...item,
      };
    } catch (err) {
      throw new ApplicationError(err.message, 500);
    }
  }

  async deleteFromCart(userId, id) {
    try {
      const db = getDB();
      let collection = db.collection(this.collectionName);
      const result = await collection.deleteOne({
        _id: new ObjectId(id),
        userId: new ObjectId(userId),
      });
      return result.deletedCount > 0;
    } catch (err) {
      throw new ApplicationError(err.message, 500);
    }
  }

  async getNextCounter(db) {
    const result = await db
      .collection("counters")
      .findOneAndUpdate(
        { _id: "cartItemId" },
        { $inc: { value: 1 } },
        { returnDocument: "after", upsert: true },
      );

    if (!result.value) {
      throw new Error("Counter document not found");
    }

    return result.value;
  }
}

// let cart = [
//   new CartModel(1, 2, 1, 1),
//   new CartModel(5, 3, 1, 2),
//   new CartModel(6, 4, 1, 3),
// ];
