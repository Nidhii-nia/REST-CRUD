import { MongoClient } from "mongodb";

let client;

export const connectToMongoDB = async () => {
  try {
    client = new MongoClient(process.env.DB_URL);
    await client.connect();

    const db = client.db("EcomDB");

    await createCounter(db);
    await createIndex(db);

    console.log("MongoDB is connected");
  } catch (err) {
    console.log(err);
  }
};

export const getClient = () =>{
  return client;
}

export const getDB = () => {
  if (!client) {
    throw new Error("Database not connected!");
  }
  return client.db("EcomDB");
};

const createCounter = async (db) => {
  const existingCounter = await db
    .collection("counters")
    .findOne({ _id: "cartItemId" });

  if (!existingCounter) {
    await db.collection("counters").insertOne({
      _id: "cartItemId",
      value: 0,
    });
  }
};

const createIndex = async (db) => {
  try {
    await db.collection("products").createIndex({ price: 1 });

    await db.collection("cart").createIndex(
      { productId: 1, userId: 1 },
      { unique: true }
    );

  } catch (err) {
    console.log(err.message);
  }
};