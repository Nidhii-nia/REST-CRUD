import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getAllProducts(req, res, next) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      return res.status(404).send(err.message);
    }
  }

async addProduct(req, res) {
  const { name, desc, category, price, sizes } = req.body;

  const newProduct = new ProductModel(
    name,
    desc,
    req.file.filename,
    category,
    parseFloat(price),
    sizes.split(",")
  );

  const createdRecord = await this.productRepository.addProduct(newProduct);
  res.status(201).send(createdRecord);
}


  rateProduct(req, res) {}

  async getOneProduct(req, res) {
 try{
      const product = await this.productRepository.get(req.params.id);
  return res.status(200).send(product);
 }catch(err){
    console.log(err);
    return res.status(404).send(err.message)
 }
  }

  async filterProduct(req, res) {
   try{
     const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;

    console.log("FILTER PATH");

    console.log("req.query: ", req.query);

    const product = await this.productRepository.filter(minPrice, maxPrice, category);
    return res.status(200).send(product);
   }catch(err){
    console.log(err);
    return res.status(404).send(err.message)
   }
  }

 async postRateProduct(req, res, next) {
    try {
      const { productId, rating } = req.query;
      await this.productRepository.rateProducts(req.userId, productId, rating);

      res
        .status(200)
        .send(
          `Product with id ${productId} rated with ${rating} successfully!`,
        );
    } catch (err) {
      console.log("Rate cart error");
      res.status(404).send(err.message);
    }
  }
}
