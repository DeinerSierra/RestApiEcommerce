const Order = require('../models/Order')

exports.create = async(req, res, next) => {
    try {
        const newOrder = new Order(req.body)
        const orderDB = await newOrder.save();
        res.status(200).json({message:'New order Created',orderDB})
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.getAll = async(req, res, next) => {

    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.getById = async(req, res, next) => {
    try {
        const orders = await Order.find({userId: req.params.userId});
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.updateById = async(req, res, next) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params,{$set:req.body},{new: true})
        res.status(200).json({message:'Order updated',updateOrder})
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.deleteById = async(req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'Order has been deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.getIncomes = async (req,res) => {
    const date =  new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))
    try {
        const income = await Order.aggregate([
            {$match: {createdAt:{$gte: previousMonth}}},
            {$project:{month:{$month:"$createdAt"},sales:"$amount"}},
            {$group:{_id:"$month",total:{$sum:"$sales"}}},

        ]);
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json(error)
    }
}