import CartModel from "./cart.model.js";
import CartRepository from "./cart.repository.js";

export default class CartController {
  constructor() {
    this.cartRepository = new CartRepository();
  }

  getCart = async (req, res) => {
    try {
      const cart = await this.cartRepository.getAllCartItems();
      return res.status(200).send(cart);
    } catch (err) {
      return res.status(404).send(err.message);
    }
  };

  addCart = async (req, res, next) => {
    try { 
      const { productId, quantity } = req.body;
      const userId = req.userId;
      const item = new CartModel(productId, userId, quantity)
     const result =  await this.cartRepository.addTocart(item);
      return res.status(200).send(result);
    } catch (err) {
      console.log("Add cart error");
      return res.status(404).send(err.message);
    }
  };

  deleteCart = async (req, res, next) => {
    try {
      const id = req.params.id;
      const userId = req.userId;
      const result = await this.cartRepository.deleteFromCart(userId, id);

      res.status(200).send(result);
    } catch (err) {
      console.log("Delete cart error");
      return res.status(404).send(err.message);
    }
  };
}
