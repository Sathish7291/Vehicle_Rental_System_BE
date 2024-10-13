import usersModel from "../model/users.js"
import auth from "../utils/auth.js"
import { USER_STATUS_ENUM } from "../utils/constants.js"

const createUser = async (req, res) => {
    try {
        let user = await usersModel.findOne({ email: req.body.email })
        if (!user) {
            //hash the password
            req.body.password = await auth.hashData(req.body.password)
            await usersModel.create(req.body)
            res.status(201).send({ message: "User Created Successfully" })
        }
        else
            res.status(400).send({ message: `User with ${req.body.email} already exists!` })
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const login = async(req,res)=>{
    try {
        let {email,password} = req.body
        let user = await usersModel.findOne({email:email})
        if(user)
        {
            //compare password
            if(await auth.compareHash(user.password,password))
            {
                //create token
                const token = auth.createToken({
                    email:user.email,
                    name:user.name,
                    role:user.role,
                    id:user.id
                })
                res.status(200).send({
                    message:"Login Successfull",
                    role:user.role,
                    token,
                    id:user.id,
                
                })
            }
            else
            {
                res.status(400).send({
                    message:"Incorrect Password"
                })
            }
        }
        else
        {
            res.status(400).send({
                message:`User with email ${req.body.email} does not exists`
            })
        }
        
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const getAllUsers = async(req,res)=>{
    try {
        let user = await usersModel.find({},{password:0})
        res.status(200).send({
            message:"User Data Fetched",
            data:user
        })
        
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const getUserById = async(req,res)=>{
    try {
        let {id} = req.params
        let user = await usersModel.findOne({id:id})
        res.status(200).send({
            message:"user Fetched Successfully",
            data:user
        })
    } catch (error) {
        console.error(`Error Occoured at ${req.originalUrl} - ${error}`)
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}


const editUserById = async (req, res) => {
    try {
        let {id} = req.params
        let user = await usersModel.findOne({id:id})
        if(user)
        {
            const {name,email,mobile,address,status} = req.body
            user.name = name?name: user.name
            user.email = email?email: user.email
            user.mobile = mobile?mobile: user.mobile
            user.status = status?status: user.status
            user.address = address?address: user.address
            
            await user.save()
            
            res.status(200).send({message:"Data Saved Successfully"})
        }
        else
            res.status(400).send({message:"Invalid Id"})
    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const deleteUserById = async (req, res) => {
    try {
        let {id} = req.params
        let data = await usersModel.deleteOne({id:id})
        if(data.deletedCount)
            res.status(200).send({message:"User Deleted Successfully"})
        else
            res.status(400).send({message:"Invalid Id"})

    } catch (error) {
        console.log(`Error in ${req.originalUrl}`,error.message)
        res.status(500).send({ message: error.message || "Internal Server Error" })
    }
}

const updateStatus = async(req,res)=>{
    try {
        let {id} = req.params
        let user = await usersModel.findOne({id:id})
        if(user)
        {
            user.status = USER_STATUS_ENUM[req.body.status] ?? USER_STATUS_ENUM.not_verified
            user.updatedBy = id

            await user.save()

            res.status(200).send({
                message:`User status updated as ${USER_STATUS_ENUM[req.body.status] ?? USER_STATUS_ENUM.NOT_VERIFIED}`
            })
        }
        else
        {
            res.status(400).send({
                message:"Invalid User Id"
            })
        }
    } catch (error) {
        console.error(`Error Occoured at ${req.originalUrl} - ${error}`)
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

export default {
    createUser,
    login,
    getAllUsers,
    editUserById,
    deleteUserById,
    updateStatus,
    getUserById
}