import ContactModel from '../model/Contact.js';

const addContact = async(req,res)=>{
    try {
        
        await ContactModel.create({...req.body})

        res.status(201).send({
            message:"Message created"
        })

    } catch (error) {
        console.error(`Error Occoured at ${req.originalUrl} - ${error}`)
        res.status(500).send({
            message: error.message || "Internal Server Error",
            error
        })
    }
}

export default {
    addContact
}