const Cart = require('../models/CartModel')

exports.create = async(req, res, next) => {
    try {
        const newCart = new Cart(req.body)
        const cartDB = await newCart.save();
        res.status(200).json({message:'New Cart Created',cartDB})
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.getAll = async(req, res, next) => {

    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.getById = async(req, res, next) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId})
        
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.updateById = async(req, res, next) => {
    try {
        const updateCart = await Cart.findByIdAndUpdate(req.params,{$set:req.body},{new: true})
        res.status(200).json({message:'Cart updated',updateCart})
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.deleteById = async(req, res, next) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'Product has been deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
}