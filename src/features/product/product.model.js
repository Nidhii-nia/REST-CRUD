import UserModel from "../user/user.model.js";
import { ApplicationError } from "../../middlewares/applicationError.middleware.js";

export default class ProductModel {
  constructor(id, name, desc, imgUrl, category, price, sizes) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.imgUrl = imgUrl;
    this.category = category;
    this.price = price;
    this.sizes = sizes;
  }

  static getAll() {
    return products;
  }

  static AddProduct(product) {
    const maxId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0;
    product.id = maxId + 1;
    products.push(product);
    return products;
  }

  static get(id) {
    const product = products.find((p) => p.id == id);
    return product;
  }

  static filter(minPrice, maxPrice, category) {
    const min = minPrice ? parseFloat(minPrice) : null;
    const max = maxPrice ? parseFloat(maxPrice) : null;
    const cat = category ? String(category).trim().toLowerCase() : null;

    const filteredProducts = products.filter(p => {
        const prodPrice = parseFloat(p.price);
        const prodCategory = String(p.category).trim().toLowerCase();

        const priceInRange = (!min || prodPrice >= min ) && (!max || prodPrice <= max);
        const catMatch = !cat || prodCategory === cat;

        return priceInRange && catMatch;
    })

    return filteredProducts;
  }

  static rateProducts(userId,productId,rating){
    //1. check if user exists
    const userExists = UserModel.getAll().find(u => u.id == userId);
    if(!userExists){
      throw new ApplicationError("User not Found!",404);
    }

    //2. Product exists?
    const productExists = this.get(productId);
    if(!productExists){
      throw new ApplicationError("Product does not exist!",404);
    }

    //3. Ratings exists?
    if(!productExists.ratings){
      productExists.ratings = [];
      productExists.ratings.push({userId:userId,rating:rating});
    }else{
      //4.check if ratings exists for that particular user
      const findUserRating = productExists.ratings.findIndex(r => r.userId == userId);
      if(findUserRating>=0){
        productExists.ratings[findUserRating] = {userId:userId,rating:rating};
      }else{
        //5. insert that rating in the array if the user has not rated before
      productExists.ratings.push({userId:userId,rating:rating});
      }
    }
}
}

// Create an array of 10 product objects
let products = [
  new ProductModel(
    1,
    "Classic White T-Shirt",
    "Premium 100% cotton t-shirt with comfortable fit",
    "https://example.com/images/tshirt-white.jpg",
    "Clothing",
    24.99,
    ["S", "M", "L", "XL"],
  ),
  new ProductModel(
    2,
    "Wireless Bluetooth Headphones",
    "Noise-cancelling headphones with 30-hour battery life",
    "https://example.com/images/headphones-black.jpg",
    "Electronics",
    129.99,
    ["One Size"],
  ),
  new ProductModel(
    3,
    "Stainless Steel Water Bottle",
    "Insulated 32oz bottle that keeps drinks cold for 24 hours",
    "https://example.com/images/bottle-steel.jpg",
    "Home & Kitchen",
    34.99,
    ["750ml", "1L"],
  ),
  new ProductModel(
    4,
    "Running Shoes",
    "Lightweight athletic shoes with breathable mesh upper",
    "https://example.com/images/shoes-running.jpg",
    "Footwear",
    89.99,
    ["US 7", "US 8", "US 9", "US 10", "US 11"],
  ),
  new ProductModel(
    5,
    "Organic Coffee Beans",
    "Dark roast arabica beans from Ethiopia",
    "https://example.com/images/coffee-beans.jpg",
    "Food & Beverage",
    16.99,
    ["250g", "500g", "1kg"],
  ),
  new ProductModel(
    6,
    "Leather Wallet",
    "Genuine leather bifold wallet with multiple card slots",
    "https://example.com/images/wallet-brown.jpg",
    "Accessories",
    49.99,
    ["Standard"],
  ),
  new ProductModel(
    7,
    "Yoga Mat",
    "Non-slip, eco-friendly yoga mat with carrying strap",
    "https://example.com/images/yoga-mat.jpg",
    "Fitness",
    29.99,
    ['68"', '72"'],
  ),
  new ProductModel(
    8,
    "Smart Watch",
    "Fitness tracker with heart rate monitor and GPS",
    "https://example.com/images/smart-watch.jpg",
    "Electronics",
    199.99,
    ["Small", "Medium", "Large"],
  ),
  new ProductModel(
    9,
    "Ceramic Coffee Mug",
    "Handcrafted ceramic mug with unique glaze pattern",
    "https://example.com/images/mug-ceramic.jpg",
    "Home & Kitchen",
    18.99,
    ["350ml", "450ml"],
  ),
  new ProductModel(
    10,
    "Denim Jacket",
    "Classic denim jacket with vintage wash",
    "https://example.com/images/jacket-denim.jpg",
    "Clothing",
    79.99,
    ["XS", "S", "M", "L", "XL"],
  ),
];
