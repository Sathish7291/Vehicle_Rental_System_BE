import mongoose from "./index.js";
import validators from "../utils/validators.js";
import {generateUUID} from '../utils/helper.js'
import { ROLE_ENUM , USER_STATUS_ENUM} from "../utils/constants.js";

const bookingSchema = new mongoose.Schema({
    id:{
        type:String,
        default:function (){
            return generateUUID()
        }
    },
    userId:{
        type:String,
        required:[true,"userId is required"]
    },
    vehicleId:{
        type:String,
        required:[true,"userId is required"]
    },
    bookedTimeSlots : {
        from : {type : String} ,
        to : {type : String}
    } ,
    totalHours : {
        type : Number },
    totalAmount : {type : Number},
    transactionId : {type : String},
    driverRequired : {type : Boolean}


},{
    timestamps : true,
    collection:'bookings',
    versionKey:false
})

export default mongoose.model('bookings',bookingSchema)