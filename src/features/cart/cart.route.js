

import express from "express";
import CartController from "./cart.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js"

const cartRouter = express.Router();

const cartController = new CartController();



cartRouter.get('/',jwtAuth,cartController.getCart);
cartRouter.post('/add',jwtAuth,cartController.addCart);
cartRouter.delete('/delete/:id',jwtAuth,cartController.deleteCart);

export default cartRouter;