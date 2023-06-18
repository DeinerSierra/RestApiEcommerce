const router = require('express').Router()
const authController = require('../controllers/authController')
router.get('/', (req, res) => {
  res.send('GET request to the homepage')
})
router.post('/register',authController.register)
router.post('/login',authController.login)
module.exports = router;