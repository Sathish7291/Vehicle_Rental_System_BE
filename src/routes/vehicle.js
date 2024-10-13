import express from 'express'
import vehicleController from '../controller/vehicle.js'
import verifyAuth from '../middleware/verifyAuth.js'
import verifyAdmin from '../middleware/verifyAdmin.js'
const router = express.Router()


router.post('/addvehicle',verifyAuth,vehicleController.addVehicle)
router.get('/getvehiclebyid/:id',verifyAuth,vehicleController.getvehicleById)
router.get('/getallvehicles',verifyAuth,vehicleController.getAllVehicles)
router.get('/getallapprovedvehicles',verifyAuth,vehicleController.getAllApprovedVehicles)
router.get('/getvehiclesbyuserid',verifyAuth,vehicleController.getVehiclesByUserId)
router.get('/getvehiclesbylocation',verifyAuth,vehicleController.getVehiclesBylocation)
router.put('/updatestatus/:vehicleId',verifyAuth,verifyAdmin,vehicleController.updateStatus)

export default router