import express from 'express'
import usersController from '../controller/users.js'
import verifyAdmin from '../middleware/verifyAdmin.js'
import verifyAuth from '../middleware/verifyAuth.js'
const router = express.Router()

router.get('/getallusers',verifyAuth,verifyAdmin,usersController.getAllUsers)
router.post('/createUser',usersController.createUser)
router.post('/login',usersController.login)
router.put('/edituserbyid/:id',verifyAuth,usersController.editUserById)
router.delete('/:id',verifyAuth,usersController.deleteUserById)
router.put('/updatestatus/:id',verifyAdmin,verifyAuth,usersController.updateStatus)
router.get('/getuserbyid/:id',verifyAuth,usersController.getUserById)

export default router