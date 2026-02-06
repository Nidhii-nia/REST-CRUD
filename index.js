// import express, { json } from "express";
// import  productRouter from './src/features/product/product.routes.js';
// import userRouter from "./src/features/user/user.routes.js";
// import cartRouter from "./src/features/cart/cart.route.js";
// import swagger from "swagger-ui-express";
// import apiDocs from "./swagger.json" assert {type: "json"};

// const app = express();
// app.use(express.json());

// //for all requests related to product, redirect to product routes.
// //localhost:3000/api/products
// app.use("/api-docs",swagger.serve, swagger.setup(apiDocs));
// app.use("/api/products", productRouter);
// app.use("/api/user", userRouter);
// app.use("/api/cart", cartRouter);


// //Default request handler
// app.get('/', (req,res)=>{
//     res.send("Welcome to Ecommerce APIs");
// })

// app.listen(3000, ()=>{
// console.log("App is listening on 3000");
// });


import dotenv from "dotenv";
import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cart/cart.route.js";
import swagger from "swagger-ui-express";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { STATUS_CODES } from "http";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiDocs = JSON.parse(
  fs.readFileSync(path.join(__dirname, "swagger.json"), "utf-8")
);

const app = express();
app.use(express.json());

// Swagger docs
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

// Routes
app.use("/api/products", productRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Ecommerce APIs");
});

//Middleware for Invalid Paths
app.use((req,res)=>{
  res.status(404).send(`404 : API not found!`)
})

app.listen(3000, () => {
  console.log("App is listening on 3000");
});

