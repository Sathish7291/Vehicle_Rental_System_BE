import express from 'express'
import bookingController from '../controller/booking.js'
import verifyAuth from '../middleware/verifyAuth.js'
import verifyAdmin from '../middleware/verifyAdmin.js'
const router = express.Router()


router.post('/bookcar',verifyAuth,bookingController.BookCar)
router.get('/getbookingbyuserid',verifyAuth,bookingController.getbookingByUserId)
router.get('/getallbookings',verifyAuth,bookingController.getAllBookings)



export default router