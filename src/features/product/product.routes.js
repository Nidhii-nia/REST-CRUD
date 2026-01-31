import express from "express";
import ProductController from "./product.controller.js";
import uploadFile from "../../middlewares/file_upload.middleware.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";


const productRouter = express.Router();

const productController = new ProductController();

productRouter.post('/rate',jwtAuth,productController.postRateProduct);
//localhost:3000/api/products/filter?minPrice=10&maxPrice=20&category=Clothes
productRouter.get("/filter", jwtAuth,productController.filterProduct);
//All the paths to controller methods.
//localhost:3000/api/products
productRouter.get("/", jwtAuth,productController.getAllProducts);
productRouter.get("/:id",jwtAuth,productController.getOneProduct);
productRouter.post("/",jwtAuth, uploadFile.single("imgUrl"), productController.addProduct);



export default productRouter;
