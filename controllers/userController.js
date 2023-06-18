const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.getStats = async(req, res, next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    try {
        const data = await User.aggregate([
            {$match: {createdAt:{$gte: lastYear}}},
            {$project:{
                month:{$month: "$createdAt"},
            }},
            {$group:{
                _id:"$month",
                total:{$sum: 1},
            }}
            
        ])
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.getAll = async(req, res, next) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find()
        
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.getById = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        const {password,...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.updateById = async(req, res, next) => {
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashPass
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json({message:'User updated',updatedUser})
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.deleteById = async(req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'User has been deleted'})
    } catch (error) {
        res.status(500).json(error)
    }
}