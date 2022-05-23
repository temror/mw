const Router = require('express')
const router = new Router
const userController = require('../controllers/user.controller')

router.post('/user',userController.createUser)
router.get('/users',userController.getUsers)
router.get('/users/:id',userController.getUSer)
router.put('/user',userController.updateUSer)
router.delete('/user',userController.deleteUser)

module.exports = router