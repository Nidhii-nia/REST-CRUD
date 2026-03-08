import mongoose from "mongoose";

export const connectUsingMongoose = async() =>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected");
        
    }catch(err){
        console.log(err.message);
        
    }
}