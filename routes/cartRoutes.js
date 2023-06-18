const router = require('express').Router()
const cartController = require('../controllers/cartController')
const { verifyTokenAndAdmin,verifyToken, verifyTokenAuthorization } = require('../config/verificarToken');
router.get('/', (req, res) => {
  res.send('GET request to the homepage')
})
router.post('/create',verifyToken, cartController.create)
router.put('/update/:id',verifyTokenAuthorization, cartController.updateById)
router.delete('/delete/:id',verifyTokenAuthorization, cartController.deleteById)
router.get('/get-cart/:userId',verifyTokenAuthorization, cartController.getById)
router.get('/get-carts',verifyTokenAndAdmin, cartController.getAll)
module.exports = router;