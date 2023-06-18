const router = require('express').Router()
const userController = require('../controllers/userController')
const { verifyToken, verifyTokenAuthorization,verifyTokenAndAdmin } = require('../config/verificarToken');

router.put('/update/:id',verifyTokenAuthorization, userController.updateById )
router.delete('/delete/:id',verifyTokenAuthorization, userController.deleteById)
router.get('/get-user/:id',verifyTokenAndAdmin, userController.getById )
router.get('/get-users',verifyTokenAndAdmin, userController.getById )
router.get('/get-stats',verifyTokenAndAdmin, userController.getStats )
module.exports = router;