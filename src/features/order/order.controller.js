import OrderRepository from "./order.repository.js";

export default class OrderController{
    constructor(){
        this.orderRepository = new OrderRepository()
    }

    async placeOrder(req,res){
        try{
            await this.orderRepository.registerOrder(req.userId)
           return res.status(201).send("Order placed successfully!");
        }catch(err){
            res.status(404).send(err.message);
        }
    }
}