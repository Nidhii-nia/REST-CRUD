import { MongoClient } from "mongodb";

let url = "mongodb://localhost:27017/";
let client;

export const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("MongoDB is connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDB = () => {
    return client.db('EcomDB');
}