import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  name: String,
  desc: String,
  imgUrl: String,
  category: String,
  price: Number,
  sizes: [String],
  ratings: [
    {
      userId: {type:mongoose.Schema.Types.ObjectId,ref:'users'},
      rating: Number,
    },
  ],
  stock:Number
});
