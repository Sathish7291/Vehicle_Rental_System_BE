import mongoose from "./index.js";
import validators from "../utils/validators.js";
import {generateUUID} from '../utils/helper.js'


const ContactSchema = new mongoose.Schema({
    id:{
        type:String,
        default:function (){
            return generateUUID()
        }
    },
    firstname:{
        type:String,
        required:[true,"firstname is required"]
    },
    lastname:{
        type:String,
        required:[true,"lastname is required"]
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
    message:{
        type:String,
        required:[true,"message is required"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
},{
    collection:'contact',
    versionKey:false
})

export default mongoose.model('contact',ContactSchema)