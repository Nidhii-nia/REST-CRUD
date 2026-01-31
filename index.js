import express from "express";
import  productRouter from './src/features/product/product.routes.js';
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cart/cart.route.js";

const app = express();
app.use(express.json());

//for all requests related to product, redirect to product routes.
//localhost:3000/api/products
app.use("/api/products", productRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);


//Default request handler
app.get('/', (req,res)=>{
    res.send("Welcome to Ecommerce APIs");
})

app.listen(3000, ()=>{
console.log("App is listening on 3000");
});

