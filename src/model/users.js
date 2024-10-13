import mongoose from "./index.js";
import validators from "../utils/validators.js";
import {generateUUID} from '../utils/helper.js'
import { ROLE_ENUM , USER_STATUS_ENUM} from "../utils/constants.js";

const usersSchema = new mongoose.Schema({
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
    email:{
        type:String,
        required:[true,"Email is required"],
        validate: {
            validator: validators.validateEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },
    mobile:{
        type:String,
        required:[true,"Mobile is required"],
        validate: {
            validator: validators.validateMobile,
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:{
            values: Object.values(USER_STATUS_ENUM),
            message: '{VALUE} is not supported'
        },
        default:USER_STATUS_ENUM.NOT_VERIFIED
    },
    role:{
        type:String,
        enum:{
            values: Object.values(ROLE_ENUM),
            message: '{VALUE} is not supported'
        },
        default:ROLE_ENUM.user
    },
    
    createdAt:{
        type:Date,
        default:Date.now()
    }

},{
    collection:'users',
    versionKey:false
})

export default mongoose.model('users',usersSchema)