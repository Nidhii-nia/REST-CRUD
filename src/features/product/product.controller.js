import ProductModel from "./product.model.js";

export default class ProductController{

    getAllProducts(req,res){
        const products = ProductModel.getAll();
        res.status(200).send(products);
    }

    addProduct(req,res){
        const {name,price,sizes} = req.body;
        const newProduct = {
            name,
            price:parseFloat(price),
            sizes:sizes.split(','),
            imgUrl: req.file.filename,
        }

        const createdRecord = ProductModel.AddProduct(newProduct);
        res.status(201).send(createdRecord);
        
    }

    rateProduct(req,res){

    }

    getOneProduct(req,res){
        const id = req.params.id;
        const product = ProductModel.get(id);
        if(!product){
            res.status(404).send("Product not found");
        }else{
            return res.status(200).send(product);
        }
    }

    filterProduct(req,res){
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;

        console.log("FILTER PATH");
        

        console.log("req.query: ",req.query);
        console.log("minPrice,maxPrice,category", minPrice ,maxPrice, category);
        
        

        const product = ProductModel.filter(minPrice,maxPrice,category);
        res.status(200).send(product);
    }

    postRateProduct(req,res){
        const {userId,productId,rating} = req.query;
        const error = ProductModel.rateProducts(userId,productId,rating);

        if(error){
            res.status(400).send(error);
        }else{
            res.status(200).send(`Product with id ${productId} rated with ${rating} successfully!`);
        }
    }


}