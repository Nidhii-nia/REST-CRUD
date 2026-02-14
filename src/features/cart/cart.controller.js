import CartModel from "./cart.model.js";

export default class CartController {
  getCart(req, res) {
    const cart = CartModel.getAllCartItems();
    res.status(200).send(cart);
  }

  addCart(req, res, next) {
    try {
      const { productId, quantity } = req.query;
      const userId = req.userId;
      CartModel.addTocart(productId, userId, quantity);

      return res.status(200).send("Product added successfully!");
    } catch (err) {
      console.log("Add cart error");
      next(err);
    }
  }

  deleteCart(req, res, next) {
    try {
      const id = req.params.id;
      const userId = req.userId;
      const result = CartModel.deleteFromCart(userId, id);

      res.status(200).send(result);
    } catch (err) {
      console.log("Delete cart error");
      next(err);
    }
  }
}
