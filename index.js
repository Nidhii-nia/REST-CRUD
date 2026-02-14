import dotenv from "dotenv";
import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cart/cart.route.js";
import swagger from "swagger-ui-express";
import loggerMiddleware from "./src/middlewares/logs.middleware.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ApplicationError } from "./src/middlewares/applicationError.middleware.js";
import winston from "winston";
import {connectToMongoDB} from "./src/config/mongodb.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiDocs = JSON.parse(
  fs.readFileSync(path.join(__dirname, "swagger.json"), "utf-8"),
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

// Logger middleware
app.use(loggerMiddleware);

//Middleware for Invalid Paths
app.use((req, res) => {
  res
    .status(404)
    .send(
      `404 : API not found! Please check our swagger documentation for correct paths.`,
    );
});

app.use((err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.code).json({
      success: false,
      message: err.message,
    });
  }

  const errLog = winston.createLogger({
    level: "error",
    format:winston.format.json(),
    transports: new winston.transports.File({filename: "errors.log"})
  })
  errLog.error(err.stack);
  return res.status(500).send("Something went wrong please try again later");
});

app.listen(3000, () => {
  console.log("App is listening on 3000");
  connectToMongoDB();
});
