import bookingModel from "../model/booking.js"
import vehicleModel from "../model/vehicle.js"
import auth from "../utils/auth.js"
import { generateUUID } from "../utils/helper.js";
import config from "../utils/config.js";

const query = {
  lookupBookings:{
      from:"vehicle",
      localField:"vehicleId",
      foreignField:"id",
      as:"cardetails"
  },
 
  projectAllBookings:{id:1,name:1,bookedTimeSlots:1,totalHours:1,totalAmount:1,transactionId:1,driverRequired:1,carname:"$cardetails.name",carprice:"$cardetails.price_per_hour",carimage:"$cardetails.image"}
}

const BookCar = async(req,res)=>{
    const { token } = req.body;
    try {
      const customer = await config.STRIPE_KEY.customers.create({
        email: token.email,
        source: token.id,
      });
  
      const payment = await config.STRIPE_KEY.charges.create(
        {
          amount: req.body.totalAmount * 100,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email
        },
        {
          idempotencyKey: generateUUID(),
          
        }
      );
  
      if (payment) {
        req.body.transactionId = payment.source.id;
        const newbooking = new bookingModel(req.body);
        await newbooking.save();
        const car = await vehicleModel.findOne({ id: req.body.vehicleId });
        console.log(req.body.vehicleId);
        car.bookedTimeSlots.push(req.body.bookedTimeSlots);
  
        await car.save();
        res.send("Your booking is successfull");
      } else {
        return res.status(400).json(error);
      }

    } catch (error) {
        console.error(`Error Occoured at ${req.originalUrl} - ${error}`)
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

const getbookingByUserId = async(req,res)=>{
  try {
      let {userId} = req.headers
      let data = await bookingModel.findOne({userId})
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

const getAllBookings = async(req,res)=>{
  try {
    let data = await bookingModel.aggregate([
      {$lookup:query.lookupBookings},
      {$unwind:"$cardetails"},
      {$project:query.projectAllBookings},
      {$sort:{createdAt:-1}}
  ])
      res.status(200).send({
          message:" Data Fetched",
          data
      })
      
  } catch (error) {
      console.log(`Error in ${req.originalUrl}`,error.message)
      res.status(500).send({ message: error.message || "Internal Server Error" })
  }
}


export default {
    BookCar,
    getbookingByUserId,
    getAllBookings
}