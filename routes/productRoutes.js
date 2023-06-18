const router = require('express').Router()
const productController = require('../controllers/productController')
const { verifyTokenAndAdmin } = require('../config/verificarToken');
router.get('/', (req, res) => {
  res.send('GET request to the homepage')
})
router.post('/create',verifyTokenAndAdmin, productController.create)
router.put('/update/:id',verifyTokenAndAdmin, productController.updateById)
router.delete('/delete/:id',verifyTokenAndAdmin, productController.deleteById)
router.get('/get-product/:id', productController.getById)
router.get('/get-products',verifyTokenAndAdmin, productController.getAll)
module.exports = router;