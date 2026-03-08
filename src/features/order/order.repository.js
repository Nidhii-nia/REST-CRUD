import { ObjectId } from "mongodb";
import { getDB, getClient } from "../../config/mongodb.js";
import ApplicationError from "../../middlewares/applicationError.middleware.js";
import ObjectModel from "../order/order.model.js";

export default class OrderRepository {
  constructor() {
    this.collectionName = "orders";
  }

  async registerOrder(userId) {
    const client = getClient();
    const session = client.startSession();

    try {
      session.startTransaction();

      const db = getDB();
      const collection = db.collection(this.collectionName);

      // Get cart items and total amount
      const items = await this.getTotalAmount(userId, session);

      if (items.length === 0) {
        throw new ApplicationError("Cart is empty", 400);
      }

      const finalTotalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );

      // Create new order
      const newOrder = new ObjectModel(
        new ObjectId(userId),
        finalTotalAmount,
        new Date() // better than toLocaleString()
      );

      await collection.insertOne(newOrder, { session });

      // Decrease stock safely
      for (let item of items) {
        const result = await db.collection("products").updateOne(
          {
            _id: item.productId,
            stock: { $gte: item.quantity } // prevent negative stock
          },
          {
            $inc: { stock: -item.quantity }
          },
          { session }
        );

        if (result.modifiedCount === 0) {
          throw new ApplicationError("Product out of stock", 400);
        }
      }

      // Clear cart
      await db.collection("cart").deleteMany(
        {
          userId: new ObjectId(userId)
        },
        { session }
      );

      // Commit transaction
      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw new ApplicationError(err.message, 500);
    } finally {
      await session.endSession();
    }
  }

  async getTotalAmount(userId, session) {
    try {
      const db = getDB();

      const items = await db
        .collection("cart")
        .aggregate(
          [
            // Get cart items for the user
            {
              $match: { userId: new ObjectId(userId) }
            },

            // Join products collection
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "ProductInfo"
              }
            },

            // Convert product array to object
            {
              $unwind: "$ProductInfo"
            },

            // Calculate total amount per item
            {
              $addFields: {
                totalAmount: {
                  $multiply: ["$ProductInfo.price", "$quantity"]
                }
              }
            }
          ],
          { session }
        )
        .toArray();

      return items;
    } catch (err) {
      throw new ApplicationError(err.message, 500);
    }
  }
}