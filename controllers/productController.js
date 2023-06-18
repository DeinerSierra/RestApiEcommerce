const Product = require('../models/ProductModel')

exports.create = async(req, res, next) => {
    try {
        const newProduct = new Product(req.body)
        const productDB = await newProduct.save();
        res.status(200).json({message:'New Product Created',productDB})
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.getAll = async(req, res, next) => {
    const newProd = req.query.new;
    const prodCategory = req.query.category;
    try {
        let products;
        if (newProd) {
            products = await Product.find().sort({createdAt: -1}).limit(5)
        }
        else if (prodCategory) {
            products = await Product.find({categories:{$in:[prodCategory]}}).sort({createdAt: -1}).limit(5)
        }else{
            products = await Product.find();
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.getById = async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.updateById = async(req, res, next) => {
    try {
        const updateProd = await Product.findByIdAndUpdate(req.params,{$set:req.body},{new: true})
        res.status(200).json({message:'Product updated',updateProd})
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.deleteById = async(req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'Product has been deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
}