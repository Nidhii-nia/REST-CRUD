import express from "express";
import ProductController from "./product.controller.js";
import uploadFile from "../../middlewares/file_upload.middleware.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";


const productRouter = express.Router();

const productController = new ProductController();

productRouter.post('/rate',jwtAuth,(req,res)=>{
    productController.postRateProduct(req,res);
});
//localhost:3000/api/products/filter?minPrice=10&maxPrice=20&category=Clothes
productRouter.get("/filter", jwtAuth,(req,res)=>{productController.filterProduct(req,res)});
//All the paths to controller methods.
//localhost:3000/api/products
productRouter.get("/", jwtAuth,(req,res)=>{
    productController.getAllProducts(req,res)
});
productRouter.get("/:id",jwtAuth,(req,res)=>{
    productController.getOneProduct(req,res);
});
productRouter.post("/",jwtAuth, uploadFile.single("imgUrl"),(req,res)=>{
    productController.addProduct(req,res);
} );



export default productRouter;
