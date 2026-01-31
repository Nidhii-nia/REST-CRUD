import CartModel from "./cart.model.js";


export default class CartController{
    getCart(req,res){
        const cart = CartModel.getAllCartItems();
        res.status(200).send(cart);
    }

    addCart(req,res){
        const {productId , quantity} = req.query;
        const userId  = req.userId;
        const error = CartModel.addTocart(productId,userId,quantity);
        if(error){
            return res.status(400).send(error);
        }

        return res.status(200).send("Product added successfully!");
    }

    deleteCart(req,res){
        const id = req.params.id;
        const userId  = req.userId;
        const result = CartModel.deleteFromCart(userId,id);

        res.status(200).send(result);
    }


}