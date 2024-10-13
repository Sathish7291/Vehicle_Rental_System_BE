import mongoose from "./index.js";
import validators from "../utils/validators.js";
import {VEHICLE_STATUS_ENUM } from '../utils/constants.js'
import {generateUUID} from '../utils/helper.js'


const VehicleSchema = new mongoose.Schema({
    id:{
        type:String,
        default:function (){
            return generateUUID()
        }
    },
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    model:{
        type:String,
        required:[true,"model is required"]
    },
    year:{
        type:String,
        required:[true,"year is required"]
    },
    image:{
        type:String,
        required:[true,"Image is required"]
    },
    description:{
        type:String,
        required:[true,"description is required"]
    },
    price_per_hour:{
        type:String,
        required:[true,"price is required"]
    },
    location:{
        type:String,
        required:[true,"location is required"]
    },
    status:{
        type:String,
        enum:{
            values: Object.values(VEHICLE_STATUS_ENUM),
            message: '{VALUE} is not supported'
        },
        default:VEHICLE_STATUS_ENUM.PENDING
    },
    userId:{
        type:String,
        required:[true,"userId is required"]
    },
    likes:{
        type:Object,
        default:[]
    },
    updatedBy:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    bookedTimeSlots : [
        {
            from : {type : String , required : true},
            to : {type : String , required : true}
        }
    ]

},{
    collection:'vehicle',
    versionKey:false
})

export default mongoose.model('vehicle',VehicleSchema)