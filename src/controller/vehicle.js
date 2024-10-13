import vehicleModel from "../model/vehicle.js"
import { VEHICLE_STATUS_ENUM } from "../utils/constants.js"

const query = {
    lookupVehicles:{
        from:"users",
        localField:"userId",
        foreignField:"id",
        as:"carowner"
    },
    projectApprovedVehicles:{id:1,name:1,model:1,year:1,image:1,description:1,price_per_hour:1,location:1,status:1,createdAt:1,authorName:"$carowner.name"},
    projectAllVehicles:{id:1,name:1,model:1,year:1,image:1,description:1,price_per_hour:1,location:1,status:1,createdAt:1,authorName:"$carowner.name"}
}

const addVehicle = async(req,res)=>{
    try {
        let {userId} = req.headers
        
        await vehicleModel.create({...req.body,userId})

        res.status(201).send({
            message:"Vehicle added Successfully"
        })

    } catch (error) {
        console.error(`Error Occoured at ${req.originalUrl} - ${error}`)
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

// const getAllVehicles = async(req,res)=>{
//     try {
//         let data = await vehicleModel.find({})
//         res.status(200).send({
//             message:" Data Fetched",
//             data
//         })
        
//     } catch (error) {
//         console.log(`Error in ${req.originalUrl}`,error.message)
//         res.status(500).send({ message: error.message || "Internal Server Error" })
//     }
// }


const getAllVehicles = async(req,res)=>{
    try {
        let vehicles = await vehicleModel.aggregate([
            {$lookup:query.lookupVehicles},
            {$unwind:"$carowner"},
            {$project:query.projectAllVehicles},
            {$sort:{createdAt:-1}}
        ])
     
        res.status(200).send({
            message:"Vehicles Fetched Successfully",
            data:vehicles
        })
    } catch (error) {
        console.error(`Error Occoured at ${req.originalUrl} - ${error}`)
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

const getAllApprovedVehicles = async(req,res)=>{
    try {
        let vehicles = await vehicleModel.aggregate([
            {$match:{status:VEHICLE_STATUS_ENUM.APPROVED}},
            {$lookup:query.lookupVehicles},
            {$unwind:"$carowner"},
            {$project:query.projectApprovedVehicles},
            {$sort:{createdAt:-1}}
        ])
     
        res.status(200).send({
            message:"Vehicles Fetched Successfully",
            data:vehicles
        })
    } catch (error) {
        console.error(`Error Occoured at ${req.originalUrl} - ${error}`)
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

const getvehicleById = async(req,res)=>{
    try {
        let {id} = req.params
        let data = await vehicleModel.findOne({id:id})
        res.status(200).send({
            message:"vehicle Fetched Successfully",
            data
        })
    } catch (error) {
        console.error(`Error Occoured at ${req.originalUrl} - ${error}`)
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}


const getVehiclesByUserId = async(req,res)=>{
    try {
        let {userId} = req.headers
        let vehicle = await vehicleModel.find({userId})
        res.status(200).send({
            message:"Vehicles Fetched Successfully",
            data:vehicle
        })
    } catch (error) {
        console.error(`Error Occoured at ${req.originalUrl} - ${error}`)
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

const getVehiclesBylocation = async(req,res)=>{
    try {
        let {city} = req.params
        let vehicle = await vehicleModel.find({city:location})
        if(location)
        {
        res.status(200).send({
            message:"Vehicles Fetched Successfully",
            data:vehicle
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

const updateStatus = async(req,res)=>{
    try {
        let {vehicleId} = req.params
        let {userId} = req.headers

        let vehicle = await vehicleModel.findOne({id:vehicleId})

        if(vehicle)
        {
            vehicle.status = VEHICLE_STATUS_ENUM[req.body.status] ?? VEHICLE_STATUS_ENUM.PENDING
            vehicle.updatedBy = userId

            await vehicle.save()

            res.status(200).send({
                message:`Vehicle status updated as ${VEHICLE_STATUS_ENUM[req.body.status] ?? VEHICLE_STATUS_ENUM.PENDING}`
            })
        }
        else
        {
            res.status(400).send({
                message:"Invalid Vehicle Id"
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
    addVehicle,
    getAllVehicles,
    getAllApprovedVehicles,
    getvehicleById,
    getVehiclesByUserId,
    getVehiclesBylocation,
    updateStatus
}