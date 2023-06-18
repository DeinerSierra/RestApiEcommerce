const router = require('express').Router()
const orderController = require('../controllers/orderController')
const { verifyTokenAndAdmin,verifyToken, verifyTokenAuthorization } = require('../config/verificarToken');
router.get('/', (req, res) => {
  res.send('GET request to the homepage')
})
router.post('/create',verifyToken, orderController.create)
router.put('/update/:id',verifyTokenAndAdmin, orderController.updateById)
router.delete('/delete/:id',verifyTokenAndAdmin, orderController.deleteById)
router.get('/get-order/:userId',verifyTokenAuthorization, orderController.getById)
router.get('/get-order-all',verifyTokenAndAdmin, orderController.getAll)
router.get('/income',verifyTokenAndAdmin,orderController.getIncomes)
module.exports = router;