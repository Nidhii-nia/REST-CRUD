import { ApplicationError } from "../../middlewares/applicationError.middleware.js";
import ProductModel from "../product/product.model.js";
import UserModel from "../user/user.model.js";

export default class CartModel {
  constructor(productId, userId, quantity, id) {
    this.productId = productId;
    this.userId = userId;
    this.quantity = quantity;
    this.id = id;
  }

  static getAllCartItems() {
    return cart;
  }

  static addTocart(productId, userId, quantity) {
    const user = UserModel.getAll().find((u) => u.id == userId);
    const product = ProductModel.getAll().find((p) => p.id == productId);
    if (!user) {
     throw new ApplicationError("User does not exist!",404);
    }
    if (!product) {
      throw new ApplicationError("Product does not exist!",404);
    }

    const userProdIndex = cart.findIndex(
      (p) => p.userId == userId && p.productId == productId,
    );

    if (userProdIndex >= 0) {
      let cartId = cart[userProdIndex].id;
      cart[userProdIndex] = {
        productId: productId,
        userId: userId,
        quantity: quantity,
        id: cartId,
      };
    } else {
      let maxId = cart.length > 0 ? Math.max(...cart.map((c) => c.id)) : 0;
      cart.push({
        productId: productId,
        userId: userId,
        quantity: quantity,
        id: maxId + 1,
      });
    }
  }

  static deleteFromCart(userId,id){
    const findId = cart.findIndex(c => c.userId == userId &&c.id == id);
    if(findId === -1){
        throw new ApplicationError("Product does not exist!",404);
    }

    cart.splice(findId,1);

    return cart;
  }
}

let cart = [
  new CartModel(1, 2, 1, 1),
  new CartModel(5, 3, 1, 2),
  new CartModel(6, 4, 1, 3),
];
