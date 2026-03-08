

export default class ProductModel {
  constructor(name, desc, imgUrl, category, price, sizes) {
    this.name = name;
    this.desc = desc;
    this.imgUrl = imgUrl;
    this.category = category;
    this.price = price;
    this.sizes = sizes;
    this.ratings = [];
  }
}


// Create an array of 10 product objects
// let products = [
//   new ProductModel(
//     1,
//     "Classic White T-Shirt",
//     "Premium 100% cotton t-shirt with comfortable fit",
//     "https://example.com/images/tshirt-white.jpg",
//     "Clothing",
//     24.99,
//     ["S", "M", "L", "XL"],
//   ),
//   new ProductModel(
//     2,
//     "Wireless Bluetooth Headphones",
//     "Noise-cancelling headphones with 30-hour battery life",
//     "https://example.com/images/headphones-black.jpg",
//     "Electronics",
//     129.99,
//     ["One Size"],
//   ),
//   new ProductModel(
//     3,
//     "Stainless Steel Water Bottle",
//     "Insulated 32oz bottle that keeps drinks cold for 24 hours",
//     "https://example.com/images/bottle-steel.jpg",
//     "Home & Kitchen",
//     34.99,
//     ["750ml", "1L"],
//   ),
//   new ProductModel(
//     4,
//     "Running Shoes",
//     "Lightweight athletic shoes with breathable mesh upper",
//     "https://example.com/images/shoes-running.jpg",
//     "Footwear",
//     89.99,
//     ["US 7", "US 8", "US 9", "US 10", "US 11"],
//   ),
//   new ProductModel(
//     5,
//     "Organic Coffee Beans",
//     "Dark roast arabica beans from Ethiopia",
//     "https://example.com/images/coffee-beans.jpg",
//     "Food & Beverage",
//     16.99,
//     ["250g", "500g", "1kg"],
//   ),
//   new ProductModel(
//     6,
//     "Leather Wallet",
//     "Genuine leather bifold wallet with multiple card slots",
//     "https://example.com/images/wallet-brown.jpg",
//     "Accessories",
//     49.99,
//     ["Standard"],
//   ),
//   new ProductModel(
//     7,
//     "Yoga Mat",
//     "Non-slip, eco-friendly yoga mat with carrying strap",
//     "https://example.com/images/yoga-mat.jpg",
//     "Fitness",
//     29.99,
//     ['68"', '72"'],
//   ),
//   new ProductModel(
//     8,
//     "Smart Watch",
//     "Fitness tracker with heart rate monitor and GPS",
//     "https://example.com/images/smart-watch.jpg",
//     "Electronics",
//     199.99,
//     ["Small", "Medium", "Large"],
//   ),
//   new ProductModel(
//     9,
//     "Ceramic Coffee Mug",
//     "Handcrafted ceramic mug with unique glaze pattern",
//     "https://example.com/images/mug-ceramic.jpg",
//     "Home & Kitchen",
//     18.99,
//     ["350ml", "450ml"],
//   ),
//   new ProductModel(
//     10,
//     "Denim Jacket",
//     "Classic denim jacket with vintage wash",
//     "https://example.com/images/jacket-denim.jpg",
//     "Clothing",
//     79.99,
//     ["XS", "S", "M", "L", "XL"],
//   ),
// ];
