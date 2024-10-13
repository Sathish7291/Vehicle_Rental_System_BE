import express from 'express'
import userRoutes from "./users.js"
import vehicleRoutes from './vehicle.js'
import bookingRoutes from './booking.js'
import contactRoutes from './contact.js'
const router = express.Router()

router.use('/users',userRoutes)
router.use('/vehicles',vehicleRoutes)
router.use('/booking',bookingRoutes)
router.use('/contact',contactRoutes)
router.get('*',(req,res)=>res.send(`<div style="text-align:center"><h1>404 NOT FOUND</h1><p>The requested endpoint does not exists</p></div>`))

export default router