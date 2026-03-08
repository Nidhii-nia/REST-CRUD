import express from "express";
import OrderController from "./order.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";


const orderRouter = express.Router();

const orderController = new OrderController();

orderRouter.post('/',jwtAuth,(req,res)=>{
    orderController.placeOrder(req,res);
});

export default orderRouter;