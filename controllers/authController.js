const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.register = async(req, res, next) => {
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPass
    })
    try {
        const userDB = await user.save();
        const {password,...others} = userDB._doc
        res.status(200).json(others)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
exports.login = async(req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if (!user) {
            return res.status(400).json('User does not exist!')
        }
        const validar = await bcrypt.compare(req.body.password, user.password)
        if (!validar) {
            return res.status(400).json('Wrong password!!')
        }
        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin},process.env.JWT_KEY,{expiresIn:"1d"});
        const {password,...others} = user._doc;
        res.status(200).json({message:'Login successfully',...others,accessToken})
    } catch (error) {
        res.status(500).json(error)
    }
}
